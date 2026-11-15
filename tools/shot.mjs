// Скриншоты сайта для проверки: node shot.mjs <путь к index.html> <выход.png> [ширина=1280]
import puppeteer from 'puppeteer-core';
import path from 'node:path';
const [file, out, w = '1280'] = process.argv.slice(2);
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const b = await puppeteer.launch({ executablePath: CHROME, headless: true, protocolTimeout: 120000, args: ['--hide-scrollbars', '--allow-file-access-from-files'] });
const p = await b.newPage();
await p.setViewport({ width: Number(w), height: Number(w) < 600 ? 844 : 800, deviceScaleFactor: 1 });
await p.goto(file.startsWith('http') ? file : 'file://' + path.resolve(file), { waitUntil: 'networkidle2', timeout: 30000 }).catch(() => {});
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo({ top: y, behavior: 'instant' }); await new Promise(r => setTimeout(r, 100)); } await new Promise(r => setTimeout(r, 900)); scrollTo({ top: 0, behavior: 'instant' }); await new Promise(r => setTimeout(r, 300)); });
const h = Math.min(9000, await p.evaluate(() => document.documentElement.scrollHeight));
await p.setViewport({ width: Number(w), height: h, deviceScaleFactor: 1 });
await new Promise(r => setTimeout(r, 500));
await p.screenshot({ path: out });
await b.close();
console.log(out);
