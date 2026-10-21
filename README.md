# Orbit Campaign Studio

A campaign-building prototype with nine fictional demo personas, template generation and optional OpenAI generation. Includes the navy/purple theme and the SEO Girl - Ami footer credit.

## Try it without a key

Open the standalone `Orbit Campaign Studio.html` deliverable in a browser. Select **Demo personas** in the sidebar, then **Use this demo campaign** for Bloom & Root, Bright Path Academy or Flowdesk. This replaces draft assets, so export an existing campaign first if needed.

The three fictional persona sets include practical needs, questions and objections. They are examples, not customer research.

## Deploy the AI-enabled version on Vercel

1. Unzip the complete source archive. Put its contents at your Git repository root, including `api/`, `dist/`, `scripts/`, `package.json` and `vercel.json`.
2. Import that repository in Vercel. Framework preset: **Other**. The supplied configuration uses `node scripts/build.cjs` and output directory `dist`.
3. In **Project Settings → Environment Variables**, add `OPENAI_API_KEY` with your real OpenAI API key. Enable the deployment environments you intend to use. Do not prefix it with `VITE_` or `NEXT_PUBLIC_`.
4. Optionally set `OPENAI_MODEL`. The default is `gpt-4.1-mini`; the chosen model must support Responses API Structured Outputs and be available to your API project.
5. Deploy or redeploy after setting environment variables. For a private pilot, protect the deployment with Vercel Deployment Protection. The API's same-origin check is not a substitute for authentication or an abuse-control system.
6. In the deployed app, fill in **Business brief** and choose **OpenAI** under **Generation mode**. Only the business brief is sent to the server and OpenAI; locally stored leads are not sent.

The key is read by `api/generate.js` on the server. There is no API-key field in the browser, and no key is stored in frontend files or local storage. `.env.example` contains names only. Never commit a real `.env` file.

## What AI mode generates

Three persona hypotheses; three starter blog articles; three search ads and three social ads; three connected landing-page headlines within the existing page templates; an industry-specific assessment with choices; a useful downloadable workbook personalised using the assessment answers; and a follow-up sequence.

The page layouts remain deterministic templates. AI supplies text, not executable HTML. Review every generated draft; the API does not browse or fact-check claims. Contact capture is still a local demonstration and does not send email or connect to a CRM.

## Files

- `dist/`: app UI and static assets.
- `api/generate.js`: server-only Responses API endpoint, input/output validation, timeout and error handling.
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

- OpenAI Structured Outputs: https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses
- OpenAI authentication: https://developers.openai.com/api/reference/overview
- GPT-4.1 mini: https://developers.openai.com/api/docs/models/gpt-4.1-mini
- Vercel Node functions: https://vercel.com/docs/functions/runtimes/node-js
- Vercel project configuration: https://vercel.com/docs/project-configuration
