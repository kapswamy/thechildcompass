# Secure Parent Guide worker

This Cloudflare Worker keeps the OpenAI API key off the public website. It also restricts browser requests to the chosen website domain, applies a basic per-IP rate limit, blocks common emergency phrases before a model call, and sends strict pediatric safety instructions with every request.

## Deploy

1. Create a Cloudflare account and install Wrangler: `npm install -g wrangler`.
2. In this `worker` folder, run `wrangler login` then `wrangler deploy`.
3. Run `wrangler secret put OPENAI_API_KEY` and paste the API key when prompted.
4. Run `wrangler secret put OPENAI_MODEL` and enter the approved model ID.
5. Change `ALLOWED_ORIGIN` in `wrangler.toml` to the exact live site origin, then deploy again.
6. Copy the deployed `https://...workers.dev` URL into `data-chat-endpoint` on the website body element.

## Important launch controls

- This is a parent education assistant, not a clinical service. Keep the medical-safety wording visible in the chat UI.
- Configure Cloudflare's production rate-limiting/WAF rules before public launch; the in-worker limit is only a lightweight extra layer.
- Have a qualified pediatric clinician review the guidance, escalation rules, clinic wording, privacy notice, and model choice before enabling it for the public.
- Do not collect personal or health-identifying information in this chat.
