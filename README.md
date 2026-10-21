# Orbit Campaign Studio

A campaign-building prototype with nine fictional demo personas, template generation and shared Gemini generation. Includes the navy/purple theme and the SEO Girl - Ami footer credit.

## Try it without a key

Open the standalone `Orbit Campaign Studio.html` deliverable in a browser. Select **Demo personas** in the sidebar, then **Use this demo campaign** for Bloom & Root, Bright Path Academy or Flowdesk. This replaces draft assets, so export an existing campaign first if needed.

The three fictional persona sets include practical needs, questions and objections. They are examples, not customer research.

## Deploy the AI-enabled version on Vercel

1. Unzip the complete source archive. Put its contents at your Git repository root, including `api/`, `dist/`, `scripts/`, `package.json` and `vercel.json`.
2. Import that repository in Vercel. Framework preset: **Other**. The supplied configuration uses `node scripts/build.cjs` and output directory `dist`.
5. Deploy or redeploy after setting environment variables. For a private pilot, protect the deployment with Vercel Deployment Protection. The API's same-origin check is not a substitute for authentication or an abuse-control system.
6. In the deployed app, fill in **Business brief** and choose **Gemini** under **Generation mode**. Only the business brief is sent to the server and the shared Gemini backend; locally stored leads are not sent.

The key is read by `api/generate.js` on the server. There is no API-key field in the browser, and no key is stored in frontend files or local storage. `.env.example` contains names only. Never commit a real `.env` file.

## What AI mode generates

Three persona hypotheses; three starter blog articles; three search ads and three social ads; three connected landing-page headlines within the existing page templates; an industry-specific assessment with choices; a useful downloadable workbook personalised using the assessment answers; and a follow-up sequence.

The page layouts remain deterministic templates. AI supplies text, not executable HTML. Review every generated draft; the API does not browse or fact-check claims. Contact capture is still a local demonstration and does not send email or connect to a CRM.

## Files

- `dist/`: app UI and static assets.
- `api/generate.js`: server-only shared Gemini endpoint, input/output validation, timeout and error handling.
- `vercel.json`: Vercel build output and function duration configuration.
- `.env.example`: server environment variable names.
- `tests/api.test.cjs`: mocked API tests (no real API call or key required).

## Verify

Use Node.js 22 or later:

```sh
npm test
npm run build
```

API tests cover method, missing key, invalid brief, cross-origin rejection, valid structured results, incomplete responses, malformed output, authentication failures and rate limits. No real API request has been tested in this delivery because no API key was configured.

## References

- Gemini structured output: https://ai.google.dev/gemini-api/docs/structured-output
- Gemini API documentation: https://ai.google.dev/gemini-api/docs
- GPT-4.1 mini: https://developers.openai.com/api/docs/models/gpt-4.1-mini
- Vercel Node functions: https://vercel.com/docs/functions/runtimes/node-js
- Vercel project configuration: https://vercel.com/docs/project-configuration

## Shared Gemini connection

`api/generate.js` sends the brief, original system prompt and complete JSON schema to `https://gemini-proxy-boldstudio.vercel.app/api/gemini`. No API key is needed in this app. The shared proxy holds the credential server-side. Output is validated before replacing the current campaign. Template mode remains available without AI. Stored leads are not sent.
