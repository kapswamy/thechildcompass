# The Child Compass website

A fast, mobile-first static website for The Child Compass. It uses only HTML, CSS, JavaScript, and the supplied brand assets - no build step, subscription, or server is required.

## Publish free with GitHub Pages

1. Create a GitHub repository and upload these files.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder, then save.
5. GitHub will provide a public URL. To use a custom domain, add it under **Custom domain** in the same Pages settings and follow the DNS instructions displayed there.

## Before publishing

- Replace the sample phone number (`+91 98765 43210`) in `index.html` with the practice's confirmed number.
- Add the final website address to the `og:url` and structured data once the chosen spelling/domain is confirmed.
- Review medical content and add a privacy policy before collecting appointments or health information online.

## Enable the AI Parent Guide

The chat interface is included, but it is deliberately not active until a secure backend is deployed. Follow [the worker setup guide](worker/README.md), then replace `https://YOUR-WORKER.workers.dev/chat` in `index.html` with the deployed Worker `/chat` URL. Never add an OpenAI API key to the website files or GitHub repository.

## Android App & Google Play Store (Capacitor)

The Child Compass is configured with **Capacitor** to build native Android packages:

- **Build web bundle:** `npm run build` (bundles web files into `www/`)
- **Regenerate app icons:** `npm run icons:generate` (creates standard Android mipmap densities + 512x512 Play Store icon)
- **Sync web changes to Android:** `npm run cap:sync`
- **Open project in Android Studio:** `npm run cap:open` (or open the `android/` folder in Android Studio)
- **Build Release Bundle (`.aab`):** In Android Studio, go to **Build → Generate Signed Bundle / APK → Android App Bundle**.

## Files

- `index.html` - content, SEO metadata, and structure
- `privacy.html` - Google Play-compliant privacy policy and patient data disclosure
- `styles.css` - responsive visual design
- `script.js` - mobile navigation and interactive logic
- `assets/` - practice visuals, posters, and brand logo
- `android/` - native Android Studio project
- `capacitor.config.json` - Capacitor app configuration (`com.thechildcompass.app`)
- `play-store-icon-512.png` - 512x512 Google Play Store graphic asset
- `scripts/` - build and icon generation scripts
- `worker/` - secure server-side AI chat backend and deployment instructions
