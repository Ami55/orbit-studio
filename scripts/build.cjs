const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
for (const f of ['dist/index.html','dist/app.js','dist/style.css']) {
 if (!fs.existsSync(path.join(root, f))) throw new Error('Missing static asset: '+f);
}
console.log('Orbit static assets ready. Vercel deploys api/generate.js as a serverless function.');
