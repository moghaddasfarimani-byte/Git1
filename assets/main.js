(() => {
  "use strict";

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fa = (n) => Number(n).toLocaleString("fa-IR");
  const faDigits = (s) => String(s).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const inView = (el, cb, opts = { threshold: 0.25 }) => {
    if (!el || !("IntersectionObserver" in window)) return cb(true);
    new IntersectionObserver(([e]) => cb(e.isIntersecting), opts).observe(el);
  };

  /* ---------------- icons ---------------- */
  const ICONS = {
    car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    arrow: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checks: '<path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>',
    clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.8 9.8 0 0 1 6.7 2.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.8 9.8 0 0 1-6.7-2.7L3 16"/><path d="M8 16H3v5"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
    idcard: '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5 16c.5-1.5 1.7-2 3-2s2.5.5 3 2M14 10h5M14 14h4"/>',
    message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    safe: '<rect x="3" y="3" width="18" height="17" rx="2"/><circle cx="12" cy="11.5" r="3.5"/><path d="M12 8V6.5M12 16.5V15M15.5 11.5H17M7 11.5h1.5M7 20v2M17 20v2"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    bank: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4z"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8H8M16 12H8M13 16H8"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/><path d="M16 8h4v4"/>',
    hourglass: '<path d="M5 22h14M5 2h14M17 22v-4.2a2 2 0 0 0-.6-1.4L12 12l-4.4 4.4a2 2 0 0 0-.6 1.4V22M7 2v4.2a2 2 0 0 0 .6 1.4L12 12l4.4-4.4a2 2 0 0 0 .6-1.4V2"/>',
    building: '<path d="M10 12h.01M10 8h.01M14 8h.01M10 16h.01M14 12h.01"/><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"/><path d="M6 22h6"/><rect x="14" y="16" width="8" height="6" rx="1"/><path d="M16 16v-2a2 2 0 1 1 4 0v2"/>',
    usercog: '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4"/><circle cx="18" cy="17" r="3"/><path d="M18 12v2M18 20v2M13.7 14.5l1.7 1M20.6 18.5l1.7 1M13.7 19.5l1.7-1M20.6 15.5l1.7-1"/>',
    history: '<path d="M3 12a9 9 0 1 0 9-9 9.8 9.8 0 0 0-6.7 2.7L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/>',
    undo: '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>',
    key: '<path d="M2.6 18.4A2 2 0 0 0 2 19.8V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.2a2 2 0 0 0 1.4-.6l.8-.8a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>',
    cloudup: '<path d="M4.2 15.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2"/><path d="M12 12v9M16 16l-4-4-4 4"/>',
    smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    tablet: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 18h.01"/>',
    laptop: '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.3 2.6a1 1 0 0 1-.9 1.4H3.6a1 1 0 0 1-.9-1.4L4 16"/>',
    whatsapp: '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9.2 8.4c.2-.5.9-.6 1.2-.2l.8 1.2c.2.3.1.7-.1.9l-.5.5c.5 1.1 1.4 2 2.5 2.5l.5-.5c.3-.2.7-.3.9-.1l1.2.8c.4.3.3 1-.2 1.2-.7.3-1.5.4-2.3.1a7.5 7.5 0 0 1-4.1-4.1c-.3-.8-.2-1.6.1-2.3z" fill="currentColor" stroke="none"/>',
    copy: '<rect x="8" y="8" width="14" height="14" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    browser: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M21.2 8H12M3.9 6.1 8.5 14M10.9 21.9 15.5 14"/>',
  };
  $$("i[data-i]").forEach((el) => {
    el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[el.dataset.i] || ""}</svg>`;
  });

  /* ---------------- arrivals board ---------------- */
  const STATUS = { new: "جدید", signed: "قرارداد ثبت شد", route: "در مسیر تحویل", done: "تحویل شد" };
  const NEXT = { new: "signed", signed: "route", route: "done", done: "done" };
  const rowsEl = $("#boardRows");
  const FLAP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const flapHTML = (code) => [...code].map((c) => c === " " ? '<span class="is-space"> </span>' : `<span data-c="${c}">${c}</span>`).join("");
  function rowHTML(o) {
    return `<li class="brow" data-status="${o.s}">
      <span class="brow__time">${o.t}</span>
      <span class="brow__flight"><span class="flaps">${flapHTML(o.f)}</span></span>
      <span class="brow__guest" dir="auto">${o.g}</span>
      <span class="brow__lang">${o.l}</span>
      <span class="brow__car">${o.car}</span>
      <span class="brow__at">${o.at}</span>
      <span class="brow__status"><span class="status status--${o.s}">${STATUS[o.s]}</span></span>
    </li>`;
  }
  function flap(row) {
    $$(".flaps span[data-c]", row).forEach((cell, i) => {
      const final = cell.dataset.c;
      let n = 6 + i * 2;
      const tick = () => {
        cell.classList.remove("is-flip"); void cell.offsetWidth; cell.classList.add("is-flip");
        cell.textContent = n-- > 0 ? FLAP_CHARS[(Math.random() * FLAP_CHARS.length) | 0] : final;
        if (n >= 0) setTimeout(tick, 70);
      };
      tick();
    });
  }
  function setStatus(row, s) {
    row.dataset.status = s;
    $(".brow__status", row).innerHTML = `<span class="status status--${s}">${STATUS[s]}</span>`;
  }

  if (rowsEl) {
    const initial = [
      { t: "۱۱:۲۰", f: "SU 512", g: "Olga P.", l: "RU", car: "تویوتا کمری", at: "هتل", s: "new" },
      { t: "۱۰:۵۵", f: "W5 1082", g: "مهدی ر.", l: "FA", car: "هیوندای النترا", at: "اسکله", s: "signed" },
      { t: "۱۰:۰۵", f: "EP 3810", g: "Ahmed S.", l: "AR", car: "هیوندای توسان", at: "فرودگاه", s: "route" },
      { t: "۰۹:۳۰", f: "TK 878", g: "Ayşe K.", l: "TR", car: "کیا سراتو", at: "فرودگاه", s: "done" },
      { t: "۰۷:۴۵", f: "EK 975", g: "Sara M.", l: "EN", car: "تویوتا کرولا", at: "فرودگاه", s: "done" },
    ];
    rowsEl.innerHTML = initial.map(rowHTML).join("");

    const pool = [
      { f: "Y9 7214", g: "Leyla H.", l: "AZ", car: "کیا اسپورتیج", at: "فرودگاه" },
      { f: "EK 977", g: "James W.", l: "EN", car: "هیوندای سوناتا", at: "هتل" },
      { f: "IR 289", g: "Zhang L.", l: "ZH", car: "تویوتا کمری", at: "فرودگاه" },
      { f: "W5 1084", g: "Fatima A.", l: "AR", car: "هیوندای النترا", at: "اسکله" },
      { f: "TK 880", g: "Mert Y.", l: "TR", car: "هیوندای توسان", at: "هتل" },
      { f: "EP 3812", g: "Anna K.", l: "DE", car: "کیا سراتو", at: "فرودگاه" },
      { f: "Y9 7216", g: "نگار ص.", l: "FA", car: "تویوتا کرولا", at: "هتل" },
      { f: "SU 514", g: "Dmitri V.", l: "RU", car: "کیا اسپورتیج", at: "فرودگاه" },
    ];
    let p = 0, minutes = 11 * 60 + 20, count = 18, timer = null;
    const countEl = $("#orderCount");
    const step = () => {
      $$(".brow", rowsEl).forEach((r) => { r.classList.remove("is-new"); setStatus(r, NEXT[r.dataset.status]); });
      minutes = (minutes + 9 + ((Math.random() * 12) | 0)) % (24 * 60);
      const t = faDigits(`${String((minutes / 60) | 0).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`);
      const o = { ...pool[p++ % pool.length], t, s: "new" };
      rowsEl.insertAdjacentHTML("afterbegin", rowHTML(o));
      const row = rowsEl.firstElementChild;
      row.classList.add("is-new");
      flap(row);
      while (rowsEl.children.length > 5) rowsEl.lastElementChild.remove();
      countEl.textContent = fa(++count);
    };
    if (!reduce) inView(rowsEl, (v) => { clearInterval(timer); if (v) timer = setInterval(step, 4200); });
  }

  /* ---------------- a day at the desk: sky clock ---------------- */
  const sky = $("#sky");
  const moments = $$(".moment");
  const activate = (m) => {
    moments.forEach((x) => x.classList.toggle("is-active", x === m));
    sky.dataset.sky = m.dataset.sky;
    $("#skyTime").textContent = m.dataset.time;
    $("#skyLabel").textContent = m.dataset.label;
  };
  if (sky && moments.length) {
    activate(moments[0]);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) activate(e.target); }),
        { rootMargin: "-45% 0px -45% 0px" });
      moments.forEach((m) => io.observe(m));
    }
    moments.forEach((m) => m.addEventListener("click", () => activate(m)));
  }

  /* ---------------- fleet calendar ---------------- */
  const FLEET = [
    { car: "تویوتا کمری", plate: "۲۱۴۷۸", bars: [[0, 2, "Olga P."], [3, 6, "Ahmed S."]] },
    { car: "هیوندای توسان", plate: "۳۰۵۱۲", bars: [[0, 1, "Mert Y."], [4, 6, "James W."]] },
    { car: "کیا سراتو", plate: "۱۸۹۴۰", bars: [[1, 4, "Ayşe K."]] },
    { car: "هیوندای النترا", plate: "۴۴۲۰۷", bars: [[0, 3, "مهدی ر."]] },
    { car: "تویوتا کمری", plate: "۵۲۳۶۱", bars: [[0, 1, "Sara M."]] },
  ];
  const ROW_H = 62, CAR_COL = 190;
  const body = $("#ganttBody");
  if (body) {
    const pos = (a, b) => `right:calc(${(a / 7) * 100}% + 4px);width:calc(${((b - a + 1) / 7) * 100}% - 8px)`;
    body.innerHTML = FLEET.map((r) => `
      <div class="grow">
        <div class="grow__car"><b>${r.car}</b><span class="plate"><span>${r.plate}</span><em>کیش</em></span></div>
        <div class="grow__lane">${r.bars.map(([a, b, who]) => `<span class="bar" style="${pos(a, b)}" dir="auto">${who}</span>`).join("")}</div>
      </div>`).join("");

    // The ghost booking: Camry, Wednesday–Friday. Tries the first Camry (clash), lands on the free one.
    const ghost = document.createElement("span");
    ghost.className = "bar bar--ghost is-ok";
    const g = { a: 4, b: 6 };
    const place = (row) => {
      ghost.style.top = `${row * ROW_H + 12}px`;
      ghost.style.bottom = "auto";
      ghost.style.height = `${ROW_H - 24}px`;
      ghost.style.right = `calc(${CAR_COL}px + (100% - ${CAR_COL}px) * ${g.a / 7} + 4px)`;
      ghost.style.width = `calc((100% - ${CAR_COL}px) * ${(g.b - g.a + 1) / 7} - 8px)`;
    };
    const clashBar = $$(".grow")[0].querySelectorAll(".bar")[1];
    const say = (txt) => { ghost.textContent = txt; };
    place(4); say("رزرو جدید ثبت شد · کمری ۵۲۳۶۱");
    body.appendChild(ghost);

    let loop = null;
    const run = () => {
      ghost.className = "bar bar--ghost is-hidden"; place(0); say("رزرو جدید · کمری · چهارشنبه تا جمعه");
      setTimeout(() => { ghost.classList.remove("is-hidden"); }, 300);
      setTimeout(() => { ghost.classList.add("is-bad"); clashBar.classList.add("is-clash"); say("تداخل با رزرو Ahmed S."); }, 1300);
      setTimeout(() => { clashBar.classList.remove("is-clash"); ghost.classList.remove("is-bad"); say("جست‌وجوی کمری آزاد…"); place(4); }, 3200);
      setTimeout(() => { ghost.classList.add("is-ok"); say("رزرو جدید ثبت شد · کمری ۵۲۳۶۱"); }, 4100);
    };
    if (!reduce) inView($("#gantt"), (v) => { clearInterval(loop); if (v) { run(); loop = setInterval(run, 7600); } }, { threshold: 0.5 });
  }

  /* ---------------- settlement simulator ---------------- */
  const DEPOSIT = 30000000, KM_PER_DAY = 200, KM_PRICE = 20000, LATE_RATE = 0.1;
  // Pure calculation, kept separate from the DOM.
  function settle({ rate, days, km, late, fine }) {
    const rent = rate * days;
    const cap = KM_PER_DAY * days;
    const extraKm = Math.max(0, km - cap);
    const kmCost = extraKm * KM_PRICE;
    const lateCost = Math.round(Math.min(late * LATE_RATE, 1) * rate);
    const deductions = kmCost + lateCost + fine;
    const kept = Math.min(deductions, DEPOSIT);
    return { rent, cap, extraKm, kmCost, lateCost, fine, deductions, kept, back: DEPOSIT - kept, debt: Math.max(0, deductions - DEPOSIT), income: rent + deductions };
  }
  const form = $("#simForm");
  if (form) {
    const el = (id) => document.getElementById(id);
    const money = (n, zeroEl) => { if (zeroEl) zeroEl.classList.toggle("is-zero", n === 0); return n === 0 ? "—" : fa(n); };
    let lastKey = "";
    const render = () => {
      const v = { rate: +el("simCar").value, days: +el("simDays").value, km: +el("simKm").value, late: +el("simLate").value, fine: +el("simFine").value };
      const r = settle(v);
      el("simDaysOut").textContent = `${fa(v.days)} روز`;
      el("simKmOut").textContent = `${fa(v.km)} کیلومتر`;
      el("simKmCap").textContent = `سقف: ${fa(r.cap)} کیلومتر (${fa(KM_PER_DAY)} در روز)`;
      el("simLateOut").textContent = v.late ? `${fa(v.late)} ساعت` : "بدون تأخیر";
      el("simFineOut").textContent = `${fa(v.fine)} تومان`;
      el("rDaysLbl").textContent = `${fa(v.days)} روز`;
      el("rRent").textContent = fa(r.rent);
      el("rKmLbl").textContent = r.extraKm ? `${fa(r.extraKm)} کیلومتر` : "";
      el("rKm").textContent = money(r.kmCost, el("rKm"));
      el("rLate").textContent = money(r.lateCost, el("rLate"));
      el("rFine").textContent = money(r.fine, el("rFine"));
      el("rIncome").textContent = fa(r.income);
      el("rKept").textContent = fa(r.kept);
      el("rBack").textContent = fa(r.back);
      el("rBarKept").style.width = `${(r.kept / DEPOSIT) * 100}%`;
      el("rBarBack").style.width = `${(r.back / DEPOSIT) * 100}%`;
      el("rBar").setAttribute("aria-label", `از ودیعه ${fa(r.kept)} کسر و ${fa(r.back)} تومان عودت می‌شود`);
      const debt = r.debt > 0;
      el("rTotalRow").classList.toggle("is-debt", debt);
      el("rTotalLbl").textContent = debt ? "بدهی باقی‌مانده‌ی مشتری" : "عودت ودیعه به مشتری";
      el("rTotal").textContent = fa(debt ? r.debt : r.back);
      const stamp = el("stamp");
      stamp.classList.toggle("is-debt", debt);
      stamp.lastChild.textContent = debt ? "پیگیری بدهی" : "تسویه شد";
      const key = `${debt}`;
      if (key !== lastKey && lastKey) { stamp.classList.remove("is-pop"); void stamp.offsetWidth; stamp.classList.add("is-pop"); }
      lastKey = key;
    };
    form.addEventListener("input", render);
    form.addEventListener("submit", (e) => e.preventDefault());
    render();
  }

  /* ---------------- "Book" in many languages ---------------- */
  const WORDS = [
    ["رزرو", "فارسی", "fa"], ["Book", "ENGLISH", "en"], ["احجز", "العربية", "ar"], ["Rezervasyon", "TÜRKÇE", "tr"],
    ["Бронь", "РУССКИЙ", "ru"], ["预订", "中文", "zh"], ["Buchen", "DEUTSCH", "de"], ["Réserver", "FRANÇAIS", "fr"],
    ["Reservar", "ESPAÑOL", "es"], ["Prenota", "ITALIANO", "it"], ["Sifariş", "AZƏRBAYCAN", "az"], ["بُک کریں", "اردو", "ur"],
    ["बुक करें", "हिन्दी", "hi"], ["予約", "日本語", "ja"],
  ];
  const word = $("#bigWord"), wlang = $("#bigLang");
  if (word && !reduce) {
    let i = 0, t = null;
    const next = () => {
      word.classList.add("is-out");
      setTimeout(() => {
        const [w, name, code] = WORDS[(i = (i + 1) % WORDS.length)];
        word.textContent = w; word.lang = code; wlang.textContent = name;
        word.classList.remove("is-out");
      }, 300);
    };
    inView(word, (v) => { clearInterval(t); if (v) t = setInterval(next, 1700); });
  }

  /* ---------------- nav ---------------- */
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const toggle = $("#navToggle"), links = $("#navLinks");
  const setMenu = (open) => { links.classList.toggle("is-open", open); toggle.setAttribute("aria-expanded", String(open)); };
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------------- live map: vehicle locations ---------------- */
  const mapSvg = $("#mapSvg");
  if (mapSvg) {
    const NS = "http://www.w3.org/2000/svg";
    const road = $("#ringRoad");
    const L = road.getTotalLength();
    const STATE = { moving: "در حال حرکت", parked: "متوقف", office: "در دفتر · آزاد" };
    const CARS = [
      { car: "تویوتا کمری", plate: "۲۱۴۷۸", st: "moving", who: "قرارداد: Olga P.", at: 0.05, speed: 0.018 },
      { car: "هیوندای توسان", plate: "۳۰۵۱۲", st: "moving", who: "قرارداد: Mert Y.", at: 0.42, speed: 0.013 },
      { car: "هیوندای النترا", plate: "۴۴۲۰۷", st: "moving", who: "قرارداد: مهدی ر.", at: 0.7, speed: -0.015 },
      { car: "کیا سراتو", plate: "۱۸۹۴۰", st: "parked", who: "قرارداد: Ayşe K. · نزدیک هتل‌ها", xy: [470, 344] },
      { car: "تویوتا کمری", plate: "۵۲۳۶۱", st: "office", who: "آماده‌ی تحویل بعدی", xy: [322, 232] },
    ];
    const layer = $("#carLayer");
    CARS.forEach((c, i) => {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", `map-car map-car--${c.st}`);
      const big = matchMedia("(max-width: 560px)").matches; // the map is drawn small on phones
      g.innerHTML = `<circle class="map-car__ring" r="${big ? 26 : 16}"/><circle class="map-car__dot" r="${big ? 14 : 8}"/><text class="map-car__tag" y="${big ? -26 : -18}">${c.car} ${c.plate}</text>`;
      g.addEventListener("click", () => { pick(i, true); });
      layer.appendChild(g);
      c.el = g;
    });
    const placeCar = (c) => {
      let x, y;
      if (c.xy) [x, y] = c.xy;
      else { const pt = road.getPointAtLength((((c.at % 1) + 1) % 1) * L); x = pt.x; y = pt.y; }
      c.el.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    };
    CARS.forEach(placeCar);

    const list = $("#carList");
    list.innerHTML = CARS.map((c, i) => `<li><button type="button" data-i="${i}" aria-pressed="false">
      <span class="dot is-${c.st}"></span>
      <span><b>${c.car} <span class="plate"><span>${c.plate}</span><em>کیش</em></span></b><small>${STATE[c.st]}</small></span>
    </button></li>`).join("");

    let sel = -1, auto = true, cycle = null;
    function pick(i, byUser) {
      if (byUser) { auto = false; clearInterval(cycle); }
      sel = i;
      const c = CARS[i];
      CARS.forEach((x, j) => x.el.classList.toggle("is-sel", j === i));
      $$("button", list).forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.i === i)));
      $("#popCar").textContent = c.car;
      $("#popPlate").textContent = c.plate;
      const st = $("#popState");
      st.textContent = STATE[c.st];
      st.className = `livemap__state is-${c.st}`;
      $("#popWho").textContent = `${c.who} · به‌روزرسانی: همین حالا`;
      layer.appendChild(c.el); // draw the selected car on top
    }
    list.addEventListener("click", (e) => { const b = e.target.closest("button[data-i]"); if (b) pick(+b.dataset.i, true); });
    pick(0, false);

    if (!reduce) {
      let raf = null, last = 0;
      const frame = (t) => {
        const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
        last = t;
        CARS.forEach((c) => { if (c.speed) { c.at += c.speed * dt; placeCar(c); } });
        raf = requestAnimationFrame(frame);
      };
      inView(mapSvg, (v) => {
        cancelAnimationFrame(raf); last = 0; clearInterval(cycle);
        if (v) {
          raf = requestAnimationFrame(frame);
          if (auto) cycle = setInterval(() => pick((sel + 1) % CARS.length, false), 3800);
        }
      }, { threshold: 0.2 });
    }
  }

  /* copy WhatsApp number */
  const copyBtn = $("#copyNum");
  if (copyBtn) {
    const label = $("span", copyBtn);
    const done = (txt) => { label.textContent = txt; setTimeout(() => { label.textContent = "کپی شماره"; }, 1800); };
    copyBtn.addEventListener("click", () => {
      const num = copyBtn.dataset.copy;
      const fallback = () => { const r = document.createRange(); r.selectNodeContents($("#waNumber")); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); done("انتخاب شد"); };
      try { navigator.clipboard.writeText(num).then(() => done("کپی شد"), fallback); } catch { fallback(); }
    });
  }

  $("#year").textContent = faDigits(new Date().getFullYear());
})();
