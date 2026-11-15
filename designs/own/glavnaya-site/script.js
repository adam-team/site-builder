/* =========================================================
   1. ЗВЁЗДНОЕ НЕБО
   ========================================================= */
(function sky() {
  const cv = document.getElementById('sky');
  const ctx = cv.getContext('2d');
  let W, H, stars = [];
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    W = cv.width = innerWidth * DPR;
    H = cv.height = innerHeight * DPR;
    cv.style.width = innerWidth + 'px';
    cv.style.height = innerHeight + 'px';
    const n = Math.round((innerWidth * innerHeight) / 5000);
    stars = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: (Math.random() * 1.2 + 0.3) * DPR,
      a: Math.random(),
      s: Math.random() * 0.02 + 0.004,
      z: Math.random() * 0.6 + 0.2,               // глубина — для параллакса
      green: Math.random() < 0.08
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const sc = scrollY * DPR;
    for (const st of stars) {
      st.a += st.s;
      const tw = 0.45 + Math.sin(st.a) * 0.35;
      let y = (st.y - sc * st.z * 0.15) % H;
      if (y < 0) y += H;
      ctx.beginPath();
      ctx.arc(st.x, y, st.r, 0, Math.PI * 2);
      ctx.fillStyle = st.green ? `rgba(57,255,20,${tw})` : `rgba(220,230,245,${tw * 0.8})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  addEventListener('resize', resize);
  resize();
  draw();
})();

/* =========================================================
   2. ЛИНИЯ МАРШРУТА (рисуется по мере скролла)
   ========================================================= */
(function route() {
  const svg = document.getElementById('route');
  const NS = 'http://www.w3.org/2000/svg';
  let path, glow, orb, len = 0;

  function build() {
    svg.style.height = '0px';                    // чтобы линия не растягивала страницу
    const W = document.documentElement.clientWidth;
    const foot = document.querySelector('footer');
    const H = foot.offsetTop + foot.offsetHeight;
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.style.height = H + 'px';
    svg.innerHTML = `
      <defs>
        <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#00E5FF"/>
          <stop offset="1" stop-color="#39FF14"/>
        </linearGradient>
      </defs>`;

    // точки-«изгибы» маршрута у правого края
    const mobile = W < 760;
    const xA = mobile ? W - 10 : W - 34;
    const xB = mobile ? W - 22 : W - 84;
    const startY = 120, step = mobile ? 900 : 700;
    let d = `M ${xA} ${startY}`, y = startY, flip = false;
    while (y + step * 0.6 < H - 160) {
      const ny = y + step;
      const nx = flip ? xA : xB;
      d += ` C ${flip ? xB : xA} ${y + step * 0.5}, ${nx} ${ny - step * 0.5}, ${nx} ${ny}`;
      y = ny; flip = !flip;
    }

    const base = document.createElementNS(NS, 'path');
    base.setAttribute('d', d);
    base.setAttribute('fill', 'none');
    base.setAttribute('stroke', 'rgba(147,163,189,.12)');
    base.setAttribute('stroke-width', '1.5');
    base.setAttribute('stroke-dasharray', '4 8');
    svg.appendChild(base);

    glow = document.createElementNS(NS, 'path');
    glow.setAttribute('d', d);
    glow.setAttribute('fill', 'none');
    glow.setAttribute('stroke', 'url(#rg)');
    glow.setAttribute('stroke-width', '2');
    glow.style.filter = 'drop-shadow(0 0 6px rgba(57,255,20,.6))';
    svg.appendChild(glow);
    path = glow;
    len = path.getTotalLength();
    path.style.strokeDasharray = len;

    orb = document.createElementNS(NS, 'g');
    orb.innerHTML = `
      <circle r="18" fill="rgba(0,229,255,.12)"/>
      <circle r="10" fill="#0B1121" stroke="#00E5FF" stroke-width="1.5"/>
      <circle r="3.5" fill="#39FF14" style="filter:drop-shadow(0 0 6px #39FF14)"/>`;
    svg.appendChild(orb);
    update();
  }

  function update() {
    if (!path) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = Math.min(1, Math.max(0, scrollY / max));
    // линия «догоняет» центр экрана
    const target = scrollY + innerHeight * 0.55;
    let lo = 0, hi = len;
    for (let i = 0; i < 18; i++) {             // бинарный поиск длины по Y
      const mid = (lo + hi) / 2;
      if (path.getPointAtLength(mid).y < target) lo = mid; else hi = mid;
    }
    const L = p >= 0.995 ? len : lo;
    path.style.strokeDashoffset = len - L;
    const pt = path.getPointAtLength(L);
    orb.setAttribute('transform', `translate(${pt.x} ${pt.y})`);
  }

  addEventListener('scroll', update, { passive: true });
  const rebuild = () => { clearTimeout(build.t); build.t = setTimeout(build, 150); };
  addEventListener('resize', rebuild);
  let lastH = 0;
  new ResizeObserver(() => {                     // высота страницы изменилась (раскрылся тренажёр и т.п.)
    const h = document.querySelector('main').offsetHeight;
    if (Math.abs(h - lastH) > 40) { lastH = h; rebuild(); }
  }).observe(document.querySelector('main'));
  addEventListener('load', build);
  build();
})();

/* =========================================================
   3. ПОЯВЛЕНИЕ БЛОКОВ + СЧЁТЧИК ЭТАПОВ
   ========================================================= */
const onceIn = (el, fn, threshold = 0.25) => {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { fn(e.target); io.unobserve(e.target); }
  }), { threshold });
  io.observe(el);
};

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
  onceIn(el, t => t.classList.add('in'), 0.15);
});

const odo = document.getElementById('odoNum');
const stageIO = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) odo.textContent = e.target.dataset.stage;
}), { threshold: 0.5 });
document.querySelectorAll('[data-stage]').forEach(s => stageIO.observe(s));
addEventListener('scroll', () => { if (scrollY < 200) odo.textContent = 0; }, { passive: true });

/* =========================================================
   4. СЧЁТЧИКИ ЦИФР
   ========================================================= */
function countUp(el, to, dur = 1600) {
  const t0 = performance.now();
  (function tick(t) {
    const k = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
}
document.querySelectorAll('[data-count]').forEach(el => onceIn(el, () => countUp(el, +el.dataset.count)));

/* =========================================================
   5. РАДАР (этап 01)
   ========================================================= */
(function radar() {
  const cv = document.getElementById('radarCv');
  const ctx = cv.getContext('2d');
  const labels = ['Энергия', 'Уверенность', 'Таланты', 'Отношения', 'Здоровье', 'Сон', 'Деньги', 'Смысл'];
  const vals = [0.35, 0.45, 0.85, 0.6, 0.5, 0.4, 0.65, 0.75];
  const S = cv.width, C = S / 2, R = S * 0.34;
  let k = 0, sweep = 0, started = false;

  function pt(i, r) {
    const a = -Math.PI / 2 + (i / labels.length) * Math.PI * 2;
    return [C + Math.cos(a) * r, C + Math.sin(a) * r];
  }

  function draw() {
    ctx.clearRect(0, 0, S, S);
    // сетка
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      labels.forEach((_, i) => { const [x, y] = pt(i, R * ring / 4); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
      ctx.closePath();
      ctx.strokeStyle = 'rgba(147,163,189,.16)'; ctx.lineWidth = 2; ctx.stroke();
    }
    labels.forEach((l, i) => {
      const [x, y] = pt(i, R);
      ctx.beginPath(); ctx.moveTo(C, C); ctx.lineTo(x, y); ctx.strokeStyle = 'rgba(147,163,189,.12)'; ctx.stroke();
      const [lx, ly] = pt(i, R + 52);
      ctx.fillStyle = '#93a3bd'; ctx.font = '600 26px Manrope, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(l, lx, ly);
    });
    // луч-сканер
    sweep += 0.012;
    const g = ctx.createConicGradient ? ctx.createConicGradient(sweep, C, C) : null;
    if (g) {
      g.addColorStop(0, 'rgba(57,255,20,.22)'); g.addColorStop(0.12, 'rgba(57,255,20,0)'); g.addColorStop(1, 'rgba(57,255,20,0)');
      ctx.beginPath(); ctx.arc(C, C, R, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
    }
    // данные
    if (started && k < 1) k += 0.012;
    const e = 1 - Math.pow(1 - k, 3);
    ctx.beginPath();
    vals.forEach((v, i) => { const [x, y] = pt(i, R * v * e); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.closePath();
    ctx.fillStyle = 'rgba(57,255,20,.14)'; ctx.fill();
    ctx.strokeStyle = '#39FF14'; ctx.lineWidth = 3; ctx.shadowColor = '#39FF14'; ctx.shadowBlur = 16; ctx.stroke(); ctx.shadowBlur = 0;
    vals.forEach((v, i) => {
      const [x, y] = pt(i, R * v * e);
      ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fillStyle = v < 0.5 ? '#00E5FF' : '#39FF14'; ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  onceIn(cv, () => { started = true; });
  draw();
})();

/* =========================================================
   6. ТЕЛЕФОН + ГРАФИКИ (этап 04)
   ========================================================= */
(function plan() {
  const dash = document.querySelector('.dash');
  if (!dash) return;
  onceIn(dash, () => {
    const rf = dash.querySelector('.rf');
    const pct = +rf.dataset.pct;
    rf.style.strokeDashoffset = 302 * (1 - pct / 100);
    countUp(dash.querySelector('.ringNum'), pct, 1400);
    dash.querySelectorAll('.bar i').forEach(b => b.style.width = b.dataset.w + '%');
    dash.querySelectorAll('.bwrap i').forEach((b, i) => setTimeout(() => b.style.height = b.dataset.h + '%', 400 + i * 70));
    drawLine();
  });

  function drawLine() {
    const cv = document.getElementById('lineCv');
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const a = [20, 28, 26, 40, 46, 58, 64, 78, 86];
    const b = [35, 30, 38, 36, 48, 50, 60, 62, 72];
    let k = 0;
    (function frame() {
      k = Math.min(1, k + 0.02);
      ctx.clearRect(0, 0, W, H);
      [[b, '#00E5FF'], [a, '#39FF14']].forEach(([data, col]) => {
        const n = Math.max(2, Math.ceil(data.length * k));
        ctx.beginPath();
        data.slice(0, n).forEach((v, i) => {
          const x = (i / (data.length - 1)) * (W - 10) + 5;
          const y = H - 8 - (v / 100) * (H - 16);
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        });
        ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineJoin = 'round';
        ctx.shadowColor = col; ctx.shadowBlur = 10; ctx.stroke(); ctx.shadowBlur = 0;
      });
      if (k < 1) requestAnimationFrame(frame);
    })();
  }
})();

/* =========================================================
   7. МИНИ-ТРЕНАЖЁР
   Тексты сфер, пунктов и заданий — меняйте здесь
   ========================================================= */
const SPHERES = {
  'Энергия': {
    opts: ['Просыпаюсь уже уставшей', 'К вечеру нет сил ни на что', 'Держусь на кофе и сладком', 'Нет времени на движение'],
    reflect: 'Похоже, энергия тела сейчас на нуле — а без неё даже большой потенциал не включается.',
    mission: 'Сегодня ляг спать на 30 минут раньше и выйди на 15 минут на солнце днём. Это два первых «С» из системы 5С.'
  },
  'Уверенность': {
    opts: ['Сомневаюсь в своих знаниях', 'Боюсь оценки других', 'Не беру то, что заслуживаю', 'Сравниваю себя с другими'],
    reflect: 'Это очень похоже на Синдром Самозванца — когда знаний и опыта много, а внутри «я недостаточно хороша».',
    mission: 'Запиши 5 своих реальных достижений за последний год. Перечитай вслух. Это факты, а не мнения.'
  },
  'Здоровье': {
    opts: ['Давно не проходила чекап', 'Часто болит голова или спина', 'Стресс «оседает» в теле', 'Плохой сон'],
    reflect: 'Тело всегда первым говорит о том, что внутри что-то не так. Важно услышать его вовремя.',
    mission: 'Запишись на базовый чекап в ближайшие 2 недели — и отметь в календаре дату.'
  },
  'Предназначение': {
    opts: ['Не понимаю, чего хочу', 'Работаю «не на своём месте»', 'Много идей — нет действий', 'Живу чужими ожиданиями'],
    reflect: 'Таланты не исчезают — они просто ждут, когда у вас появятся силы и разрешение себе.',
    mission: 'Вспомни 3 момента, когда время летело незаметно. Что вы тогда делали? Запиши — это подсказки.'
  },
  'Отношения': {
    opts: ['Чувствую себя одиноко', 'Много конфликтов', 'Трудно говорить «нет»', 'Мало тепла и прикосновений'],
    reflect: 'Отношения — зеркало внутреннего состояния. Когда ресурса мало, мы чаще закрываемся или уступаем.',
    mission: 'Сегодня обними близкого человека дольше обычного — 20 секунд. Тактильность тоже восстанавливает энергию.'
  },
  'Деньги': {
    opts: ['Работаю много — денег мало', 'Стесняюсь называть цену', 'Тревога о будущем', 'Не умею откладывать'],
    reflect: 'Деньги часто упираются не в навыки, а в убеждения о себе и своей ценности.',
    mission: 'Допиши фразу 10 раз, не думая: «Деньги — это…». Посмотри, какие убеждения всплыли.'
  }
};

(function trainer() {
  const chips = document.getElementById('chips');
  const opts = document.getElementById('opts');
  const stepB = document.getElementById('stepB');
  const stepC = document.getElementById('stepC');
  const go = document.getElementById('goBtn');
  let cur = null;

  Object.keys(SPHERES).forEach(name => {
    const b = document.createElement('button');
    b.className = 'chip'; b.type = 'button'; b.textContent = name;
    b.onclick = () => {
      chips.querySelectorAll('.chip').forEach(c => c.classList.toggle('on', c === b));
      cur = name;
      opts.innerHTML = '';
      SPHERES[name].opts.forEach(o => {
        const l = document.createElement('label');
        l.className = 'opt';
        l.innerHTML = `<input type="checkbox"><span class="bx"></span><span>${o}</span>`;
        l.querySelector('input').onchange = e => {
          l.classList.toggle('ck', e.target.checked);
          go.disabled = !opts.querySelector('input:checked');
        };
        opts.appendChild(l);
      });
      go.disabled = true;
      stepC.classList.remove('show');
      stepB.classList.add('show');
    };
    chips.appendChild(b);
  });

  go.onclick = () => {
    const s = SPHERES[cur];
    document.getElementById('reflect').textContent = s.reflect;
    document.getElementById('mission').textContent = s.mission;
    stepC.classList.add('show');
    setTimeout(() => stepC.scrollIntoView({ behavior: 'smooth', block: 'center' }), 250);
  };
})();

/* =========================================================
   8. ФОРМА ЗАЯВКИ
   Сейчас просто показывает «Спасибо». Чтобы заявки приходили,
   подключите отправку (Telegram-бот, Google-таблица, Supabase…).
   ========================================================= */
document.getElementById('leadForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  console.log('Заявка:', data);
  document.getElementById('formOk').classList.add('show');
  e.target.reset();
});
