const MAX_MESSAGE_CHARS = 1200;
const MAX_REQUESTS_PER_MINUTE = 12;
const visitors = new Map();

const SAFETY_INSTRUCTIONS = `You are The Child Compass Parent Guide, a warm, concise educational assistant for parents and caregivers of children. You provide general, evidence-informed health education only.

Safety rules - follow every rule:
- Never diagnose, prescribe medicines, calculate doses, or replace an examination by a qualified clinician.
- Never ask for a child's name, date of birth, address, phone number, medical record, photos, or other identifying details.
- For possible emergencies, immediately advise urgent in-person medical care. Emergency examples include difficulty breathing, blue/grey lips or face, seizure, unconsciousness or hard to wake, severe dehydration, blood in stool/vomit, a newborn under 3 months with fever 38 C/100.4 F or higher, severe allergic reaction, poisoning, or rapid deterioration.
- If a symptom could be serious, say clearly that the child should be assessed by a qualified clinician today and explain why in plain language.
- Encourage the parent to contact their pediatrician for individual advice. Do not imply this chat is monitored or available for emergencies.
- Keep answers under 180 words, use plain language, and end with a brief safety reminder when discussing symptoms.
- You may explain newborn care, vaccination, growth, development, nutrition, common mild illnesses, hearing screening, ROP screening, and language-development milestones.
- Do not invent sources, facts, or clinic policies. If uncertain, say so and recommend discussing it with the child’s pediatrician.`;

const emergencyPattern = /difficulty breathing|blue (lips|face)|seizure|convulsion|unconscious|unresponsive|hard to wake|blood in (stool|vomit)|vomiting blood|severe dehydration|newborn.{0,30}(fever|38|100\.4)|fever.{0,30}(newborn|under 3 months)|poison|swallow(ed|ing) (a |the )?(medicine|chemical|battery)|allergic reaction|face swelling/i;

function cors(origin, allowedOrigin) {
  return {
    "Access-Control-Allow-Origin": origin === allowedOrigin ? origin : allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
    "Content-Type": "application/json; charset=utf-8",
  };
}

function rateLimited(ip) {
  const now = Date.now();
  const current = visitors.get(ip) || [];
  const recent = current.filter(time => now - time < 60_000);
  recent.push(now);
  visitors.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_MINUTE;
}

function textReply(text, status, headers) {
  return new Response(JSON.stringify({ reply: text }), { status, headers });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = cors(origin, env.ALLOWED_ORIGIN);
    if (request.method === "OPTIONS") return new Response(null, { headers });
    if (request.method !== "POST" || new URL(request.url).pathname !== "/chat") return textReply("Not found.", 404, headers);
    if (origin !== env.ALLOWED_ORIGIN) return textReply("This chat is not available from this website.", 403, headers);

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    if (rateLimited(ip)) return textReply("Please wait a moment before sending another message.", 429, headers);

    let payload;
    try { payload = await request.json(); } catch { return textReply("Please send a valid message.", 400, headers); }
    const message = typeof payload.message === "string" ? payload.message.trim() : "";
    if (!message || message.length > MAX_MESSAGE_CHARS) return textReply("Please keep your question under 1,200 characters.", 400, headers);

    if (emergencyPattern.test(message)) {
      return textReply("This could need urgent medical attention. Please seek emergency care now or contact your child’s doctor urgently. If your child has trouble breathing, blue/grey lips or face, a seizure, is very hard to wake, or is rapidly getting worse, do not wait for an online reply.", 200, headers);
    }

    if (!env.OPENAI_API_KEY || !env.OPENAI_MODEL) return textReply("The Parent Guide is being set up. Please use WhatsApp or call the clinic for help.", 503, headers);
    try {
      const apiResponse = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { "Authorization": `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ model: env.OPENAI_MODEL, store: false, instructions: SAFETY_INSTRUCTIONS, input: message, max_output_tokens: 350 }),
      });
      if (!apiResponse.ok) return textReply("I’m unable to reply right now. Please try again shortly or contact the clinic.", 502, headers);
      const result = await apiResponse.json();
      const reply = result.output_text || result.output?.flatMap(item => item.content || []).filter(part => part.type === "output_text").map(part => part.text).join("\n");
      return textReply(reply || "I’m unable to reply right now. Please contact the clinic for guidance.", 200, headers);
    } catch {
      return textReply("I’m unable to reply right now. Please try again shortly or contact the clinic.", 502, headers);
    }
  },
};
