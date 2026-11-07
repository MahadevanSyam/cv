/* ==========================================================
   Mahadevan Syam | Mission Control portfolio
   ----------------------------------------------------------
   EDIT HERE: contact links and the certificate list.
   ========================================================== */

const CONFIG = {
  email: "mahadevansyam@gmail.com",
  // Paste your full LinkedIn profile URL here, e.g. "https://www.linkedin.com/in/your-handle"
  // (left empty, the site links to a LinkedIn people search for your name).
  linkedin: "",
  // Optional: paste your GitHub profile URL to show a GitHub link in the Contact section.
  github: ""
};

/*
  CERTIFICATES
  ------------
  1. Put each certificate scan inside the "certificates" folder.
  2. Name it exactly like the "file" value below (no extension needed).
     The site tries .jpg, .jpeg, .png and .webp automatically.
       e.g.  file: "isro-vssc-internship"  ->  certificates/isro-vssc-internship.jpg
  3. A card without a scan still shows as a clean badge, so nothing looks broken.
  4. Add, remove or rename entries freely. "cat" must be one of:
       internship | leadership | achievement | music | education
*/
const CERTIFICATES = [
  {
    title: "Avionics Internship, PSLV Division",
    issuer: "Vikram Sarabhai Space Centre (ISRO)",
    year: "Nov 2023",
    cat: "internship",
    icon: "\u{1F680}",
    desc: "Selected among 70 students nationwide; designed and modelled mission-critical avionics modules.",
    file: "isro-vssc-internship"
  },
  {
    title: "Embedded Internship",
    issuer: "iOrbit Digital Technology",
    year: "Oct 2023",
    cat: "internship",
    icon: "\u{1F4E1}",
    desc: "Data-processing scripts for fibre-optic mat sensors, improving accuracy by ~30%.",
    file: "iorbit-embedded-internship"
  },
  {
    title: "Project Internship",
    issuer: "C-DAC",
    year: "Aug – Sept 2023",
    cat: "internship",
    icon: "\u{1F310}",
    desc: "IoT monitoring system with automation, database architecture and real-time analytics.",
    file: "cdac-project-internship"
  },
  {
    title: "Chairperson, IEEE Signal Processing Society",
    issuer: "IEEE SPS, VIT",
    year: "2024",
    cat: "leadership",
    icon: "\u{1F396}️",
    desc: "Led an executive committee and 200+ members; core member 2023 – 2024.",
    file: "ieee-sps-chairperson"
  },
  {
    title: "Patent Publication: Quad Core VCO Architecture",
    issuer: "Application No. 202541122101",
    year: "2025",
    cat: "achievement",
    icon: "\u{1F4A1}",
    desc: "Primary inventor of a novel, scalable and cost-efficient Voltage-Controlled Oscillator architecture.",
    file: "patent-quad-core-vco"
  },
  {
    title: "Book Chapter: IoT-Based Automation for ESL Classrooms",
    issuer: "Peer-reviewed publication",
    year: "2022",
    cat: "achievement",
    icon: "\u{1F4D6}",
    desc: "Co-authored research on IoT systems for better learning outcomes in ESL environments.",
    file: "book-chapter-esl-iot"
  },
  {
    title: "Keyboard / Piano, Grade 5",
    issuer: "Trinity College London",
    year: "",
    cat: "music",
    icon: "\u{1F3B9}",
    desc: "Certified keyboardist under Trinity College London.",
    file: "trinity-grade5-keyboard"
  },
  {
    title: "B.Tech, Electronics & Communication Engineering",
    issuer: "Vellore Institute of Technology",
    year: "2025",
    cat: "education",
    icon: "\u{1F393}",
    desc: "CGPA 8.82 / 10, Vellore Campus.",
    file: "vit-btech-ece"
  }
];

const CATEGORY_LABELS = {
  all: "All",
  internship: "Internships",
  leadership: "Leadership",
  achievement: "Patent & papers",
  music: "Music",
  education: "Education"
};

/* ---------- tiny helpers ---------- */
const $ = (id) => document.getElementById(id);
const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function safeStorage(op, key, value) {
  try {
    if (op === "get") return window.sessionStorage.getItem(key);
    window.sessionStorage.setItem(key, value);
  } catch (e) { /* storage may be blocked; that's fine */ }
  return null;
}

/* ==========================================================
   1. Launch sequence
   ========================================================== */
const Launch = (() => {
  let timers = [];
  let running = false;

  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  function finish() {
    const el = $("launch");
    clearTimers();
    running = false;
    if (!el) return;
    el.classList.remove("active", "ignite", "liftoff", "fade");
    el.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    safeStorage("set", "launched", "1");
  }

  function start() {
    const el = $("launch");
    const countdown = $("countdown");
    const status = $("launchStatus");
    if (!el || !countdown || !status || running) return;
    running = true;

    window.scrollTo(0, 0);
    el.classList.remove("ignite", "liftoff", "fade");
    el.classList.add("active");
    el.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    // failsafe: never let the overlay trap the page
    later(finish, 9000);

    const steps = [
      { t: 0,    text: "T-3", msg: "Fuel loaded. Avionics green." },
      { t: 900,  text: "T-2", msg: "Test suites passing overnight. Jenkins is happy." },
      { t: 1800, text: "T-1", msg: "Oscillators locked. Piano tuned." },
      { t: 2700, text: "IGNITION", msg: "Main engine start." },
      { t: 3500, text: "LIFTOFF", msg: "We have liftoff." }
    ];
    steps.forEach((s) => later(() => {
      countdown.textContent = s.text;
      status.textContent = s.msg;
      countdown.classList.remove("tick");
      void countdown.offsetWidth; // restart animation
      countdown.classList.add("tick");
      if (s.text === "IGNITION") el.classList.add("ignite");
      if (s.text === "LIFTOFF") el.classList.add("liftoff");
    }, s.t));
    later(() => el.classList.add("fade"), 4400);
    later(finish, 5000);
  }

  function init() {
    const skip = $("skipLaunch");
    if (skip) skip.addEventListener("click", finish);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && running) finish(); });

    const replay = $("replayLaunch");
    if (replay) replay.addEventListener("click", () => { finish(); start(); });

    const seen = safeStorage("get", "launched");
    if (!seen && !reduceMotion) start();
  }

  return { init };
})();

/* ==========================================================
   2. Starfield
   ========================================================== */
function initStars() {
  const canvas = $("stars");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let w = 0, h = 0, stars = [], scrollY = 0, dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.max(60, Math.min(170, Math.floor((w * h) / 9000)));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      s: Math.random() * 0.25 + 0.05,   // drift speed
      d: Math.random() * 0.5 + 0.1,     // scroll parallax depth
      a: Math.random() * 0.6 + 0.3,
      tw: Math.random() * Math.PI * 2
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    for (const st of stars) {
      let y = (st.y - scrollY * st.d) % h;
      if (y < 0) y += h;
      const tw = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(t / 700 + st.tw);
      ctx.globalAlpha = st.a * tw;
      ctx.fillStyle = st.r > 1.1 ? "#cfeaff" : "#ffffff";
      ctx.beginPath();
      ctx.arc(st.x, y, st.r, 0, Math.PI * 2);
      ctx.fill();
      if (!reduceMotion) st.x = (st.x + st.s * 0.3 + w) % w;
    }
    ctx.globalAlpha = 1;
  }

  let raf = 0;
  function loop(t) {
    draw(t || 0);
    if (!reduceMotion && !document.hidden) raf = requestAnimationFrame(loop);
  }

  window.addEventListener("scroll", () => { scrollY = window.scrollY || 0; if (reduceMotion) draw(0); }, { passive: true });
  window.addEventListener("resize", () => { resize(); if (reduceMotion) draw(0); });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && !reduceMotion) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
  });

  resize();
  loop(0);
}

/* ==========================================================
   3. Typed roles in hero
   ========================================================== */
function initTyped() {
  const el = $("typed");
  if (!el) return;
  const roles = [
    "Automation Engineer @ KPIT",
    "Python · Jenkins · CI/CD",
    "ECE · Embedded · Oscillators",
    "Published patent inventor",
    "Trinity Grade 5 keyboardist"
  ];
  if (reduceMotion) { el.textContent = roles[0]; return; }

  let r = 0, i = 0, deleting = false;
  function tick() {
    const word = roles[r];
    el.textContent = word.slice(0, i);
    let delay = deleting ? 28 : 65;
    if (!deleting && i === word.length) { deleting = true; delay = 1600; }
    else if (deleting && i === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
    else { i += deleting ? -1 : 1; }
    setTimeout(tick, delay);
  }
  el.textContent = "";
  tick();
}

/* ==========================================================
   4. Scroll effects: progress, altimeter, header, active nav
   ========================================================== */
function initScroll() {
  const bar = $("progressBar");
  const fill = $("altFill");
  const rocket = $("altRocket");
  const readout = $("altReadout");
  const note = $("altNote");
  const header = $("siteHeader");
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
  const sections = navLinks
    .map((a) => ({ id: a.getAttribute("data-nav"), el: document.getElementById(a.getAttribute("data-nav")), a }))
    .filter((s) => s.el);

  let ticking = false;

  function stage(pct) {
    if (pct >= 99) return "KARMAN LINE ✓";
    if (pct >= 75) return "STAGE 4 · LIQUID";
    if (pct >= 50) return "STAGE 3 · SOLID";
    if (pct >= 25) return "STAGE 2 · LIQUID";
    return "STAGE 1 · SOLID";
  }

  function update() {
    ticking = false;
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const pct = Math.min(100, Math.max(0, ((window.scrollY || doc.scrollTop) / max) * 100));

    if (bar) bar.style.width = pct + "%";
    if (fill) fill.style.height = pct + "%";
    if (rocket) rocket.style.bottom = pct + "%";
    if (readout) readout.textContent = String(Math.round(pct)).padStart(3, "0");
    if (note) note.textContent = stage(pct);
    if (header) header.classList.toggle("scrolled", (window.scrollY || 0) > 8);

    // active nav link
    let current = null;
    const probe = window.innerHeight * 0.35;
    for (const s of sections) {
      const rect = s.el.getBoundingClientRect();
      if (rect.top <= probe && rect.bottom > probe) current = s.id;
    }
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("data-nav") === current));
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
}

/* ---------- mobile nav ---------- */
function initNav() {
  const toggle = $("navToggle");
  const links = $("navLinks");
  if (!toggle || !links) return;
  const close = () => { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); };
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

/* ==========================================================
   5. Reveal on scroll + count-up
   ========================================================== */
function formatNumber(n, mode) {
  if (mode === "indian") return n.toLocaleString("en-IN");
  return String(n);
}

function runCount(el) {
  const target = parseFloat(el.getAttribute("data-count")) || 0;
  const prefix = el.getAttribute("data-prefix") || "";
  const suffix = el.getAttribute("data-suffix") || "";
  const mode = el.getAttribute("data-format") || "";
  const set = (v) => { el.textContent = prefix + formatNumber(Math.round(v), mode) + suffix; };

  if (reduceMotion) { set(target); return; }
  const dur = 1400;
  const start = performance.now();
  function frame(now) {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    set(target * eased);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function initReveal() {
  const items = Array.from(document.querySelectorAll(".reveal"));
  const counters = Array.from(document.querySelectorAll(".stat-num[data-count]"));

  // Fallback: no IntersectionObserver -> show everything immediately
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in"));
    counters.forEach(runCount);
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  items.forEach((el, i) => {
    el.style.transitionDelay = ((i % 4) * 70) + "ms";
    io.observe(el);
  });

  const co = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      runCount(entry.target);
      co.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  counters.forEach((el) => co.observe(el));

  // Safety net: if anything is still hidden after 4s (e.g. odd embeds), reveal it.
  setTimeout(() => items.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("in");
  }), 4000);
}

/* ==========================================================
   6. Certificates: gallery, filters, lightbox
   ========================================================== */
const Certs = (() => {
  const EXTS = [".jpg", ".jpeg", ".png", ".webp"];
  let visible = [];       // entries currently shown that have a loaded scan
  let lbIndex = 0;

  function tryLoad(base, onOk, onFail) {
    let i = 0;
    const probe = new Image();
    probe.onload = () => onOk(probe.src);
    probe.onerror = () => {
      i += 1;
      if (i < EXTS.length) probe.src = "certificates/" + base + EXTS[i];
      else onFail();
    };
    probe.src = "certificates/" + base + EXTS[0];
  }

  function buildCard(c, idx) {
    const card = document.createElement("article");
    card.className = "cert";
    card.style.animationDelay = (idx * 45) + "ms";

    const thumb = document.createElement("div");
    thumb.className = "cert-thumb";
    const seal = document.createElement("div");
    seal.className = "seal";
    seal.textContent = c.icon || "\u{1F3C5}";
    thumb.appendChild(seal);

    const body = document.createElement("div");
    body.className = "cert-body";
    const cat = document.createElement("span");
    cat.className = "cert-cat";
    cat.textContent = (CATEGORY_LABELS[c.cat] || c.cat) + (c.year ? " · " + c.year : "");
    const h = document.createElement("h3");
    h.textContent = c.title;
    const iss = document.createElement("div");
    iss.className = "cert-issuer";
    iss.textContent = c.issuer || "";
    const p = document.createElement("p");
    p.textContent = c.desc || "";
    body.append(cat, h, iss, p);
    card.append(thumb, body);

    // Try to load the real scan
    tryLoad(c.file, (src) => {
      c.src = src;
      const img = document.createElement("img");
      img.src = src;
      img.alt = c.title + " certificate";
      img.loading = "lazy";
      thumb.replaceChildren(img);
      const tag = document.createElement("span");
      tag.className = "zoom-tag";
      tag.textContent = "View";
      thumb.appendChild(tag);
      card.classList.add("has-scan");
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "View " + c.title + " certificate");
      const open = () => openLightbox(c);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    }, () => { /* no scan: keep the badge */ });

    return card;
  }

  function render(filter) {
    const grid = $("certGrid");
    if (!grid) return;
    grid.replaceChildren();
    const list = CERTIFICATES.filter((c) => filter === "all" || c.cat === filter);
    visible = list;
    list.forEach((c, i) => grid.appendChild(buildCard(c, i)));
  }

  function renderFilters() {
    const box = $("certFilters");
    if (!box) return;
    const cats = ["all"].concat(Array.from(new Set(CERTIFICATES.map((c) => c.cat))));
    cats.forEach((cat, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "filter-btn" + (i === 0 ? " active" : "");
      b.textContent = CATEGORY_LABELS[cat] || cat;
      b.addEventListener("click", () => {
        box.querySelectorAll(".filter-btn").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        render(cat);
      });
      box.appendChild(b);
    });
  }

  /* lightbox */
  function scans() { return visible.filter((c) => c.src); }
  function openLightbox(c) {
    const lb = $("lightbox");
    if (!lb) return;
    lbIndex = Math.max(0, scans().indexOf(c));
    show();
    lb.hidden = false;
    document.body.classList.add("no-scroll");
    const close = $("lbClose");
    if (close) close.focus();
  }
  function show() {
    const list = scans();
    const c = list[lbIndex];
    if (!c) return;
    $("lbImg").src = c.src;
    $("lbImg").alt = c.title + " certificate";
    $("lbCap").textContent = c.title + (c.issuer ? " — " + c.issuer : "");
    const multi = list.length > 1;
    $("lbPrev").hidden = !multi;
    $("lbNext").hidden = !multi;
  }
  function step(d) {
    const n = scans().length;
    if (!n) return;
    lbIndex = (lbIndex + d + n) % n;
    show();
  }
  function closeLightbox() {
    const lb = $("lightbox");
    if (!lb || lb.hidden) return;
    lb.hidden = true;
    document.body.classList.remove("no-scroll");
  }

  function init() {
    renderFilters();
    render("all");
    const lb = $("lightbox");
    if (!lb) return;
    $("lbClose").addEventListener("click", closeLightbox);
    $("lbPrev").addEventListener("click", () => step(-1));
    $("lbNext").addEventListener("click", () => step(1));
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  return { init };
})();

/* ==========================================================
   7. Piano
   ========================================================== */
function initPiano() {
  const piano = $("piano");
  const status = $("pianoStatus");
  const playBtn = $("playMotif");
  if (!piano) return;

  // C4 (60) up to E5 (76)
  const WHITE = [60, 62, 64, 65, 67, 69, 71, 72, 74, 76];
  const WHITE_KEYS = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"];
  // black key sits after white index i
  const BLACK = [
    { midi: 61, after: 0, key: "w" },
    { midi: 63, after: 1, key: "e" },
    { midi: 66, after: 3, key: "t" },
    { midi: 68, after: 4, key: "y" },
    { midi: 70, after: 5, key: "u" },
    { midi: 73, after: 7, key: "o" },
    { midi: 75, after: 8, key: "p" }
  ];
  const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const noteName = (m) => NAMES[m % 12] + (Math.floor(m / 12) - 1);

  const els = {};        // midi -> element
  const keyToMidi = {};  // keyboard key -> midi

  WHITE.forEach((m, i) => {
    const k = document.createElement("div");
    k.className = "key white";
    k.dataset.midi = m;
    k.textContent = WHITE_KEYS[i];
    k.setAttribute("aria-label", noteName(m));
    piano.appendChild(k);
    els[m] = k;
    keyToMidi[WHITE_KEYS[i]] = m;
  });
  const wUnit = 100 / WHITE.length;
  BLACK.forEach((b) => {
    const k = document.createElement("div");
    k.className = "key black";
    k.dataset.midi = b.midi;
    k.textContent = b.key;
    k.setAttribute("aria-label", noteName(b.midi));
    k.style.left = ((b.after + 1) * wUnit - 3) + "%";
    piano.appendChild(k);
    els[b.midi] = k;
    keyToMidi[b.key] = b.midi;
  });

  /* audio */
  let ctx = null;
  const playing = {};   // midi -> {osc nodes, gain}

  function getCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try { ctx = new AC(); } catch (e) { return null; }
    }
    if (ctx.state === "suspended" && ctx.resume) ctx.resume();
    return ctx;
  }

  function noteOn(m) {
    if (playing[m]) return;
    if (els[m]) els[m].classList.add("active");
    if (status) status.textContent = "Playing " + noteName(m);
    const ac = getCtx();
    if (!ac) { playing[m] = { silent: true }; return; }
    const freq = 440 * Math.pow(2, (m - 69) / 12);
    const now = ac.currentTime;
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.28, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.4);
    gain.connect(ac.destination);

    const o1 = ac.createOscillator(); o1.type = "triangle"; o1.frequency.value = freq;
    const o2 = ac.createOscillator(); o2.type = "sine"; o2.frequency.value = freq * 2;
    const g2 = ac.createGain(); g2.gain.value = 0.25;
    o1.connect(gain); o2.connect(g2); g2.connect(gain);
    o1.start(now); o2.start(now);
    playing[m] = { o1, o2, gain };
  }

  function noteOff(m) {
    const n = playing[m];
    if (!n) return;
    delete playing[m];
    if (els[m]) els[m].classList.remove("active");
    if (n.silent || !ctx) return;
    const now = ctx.currentTime;
    try {
      n.gain.gain.cancelScheduledValues(now);
      n.gain.gain.setValueAtTime(Math.max(n.gain.gain.value, 0.0001), now);
      n.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      n.o1.stop(now + 0.4); n.o2.stop(now + 0.4);
    } catch (e) { /* ignore */ }
  }

  /* pointer input */
  piano.addEventListener("pointerdown", (e) => {
    const k = e.target.closest ? e.target.closest(".key") : null;
    if (!k) return;
    e.preventDefault();
    const m = Number(k.dataset.midi);
    noteOn(m);
    const up = () => {
      noteOff(m);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
  });

  /* computer keyboard input */
  function typingInField(e) {
    const t = e.target;
    return t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
  }
  document.addEventListener("keydown", (e) => {
    if (e.repeat || e.ctrlKey || e.metaKey || e.altKey || typingInField(e)) return;
    const m = keyToMidi[(e.key || "").toLowerCase()];
    if (m !== undefined) noteOn(m);
  });
  document.addEventListener("keyup", (e) => {
    const m = keyToMidi[(e.key || "").toLowerCase()];
    if (m !== undefined) noteOff(m);
  });
  window.addEventListener("blur", () => Object.keys(playing).forEach((m) => noteOff(Number(m))));

  /* original little motif (arpeggios, nothing borrowed) */
  let motifTimers = [];
  const MOTIF = [
    [60, 0], [64, 260], [67, 520], [72, 780], [71, 1100], [67, 1360], [64, 1620],
    [65, 1950], [69, 2210], [72, 2470], [76, 2730], [74, 3050], [71, 3310], [67, 3570], [72, 3900]
  ];
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      motifTimers.forEach(clearTimeout); motifTimers = [];
      Object.keys(playing).forEach((m) => noteOff(Number(m)));
      getCtx();
      if (status) status.textContent = "Now playing...";
      MOTIF.forEach(([m, t], i) => {
        motifTimers.push(setTimeout(() => noteOn(m), t));
        const dur = i === MOTIF.length - 1 ? 1100 : 380;
        motifTimers.push(setTimeout(() => noteOff(m), t + dur));
      });
      motifTimers.push(setTimeout(() => { if (status) status.textContent = "Encore? Take the controls."; }, 5100));
    });
  }
}

/* ==========================================================
   8. Contact
   ========================================================== */
function initContact() {
  const li = $("linkedinLink");
  if (li && CONFIG.linkedin) li.href = CONFIG.linkedin;

  const gh = $("githubLink");
  const ghItem = $("githubItem");
  if (gh && ghItem && CONFIG.github) { gh.href = CONFIG.github; ghItem.hidden = false; }

  const form = $("contactForm");
  const note = $("formNote");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("cName");
    const msg = $("cMsg");
    const nOk = name.value.trim().length > 0;
    const mOk = msg.value.trim().length > 0;
    name.classList.toggle("invalid", !nOk);
    msg.classList.toggle("invalid", !mOk);
    if (!nOk || !mOk) {
      if (note) note.textContent = "Please add your name and a message first.";
      return;
    }
    const subject = "Hello from your portfolio, " + name.value.trim();
    const body = msg.value.trim() + "\n\n— " + name.value.trim();
    window.location.href = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    if (note) note.textContent = "Opening your email app... if nothing happens, write to " + CONFIG.email + " directly.";
  });
}

/* ==========================================================
   Boot
   ========================================================== */
function boot() {
  // Each module is isolated so one failure can't break the rest of the page.
  const modules = [initReveal, initScroll, initNav, initStars, initTyped, Certs.init, initPiano, initContact, Launch.init];
  modules.forEach((fn) => {
    try { fn(); } catch (err) { if (window.console) console.error("Module failed:", fn.name, err); }
  });
  const y = $("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
