// Записывает видео-превью каждого дизайна для галереи «как на YouTube».
//   cd tools && npm install && node record-previews.mjs            # все дизайны, у которых ещё нет видео
//   node record-previews.mjs 12 45 61                              # только эти номера (перезаписать)
//   node record-previews.mjs --all                                 # перезаписать всё
// Как работает: открывает сайт в Chrome (1280×720), прокручивает его до конца (чтобы сработали анимации),
// снимает страницу целиком, затем ffmpeg превращает снимок в плавное видео-прокрутку 960×540 и обложку.
// Нужны: Google Chrome, ffmpeg, Python 3 (для дизайнов-палитр сайт сначала собирается scripts/build_site.py).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MEDIA = path.join(ROOT, 'gallery', 'media');
const SHOTS = path.join(ROOT, 'build', 'shots');
const CHROME = process.env.CHROME || {
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  win32: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
}[process.platform] || '/usr/bin/google-chrome';
const PORT = Number(process.env.PORT || 4777);
const MAX_H = 7200; // длинные сайты обрезаем, превью не должно идти минуту

const designs = JSON.parse(fs.readFileSync(path.join(ROOT, 'catalog', 'designs.json'), 'utf8'));
const args = process.argv.slice(2);
const all = args.includes('--all');
const only = args.filter((a) => /^\d+$/.test(a)).map(Number);
fs.mkdirSync(MEDIA, { recursive: true });
fs.mkdirSync(SHOTS, { recursive: true });

// простой статический сервер на корень репозитория: модули и шрифты не работают по file://
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf', '.ico': 'image/x-icon', '.mp4': 'video/mp4' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = path.join(ROOT, p);
  if (!f.startsWith(ROOT)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(PORT);

function target(d) {
  if (d.kind === 'tokens') {
    const out = path.join(ROOT, 'gallery', 'live', String(d.n));
    execFileSync('python3', [path.join(ROOT, 'scripts', 'build_site.py'), '--demo', String(d.n), '--out', out]);
    return `http://localhost:${PORT}/gallery/live/${d.n}/index.html`;
  }
  if (d.path && d.path.endsWith('.html')) return `http://localhost:${PORT}/${d.path.split('/').map(encodeURIComponent).join('/')}`;
  return d.url; // React/Next-шаблоны и Cruip: снимаем с их живого демо
}

function video(shot, n) {
  const h = Number(execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=height', '-of', 'csv=p=0', shot]).toString().trim());
  const scaled = Math.round((h * 960) / 1280 / 2) * 2;
  const travel = Math.max(0, scaled - 540);
  const D = Math.min(16, Math.max(7, 2.5 + travel / 450)); // секунд: держим верх 1 с, едем, держим низ 1 с
  const ease = `(1-cos(PI*min(1,max(0,(t-1)/${(D - 2).toFixed(2)}))))/2`;
  // уменьшаем снимок один раз, потом каждый кадр только вырезаем окно: так в десятки раз быстрее
  const small = shot.replace(/\.png$/, '-960.png');
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', shot, '-vf', `scale=960:${scaled}`, small]);
  const vf = `crop=960:540:0:'${travel}*${ease}'`;
  const mp4 = path.join(MEDIA, `${n}.mp4`);
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', small, '-vf', `loop=loop=-1:size=1:start=0,setpts=N/30/TB,${vf}`, '-t', D.toFixed(2), '-r', '30',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '31', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', mp4]);
  execFileSync('ffmpeg', ['-y', '-v', 'error', '-i', shot, '-vf', 'crop=1280:720:0:0,scale=640:360', '-q:v', '5', '-frames:v', '1', path.join(MEDIA, `${n}.jpg`)]);
  return Math.round(D);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars', '--no-first-run', '--mute-audio'] });
let done = 0, failed = [];
for (const d of designs) {
  if (only.length && !only.includes(d.n)) continue;
  if (!only.length && !all && fs.existsSync(path.join(MEDIA, `${d.n}.mp4`))) continue;
  let url;
  try { url = target(d); } catch (e) { failed.push(`${d.n} ${d.name}: сборка образца упала`); continue; }
  if (!url) { failed.push(`${d.n} нет адреса`); continue; }
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 1200));
    // прокрутка до низа, чтобы сработали анимации появления и ленивые картинки
    await page.evaluate(async () => {
      const step = 500;
      for (let y = 0; y < Math.min(document.documentElement.scrollHeight, 9000); y += step) { window.scrollTo({ top: y, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 150)); }
      await new Promise((r) => setTimeout(r, 900)); // дать анимациям доиграть
      window.scrollTo({ top: 0, behavior: 'instant' }); await new Promise((r) => setTimeout(r, 600));
    });
    const h = Math.min(MAX_H, await page.evaluate(() => Math.max(document.documentElement.scrollHeight, document.body ? document.body.scrollHeight : 0)));
    const shot = path.join(SHOTS, `${d.n}.png`);
    await page.screenshot({ path: shot, clip: { x: 0, y: 0, width: 1280, height: Math.max(720, h) }, captureBeyondViewport: true });
    const sec = video(shot, d.n);
    done++;
    console.log(`✓ ${d.n} ${d.name} (${sec} с)`);
  } catch (e) {
    failed.push(`${d.n} ${d.name}: ${e.message.split('\n')[0]}`);
  } finally {
    await page.close();
  }
}
await browser.close();
server.close();
console.log(`готово: ${done}`);
if (failed.length) console.log('не получилось:\n  ' + failed.join('\n  '));
console.log('дальше: python3 scripts/build_gallery.py');
