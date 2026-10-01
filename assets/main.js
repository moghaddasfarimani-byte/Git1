(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const toFa = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

  /* ---------- Car illustrations (side profile, facing right) ---------- */
  const BODIES = {
    sedan: {
      body: "M20,118 L22,92 Q24,80 40,78 L110,72 L150,44 Q160,38 175,38 L255,38 Q272,38 285,48 L320,74 L365,82 Q382,86 384,100 L385,118 Q385,124 378,124 L340,124 A35,35 0 0 0 270,124 L130,124 A35,35 0 0 0 60,124 L26,124 Q20,124 20,118 Z",
      windows: [
        "M128,74 L160,48 Q166,44 176,44 L210,44 L210,74 Z",
        "M218,44 L252,44 Q266,44 276,52 L302,74 L218,74 Z",
      ],
      door: "M214,44 L214,118", tail: [22, 88], head: [376, 92],
    },
    hatch: {
      body: "M22,118 L24,70 Q26,48 50,44 L250,42 Q268,42 280,52 L318,76 L362,84 Q380,88 382,102 L383,118 Q383,124 376,124 L340,124 A35,35 0 0 0 270,124 L130,124 A35,35 0 0 0 60,124 L28,124 Q22,124 22,118 Z",
      windows: [
        "M40,74 L44,58 Q46,50 58,50 L120,50 L120,74 Z",
        "M128,50 L205,50 L205,74 L128,74 Z",
        "M213,50 L250,50 Q264,50 274,58 L298,76 L213,76 Z",
      ],
      door: "M209,50 L209,118", tail: [26, 82], head: [374, 94],
    },
    suv: {
      body: "M20,116 L22,56 Q24,34 48,32 L262,30 Q280,30 292,42 L322,70 L366,78 Q384,82 385,98 L386,116 Q386,124 378,124 L342,124 A37,37 0 0 0 268,124 L132,124 A37,37 0 0 0 58,124 L28,124 Q20,124 20,116 Z",
      windows: [
        "M36,66 L38,46 Q40,40 50,40 L120,40 L120,66 Z",
        "M128,40 L210,40 L210,66 L128,66 Z",
        "M218,40 L262,40 Q274,40 284,50 L304,70 L218,70 Z",
      ],
      door: "M214,40 L214,116", tail: [24, 74], head: [378, 90], rails: true,
    },
  };

  let uid = 0;
  function carSVG(type, color, { still = false } = {}) {
    const b = BODIES[type] || BODIES.sedan;
    const id = "c" + (++uid);
    const wheel = (cx) => `
      <g class="wheel">
        <circle cx="${cx}" cy="124" r="26" fill="#0d0f14"/>
        <circle cx="${cx}" cy="124" r="16" fill="#b9bfcc"/>
        <circle cx="${cx}" cy="124" r="13" fill="#5c6372"/>
        <path d="M${cx},111 L${cx},137 M${cx - 13},124 L${cx + 13},124 M${cx - 9},115 L${cx + 9},133 M${cx + 9},115 L${cx - 9},133" stroke="#c9ced8" stroke-width="2.5"/>
        <circle cx="${cx}" cy="124" r="4" fill="#e5e7ec"/>
      </g>`;
    return `
<svg class="car-svg${still ? " is-still" : ""}" viewBox="0 0 405 160" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${color}" stop-opacity="1"/>
      <stop offset="1" stop-color="${color}" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".45"/>
      <stop offset=".45" stop-color="#fff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity=".35"/>
    </linearGradient>
    <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#9fc4ff" stop-opacity=".9"/>
      <stop offset="1" stop-color="#1b2433" stop-opacity=".95"/>
    </linearGradient>
  </defs>
  <ellipse cx="202" cy="148" rx="180" ry="8" fill="#000" opacity=".45"/>
  ${b.rails ? '<path d="M60,27 L250,25" stroke="#2a2f3b" stroke-width="4" stroke-linecap="round"/>' : ""}
  <path d="${b.body}" fill="url(#${id}b)"/>
  <path d="${b.body}" fill="url(#${id}s)"/>
  ${b.windows.map((w) => `<path d="${w}" fill="url(#${id}g)"/>`).join("")}
  <path d="${b.door}" stroke="#000" stroke-opacity=".25" stroke-width="1.5"/>
  <path d="M${parseFloat(b.door.slice(1)) + 14},88 h16" stroke="#000" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>
  <path d="M30,108 L378,108" stroke="#000" stroke-opacity=".18" stroke-width="2"/>
  <ellipse class="headlight" cx="${b.head[0]}" cy="${b.head[1]}" rx="9" ry="5" fill="#fff6c8"/>
  <rect x="${b.tail[0] - 2}" y="${b.tail[1]}" width="8" height="12" rx="3" fill="#ff3b30"/>
  ${wheel(95)}${wheel(305)}
</svg>`;
  }

  /* ---------- Fleet data: popular rental cars ---------- */
  const CARS = [
    { slug: "peugeot-207", fa: "پژو ۲۰۷", en: "Peugeot 207i", cat: "eco", body: "hatch", color: "#e9ecf1", gear: "اتوماتیک", seats: 5, fuel: "بنزینی" },
    { slug: "peugeot-pars", fa: "پژو پارس", en: "Peugeot Pars", cat: "eco", body: "sedan", color: "#a7adb8", gear: "دنده‌ای", seats: 5, fuel: "بنزینی" },
    { slug: "dena-plus", fa: "دنا پلاس", en: "IKCO Dena+", cat: "eco", body: "sedan", color: "#6b7280", gear: "اتوماتیک", seats: 5, fuel: "توربو" },
    { slug: "tara", fa: "تارا", en: "IKCO Tara", cat: "eco", body: "sedan", color: "#2f6fd6", gear: "اتوماتیک", seats: 5, fuel: "بنزینی" },
    { slug: "renault-l90", fa: "رنو تندر ۹۰", en: "Renault L90", cat: "eco", body: "sedan", color: "#f2f2f2", gear: "دنده‌ای", seats: 5, fuel: "بنزینی" },
    { slug: "hyundai-elantra", fa: "هیوندای النترا", en: "Hyundai Elantra", cat: "mid", body: "sedan", color: "#1f2430", gear: "اتوماتیک", seats: 5, fuel: "بنزینی" },
    { slug: "toyota-corolla", fa: "تویوتا کرولا", en: "Toyota Corolla", cat: "mid", body: "sedan", color: "#c8262d", gear: "اتوماتیک", seats: 5, fuel: "هیبرید" },
    { slug: "kia-cerato", fa: "کیا سراتو", en: "Kia Cerato", cat: "mid", body: "sedan", color: "#dfe3ea", gear: "اتوماتیک", seats: 5, fuel: "بنزینی" },
    { slug: "kia-sportage", fa: "کیا اسپورتیج", en: "Kia Sportage", cat: "suv", body: "suv", color: "#5b6270", gear: "اتوماتیک", seats: 5, fuel: "بنزینی" },
    { slug: "hyundai-tucson", fa: "هیوندای توسان", en: "Hyundai Tucson", cat: "suv", body: "suv", color: "#21508f", gear: "اتوماتیک", seats: 5, fuel: "بنزینی" },
    { slug: "chery-tiggo7", fa: "چری تیگو ۷ پرو", en: "Chery Tiggo 7 Pro", cat: "suv", body: "suv", color: "#b3242b", gear: "اتوماتیک", seats: 5, fuel: "توربو" },
    { slug: "toyota-prado", fa: "تویوتا پرادو", en: "Toyota Land Cruiser Prado", cat: "suv", body: "suv", color: "#f0f0f0", gear: "اتوماتیک", seats: 7, fuel: "بنزینی" },
    { slug: "toyota-camry", fa: "تویوتا کمری", en: "Toyota Camry", cat: "lux", body: "sedan", color: "#14161c", gear: "اتوماتیک", seats: 5, fuel: "هیبرید" },
    { slug: "hyundai-sonata", fa: "هیوندای سوناتا", en: "Hyundai Sonata", cat: "lux", body: "sedan", color: "#2b3f6b", gear: "اتوماتیک", seats: 5, fuel: "هیبرید" },
    { slug: "mercedes-e-class", fa: "مرسدس بنز کلاس E", en: "Mercedes-Benz E-Class", cat: "lux", body: "sedan", color: "#0f1115", gear: "اتوماتیک", seats: 5, fuel: "بنزینی" },
    { slug: "bmw-5-series", fa: "بی‌ام‌و سری ۵", en: "BMW 5 Series", cat: "lux", body: "sedan", color: "#1d2a44", gear: "اتوماتیک", seats: 5, fuel: "بنزینی" },
  ];
  const CAT_LABEL = { eco: "اقتصادی", mid: "میان‌رده", suv: "شاسی‌بلند", lux: "لوکس" };

  /* Swap the illustration for a real photo when assets/cars/<slug>.jpg exists. */
  function tryPhoto(media, car) {
    const img = new Image();
    img.alt = car.fa;
    img.loading = "lazy";
    img.decoding = "async";
    img.onload = () => { media.querySelector(".car-svg")?.remove(); media.prepend(img); };
    img.src = `assets/cars/${car.slug}.jpg`;
  }

  const grid = document.getElementById("fleetGrid");
  if (grid) {
    grid.innerHTML = CARS.map((c) => `
      <article class="car reveal" data-cat="${c.cat}" style="--c:${c.color === "#14161c" || c.color === "#0f1115" ? "#3d7bff" : c.color}">
        <div class="car__media">
          <span class="car__tag">${CAT_LABEL[c.cat]}</span>
          ${carSVG(c.body, c.color, { still: true })}
        </div>
        <div class="car__body">
          <h3>${c.fa}</h3>
          <div class="car__en">${c.en}</div>
          <ul class="car__specs">
            <li>${c.gear}</li><li>${toFa(c.seats)} نفر</li><li>${c.fuel}</li>
          </ul>
          <div class="car__foot">
            <small style="color:var(--muted)">موجود برای رزرو</small>
            <a href="https://app.kfzocar.ir" aria-label="رزرو ${c.fa}">رزرو <span aria-hidden="true">←</span></a>
          </div>
        </div>
      </article>`).join("");

    grid.querySelectorAll(".car").forEach((el, i) => tryPhoto(el.querySelector(".car__media"), CARS[i]));

    // Wheels spin only while hovering a card
    grid.addEventListener("pointerover", (e) => e.target.closest(".car")?.querySelector(".car-svg")?.classList.remove("is-still"));
    grid.addEventListener("pointerout", (e) => {
      const card = e.target.closest(".car");
      if (card && !card.contains(e.relatedTarget)) card.querySelector(".car-svg")?.classList.add("is-still");
    });
  }

  // Hero / phone / CTA illustrations
  const put = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  put("heroCar", carSVG("sedan", "#ff5a1f"));
  put("phoneCar", carSVG("sedan", "#14161c"));
  put("ctaCar", carSVG("suv", "#14161c"));

  /* ---------- Filters ---------- */
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((c) => {
        c.classList.toggle("is-active", c === chip);
        c.setAttribute("aria-selected", String(c === chip));
      });
      const f = chip.dataset.filter;
      grid.querySelectorAll(".car").forEach((card, i) => {
        const show = f === "all" || card.dataset.cat === f;
        card.classList.toggle("is-hidden", !show);
        card.classList.remove("is-entering");
        if (show) {
          card.classList.add("is-in");
          void card.offsetWidth;
          card.style.animationDelay = (i % 4) * 60 + "ms";
          card.classList.add("is-entering");
        }
      });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const siblings = [...e.target.parentElement.children].filter((n) => n.classList.contains("reveal"));
        e.target.style.transitionDelay = Math.min(siblings.indexOf(e.target), 6) * 80 + "ms";
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const runCounter = (el) => {
    const target = +el.dataset.count, suffix = el.dataset.suffix || "+";
    if (reduceMotion) { el.textContent = toFa(target) + suffix; return; }
    const start = performance.now(), dur = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = toFa(Math.round(target * (1 - Math.pow(1 - p, 3)))) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { runCounter(e.target); co.unobserve(e.target); }
    }), { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  } else counters.forEach(runCounter);

  /* ---------- Nav: scrolled state, progress bar, mobile menu ---------- */
  const nav = document.getElementById("nav");
  const bar = document.getElementById("progress");
  const stage = document.querySelector(".hero__stage");
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 10);
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (stage && !reduceMotion && y < innerHeight) stage.style.transform = `translateY(${y * 0.12}px)`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- Tilt on feature cards ---------- */
  if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".tilt").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = toFa(new Date().getFullYear());
})();
