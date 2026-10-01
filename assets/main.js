(() => {
  "use strict";

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const toFa = (s) => String(s).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const fmt = (n) => n.toLocaleString("en-US");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------------- Icons (Lucide-style, stroke) ---------------- */
  const ICONS = {
    car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    languages: '<path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.7 9a1 1 0 0 1-.6 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.6 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9Z"/><path d="m9 14 2 2 4-4"/>',
    arrow: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    x: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    quote: '<path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2zM5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
    clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.8 9.8 0 0 1 6.7 2.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.8 9.8 0 0 1-6.7-2.7L3 16"/><path d="M8 16H3v5"/>',
    idcard: '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5 16c.5-1.5 1.7-2 3-2s2.5.5 3 2M14 10h5M14 14h4"/>',
    message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
    smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4M21 5h-4"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    safe: '<rect x="3" y="3" width="18" height="17" rx="2"/><circle cx="12" cy="11.5" r="3.5"/><path d="M12 8V6.5M12 16.5V15M15.5 11.5H17M7 11.5h1.5M7 20v2M17 20v2"/>',
    checks: '<path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/>',
    bank: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4z"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8H8M16 12H8M13 16H8"/>',
    chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/><path d="M16 8h4v4"/>',
    hourglass: '<path d="M5 22h14M5 2h14M17 22v-4.2a2 2 0 0 0-.6-1.4L12 12l-4.4 4.4a2 2 0 0 0-.6 1.4V22M7 2v4.2a2 2 0 0 0 .6 1.4L12 12l4.4-4.4a2 2 0 0 0 .6-1.4V2"/>',
    sheet: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 9v12M15 9v12"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
    building: '<path d="M10 12h.01M10 8h.01M14 8h.01M10 16h.01M14 12h.01"/><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6"/><path d="M6 22h6"/><rect x="14" y="16" width="8" height="6" rx="1"/><path d="M16 16v-2a2 2 0 1 1 4 0v2"/>',
    usercog: '<circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4"/><circle cx="18" cy="17" r="3"/><path d="M18 12v2M18 20v2M13.7 14.5l1.7 1M20.6 18.5l1.7 1M13.7 19.5l1.7-1M20.6 15.5l1.7-1"/>',
    history: '<path d="M3 12a9 9 0 1 0 9-9 9.8 9.8 0 0 0-6.7 2.7L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/>',
    cloudup: '<path d="M4.2 15.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2"/><path d="M12 12v9M16 16l-4-4-4 4"/>',
    key: '<path d="M2.6 18.4A2 2 0 0 0 2 19.8V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.2a2 2 0 0 0 1.4-.6l.8-.8a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"/>',
    undo: '<path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>',
    tablet: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 18h.01"/>',
    laptop: '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.3 2.6a1 1 0 0 1-.9 1.4H3.6a1 1 0 0 1-.9-1.4L4 16"/>',
    browser: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M21.2 8H12M3.9 6.1 8.5 14M10.9 21.9 15.5 14"/>',
  };
  const svg = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
  const paintIcons = (root = document) => $$("i[data-i]", root).forEach((el) => { if (!el.firstChild) el.innerHTML = svg(el.dataset.i); });

  /* ---------------- Car photos ----------------
     photo = Wikimedia Commons file name (free licence), or a local path such as
     "assets/cars/camry.jpg" to use your own fleet photos instead. */
  const photoUrl = (p, w = 640) => p.startsWith("assets/") ? p
    : `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(p)}?width=${w}`;
  const photoPage = (p) => p.startsWith("assets/") ? null : `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(p)}`;

  const PHOTOS = {
    camry: "Toyota_Camry_XV70_01_China_2018-03-07.jpg",
    elantra: "2016_Hyundai_Elantra_(AD)_Active_sedan_(2016-11-20).jpg",
    cerato: "Kia_Cerato_1.6_EX_2019_(2).jpg",
    corolla: "Toyota_Corolla_sedan_E210_hydrid.jpg",
    tucson: "Hyundai_Tucson_TL.jpg",
    sportage: "2016_Kia_Sportage_(QL_MY17)_Platinum_wagon_(2017-07-15)_01.jpg",
    sonata: "Hyundai_Sonata_2.0T_LF_white_(1).jpg",
    tiggo: "Fownix_Tiggo_7_Pro_001.jpg",
    prado: "TOYOTA_LAND_CRUISER_PRADO_(J150)_China_(20)_(cropped).jpg",
    eclass: "2020-09-22_MB-E200_W213-MOPF.jpg",
    bmw5: "Bmw_5_series_g30_blue_(1).jpg",
    dena: "Iran_Khodro_Dena_Plus_2018.jpg",
  };
  const G = {
    blue: "linear-gradient(120deg,#0ea5e9,#1e3a8a)", pink: "linear-gradient(120deg,#ec4899,#7c3aed)",
    green: "linear-gradient(120deg,#10b981,#0ea5e9)", violet: "linear-gradient(120deg,#6366f1,#a855f7)",
    orange: "linear-gradient(120deg,#f59e0b,#ef4444)", slate: "linear-gradient(120deg,#475569,#1e293b)",
  };

  // Load the photo into `box`; on failure the gradient + car icon stays.
  function loadPhoto(box, photo, w) {
    if (!photo) return;
    const img = new Image();
    img.alt = "";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";
    img.onload = () => { box.appendChild(img); box.classList.add("has-photo"); };
    img.src = photoUrl(photo, w);
  }

  /* Sample listings shown inside the phone mockups (prices are illustrative). */
  const LISTINGS = [
    { fa: "تویوتا کمری ۲۰۲۲", en: "Toyota Camry 2022", at: "airport", price: 4500000, g: G.blue, photo: PHOTOS.camry },
    { fa: "هیوندای النترا", en: "Hyundai Elantra", at: "hotel", price: 3200000, g: G.pink, photo: PHOTOS.elantra },
    { fa: "کیا سراتو", en: "Kia Cerato", at: "port", price: 2900000, g: G.green, photo: PHOTOS.cerato },
    { fa: "هیوندای توسان", en: "Hyundai Tucson", at: "hotel", price: 5200000, g: G.violet, photo: PHOTOS.tucson },
    { fa: "تویوتا کرولا ۲۰۲۱", en: "Toyota Corolla 2021", at: "airport", price: 3800000, g: G.orange, photo: PHOTOS.corolla },
    { fa: "کیا اسپورتیج", en: "Kia Sportage", at: "port", price: 4900000, g: G.slate, photo: PHOTOS.sportage },
  ];

  const T = {
    fa: { name: "فارسی", dir: "rtl", avail: "۱۸ خودرو آزاد", title: "خودروی سفرت را همین‌جا رزرو کن", search: "جست‌وجوی برند یا مدل…", all: "همه", deliv: "تحویل در", at: { airport: "فرودگاه کیش", hotel: "هتل", port: "اسکله" }, day: "/ روز", book: "رزرو" },
    en: { name: "English", dir: "ltr", avail: "18 cars available", title: "Book your trip car right here", search: "Search brand or model…", all: "All", deliv: "Delivery:", at: { airport: "Kish Airport", hotel: "your hotel", port: "the pier" }, day: "/ day", book: "Book" },
    ar: { name: "العربية", dir: "rtl", avail: "18 سيارة متاحة", title: "احجز سيارة رحلتك من هنا", search: "ابحث عن الماركة أو الطراز…", all: "الكل", deliv: "التسليم:", at: { airport: "مطار كيش", hotel: "فندقك", port: "الرصيف" }, day: "/ يوم", book: "احجز" },
    tr: { name: "Türkçe", dir: "ltr", avail: "18 araç müsait", title: "Seyahat aracını hemen burada kirala", search: "Marka veya model ara…", all: "Tümü", deliv: "Teslimat:", at: { airport: "Kiş Havalimanı", hotel: "oteliniz", port: "iskele" }, day: "/ gün", book: "Kirala" },
    ru: { name: "Русский", dir: "ltr", avail: "18 авто доступно", title: "Забронируйте авто для поездки прямо здесь", search: "Поиск марки или модели…", all: "Все", deliv: "Доставка:", at: { airport: "аэропорт Киш", hotel: "ваш отель", port: "причал" }, day: "/ сутки", book: "Бронь" },
    zh: { name: "中文", dir: "ltr", avail: "18 辆车可用", title: "在这里预订您的旅行用车", search: "搜索品牌或车型…", all: "全部", deliv: "交付地点：", at: { airport: "基什机场", hotel: "您的酒店", port: "码头" }, day: "/ 天", book: "预订" },
    de: { name: "Deutsch", dir: "ltr", avail: "18 Autos verfügbar", title: "Buche hier dein Reiseauto", search: "Marke oder Modell suchen…", all: "Alle", deliv: "Übergabe:", at: { airport: "Flughafen Kisch", hotel: "Ihr Hotel", port: "Anleger" }, day: "/ Tag", book: "Buchen" },
    fr: { name: "Français", dir: "ltr", avail: "18 voitures disponibles", title: "Réservez ici votre voiture de voyage", search: "Rechercher une marque ou un modèle…", all: "Tout", deliv: "Livraison :", at: { airport: "aéroport de Kish", hotel: "votre hôtel", port: "le quai" }, day: "/ jour", book: "Réserver" },
    es: { name: "Español", dir: "ltr", avail: "18 coches disponibles", title: "Reserva aquí el coche para tu viaje", search: "Buscar marca o modelo…", all: "Todos", deliv: "Entrega:", at: { airport: "aeropuerto de Kish", hotel: "tu hotel", port: "el muelle" }, day: "/ día", book: "Reservar" },
    it: { name: "Italiano", dir: "ltr", avail: "18 auto disponibili", title: "Prenota qui l'auto per il tuo viaggio", search: "Cerca marca o modello…", all: "Tutte", deliv: "Consegna:", at: { airport: "aeroporto di Kish", hotel: "il tuo hotel", port: "il molo" }, day: "/ giorno", book: "Prenota" },
    az: { name: "Azərbaycan", dir: "ltr", avail: "18 avtomobil mövcuddur", title: "Səyahət avtomobilini elə burada sifariş et", search: "Marka və ya model axtar…", all: "Hamısı", deliv: "Təhvil:", at: { airport: "Kiş hava limanı", hotel: "oteliniz", port: "körpü" }, day: "/ gün", book: "Sifariş" },
    ur: { name: "اردو", dir: "rtl", avail: "18 گاڑیاں دستیاب", title: "اپنے سفر کی گاڑی یہیں بُک کریں", search: "برانڈ یا ماڈل تلاش کریں…", all: "سب", deliv: "ڈیلیوری:", at: { airport: "کیش ایئرپورٹ", hotel: "آپ کا ہوٹل", port: "جیٹی" }, day: "/ دن", book: "بُک کریں" },
    hi: { name: "हिन्दी", dir: "ltr", avail: "18 कारें उपलब्ध", title: "अपनी यात्रा की कार यहीं बुक करें", search: "ब्रांड या मॉडल खोजें…", all: "सभी", deliv: "डिलीवरी:", at: { airport: "किश हवाई अड्डा", hotel: "आपका होटल", port: "घाट" }, day: "/ दिन", book: "बुक करें" },
    ja: { name: "日本語", dir: "ltr", avail: "18台 利用可能", title: "旅行用の車をここで予約", search: "ブランドまたはモデルを検索…", all: "すべて", deliv: "受け渡し：", at: { airport: "キーシュ空港", hotel: "ホテル", port: "桟橋" }, day: "/ 日", book: "予約" },
  };

  function cardHTML(car, lang) {
    const t = T[lang];
    const name = lang === "fa" ? car.fa : car.en;
    const price = lang === "fa" ? toFa(fmt(car.price)) : fmt(car.price);
    return `<div class="bk-card">
      <div class="bk-card__img" style="--g:${car.g}" data-photo="${car.photo}">${svg("car")}</div>
      <div class="bk-card__body"><b>${name}</b><small>${t.deliv} ${t.at[car.at]}</small>
        <div class="bk-card__row"><strong>${price} ${t.day}</strong><em>${t.book}</em></div></div>
    </div>`;
  }
  const hydratePhotos = (root) => $$("[data-photo]", root).forEach((b) => loadPhoto(b, b.dataset.photo, 480));

  /* Hero phone: endless Persian listing feed (list duplicated for a seamless loop) */
  const heroList = $("#heroList");
  if (heroList) {
    const html = LISTINGS.map((c) => cardHTML(c, "fa")).join("");
    heroList.innerHTML = html + html;
    hydratePhotos(heroList);
  }

  /* Hero toast: a new online order pops up periodically */
  const heroToast = $("#heroToast");
  if (heroToast) {
    const show = () => { heroToast.classList.add("is-on"); setTimeout(() => heroToast.classList.remove("is-on"), 4200); };
    setTimeout(show, 2200);
    if (!reduceMotion) setInterval(show, 9000);
  }

  /* Hero headline typing */
  const typed = $("#typed");
  if (typed && !reduceMotion) {
    const text = typed.textContent;
    const chars = [...text];
    typed.textContent = "";
    const caret = document.createElement("span");
    caret.className = "hero__caret";
    caret.setAttribute("aria-hidden", "true");
    typed.after(caret);
    typed.parentElement.setAttribute("aria-label", text);
    let i = 0;
    const tick = () => { typed.textContent = chars.slice(0, ++i).join(""); if (i < chars.length) setTimeout(tick, 70); };
    setTimeout(tick, 600);
  }

  /* ---------------- Car strip ---------------- */
  const STRIP = [
    { fa: "تویوتا کمری", en: "Toyota Camry", g: G.blue, photo: PHOTOS.camry },
    { fa: "هیوندای النترا", en: "Hyundai Elantra", g: G.pink, photo: PHOTOS.elantra },
    { fa: "کیا سراتو", en: "Kia Cerato", g: G.green, photo: PHOTOS.cerato },
    { fa: "تویوتا کرولا", en: "Toyota Corolla", g: G.orange, photo: PHOTOS.corolla },
    { fa: "هیوندای توسان", en: "Hyundai Tucson", g: G.violet, photo: PHOTOS.tucson },
    { fa: "کیا اسپورتیج", en: "Kia Sportage", g: G.slate, photo: PHOTOS.sportage },
    { fa: "هیوندای سوناتا", en: "Hyundai Sonata", g: G.blue, photo: PHOTOS.sonata },
    { fa: "فونیکس تیگو ۷ پرو", en: "Fownix Tiggo 7 Pro", g: G.pink, photo: PHOTOS.tiggo },
    { fa: "تویوتا پرادو", en: "Toyota Land Cruiser Prado", g: G.green, photo: PHOTOS.prado },
    { fa: "مرسدس بنز E200", en: "Mercedes-Benz E-Class", g: G.slate, photo: PHOTOS.eclass },
    { fa: "بی‌ام‌و سری ۵", en: "BMW 5 Series", g: G.violet, photo: PHOTOS.bmw5 },
    { fa: "دنا پلاس", en: "IKCO Dena+", g: G.orange, photo: PHOTOS.dena },
  ];
  const track = $("#carTrack");
  if (track) {
    const card = (c, hidden) => {
      const page = photoPage(c.photo);
      return `<article class="carcard"${hidden ? ' aria-hidden="true"' : ""}>
        <div class="carcard__img" style="--g:${c.g}" data-photo="${c.photo}">${svg("car")}
          ${page ? `<a class="carcard__credit" href="${page}" target="_blank" rel="noopener"${hidden ? ' tabindex="-1"' : ""}>© Wikimedia Commons</a>` : ""}</div>
        <div class="carcard__body"><b>${c.fa}</b><small>${c.en}</small></div>
      </article>`;
    };
    track.innerHTML = STRIP.map((c) => card(c, false)).join("") + STRIP.map((c) => card(c, true)).join("");
    $$("[data-photo]", track).forEach((b) => loadPhoto(b, b.dataset.photo, 640));
  }

  /* ---------------- Language phone ---------------- */
  const langScreen = $("#langScreen");
  const langList = $("#langList");
  const chipsBox = $("#langChips");
  let langTimer = null;
  function setLang(code, animate = true) {
    const t = T[code];
    const apply = () => {
      langScreen.dir = t.dir;
      langScreen.lang = code;
      $$("[data-t]", langScreen).forEach((el) => { el.textContent = t[el.dataset.t]; });
      langList.innerHTML = [LISTINGS[0], LISTINGS[3]].map((c) => cardHTML(c, code)).join("");
      hydratePhotos(langList);
      langScreen.classList.remove("is-swapping");
    };
    $$(".lang", chipsBox).forEach((b) => { const on = b.dataset.lang === code; b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", on); });
    if (animate && !reduceMotion) { langScreen.classList.add("is-swapping"); setTimeout(apply, 250); } else apply();
  }
  if (langScreen && chipsBox) {
    const order = ["fa", "en", "ar", "tr", "ru", "zh", "de", "fr", "es", "it", "az", "ur", "hi", "ja"];
    chipsBox.innerHTML = order.map((c) => `<button type="button" class="lang" data-lang="${c}" lang="${c}" aria-pressed="false">${T[c].name}</button>`).join("")
      + `<span class="lang lang--more">+۲۶ زبان دیگر</span>`;
    chipsBox.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-lang]");
      if (!b) return;
      clearInterval(langTimer);
      setLang(b.dataset.lang);
    });
    // Start in the visitor's own language if we have it (like the real booking page), else English.
    const nav = (navigator.language || "en").slice(0, 2);
    let idx = Math.max(order.indexOf(T[nav] && nav !== "fa" ? nav : "en"), 0);
    setLang(order[idx], false);
    // Gently cycle through languages until the visitor picks one.
    if (!reduceMotion && "IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => {
        clearInterval(langTimer);
        if (e.isIntersecting && !chipsBox.dataset.touched) {
          langTimer = setInterval(() => { idx = (idx + 1) % order.length; setLang(order[idx]); }, 2600);
        }
      }, { threshold: 0.4 }).observe(langScreen);
      chipsBox.addEventListener("pointerdown", () => { chipsBox.dataset.touched = "1"; clearInterval(langTimer); });
    }
  }

  /* Steps: auto-advance; step 4 shows the order notification */
  const steps = $$(".step");
  const langToast = $("#langToast");
  let stepIdx = 0, stepTimer = null;
  const setStep = (i) => {
    stepIdx = i;
    steps.forEach((s, j) => s.classList.toggle("is-active", j === i));
    langToast?.classList.toggle("is-on", i === steps.length - 1);
  };
  steps.forEach((s, i) => s.addEventListener("click", () => { clearInterval(stepTimer); setStep(i); }));
  if (steps.length && !reduceMotion && "IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => {
      clearInterval(stepTimer);
      if (e.isIntersecting) stepTimer = setInterval(() => setStep((stepIdx + 1) % steps.length), 3200);
    }, { threshold: 0.3 }).observe($(".online"));
  } else if (steps.length) setStep(steps.length - 1);

  /* ---------------- Strike-through on pain titles ---------------- */
  $$(".pain__q").forEach((q) => {
    const text = [...q.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim());
    text.forEach((n) => { const s = document.createElement("span"); s.textContent = n.textContent.trim(); n.replaceWith(s); });
  });

  paintIcons();

  /* ---------------- Reveal on scroll ---------------- */
  const onReveal = (el) => {
    el.classList.add("is-in");
    if (el.classList.contains("ledger")) countTo($("#refund"), 10350000, true);
  };
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const sibs = [...e.target.parentElement.children].filter((n) => n.classList.contains("reveal"));
      e.target.style.transitionDelay = Math.min(sibs.indexOf(e.target), 6) * 70 + "ms";
      onReveal(e.target);
      io.unobserve(e.target);
    }), { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else reveals.forEach(onReveal);

  /* ---------------- Counters ---------------- */
  function countTo(el, target, money = false) {
    if (!el) return;
    const out = (v) => toFa(money ? fmt(v) : v);
    if (reduceMotion) { el.textContent = out(target); return; }
    const t0 = performance.now(), dur = 1600;
    const step = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = out(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const counters = $$("[data-count]");
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { countTo(e.target, +e.target.dataset.count); co.unobserve(e.target); }
    }), { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  } else counters.forEach((c) => countTo(c, +c.dataset.count));

  /* ---------------- Nav, progress bar, parallax ---------------- */
  const nav = $("#nav"), bar = $("#progress"), heroPhone = $(".hero__phone");
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle("is-scrolled", y > 20);
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (heroPhone && !reduceMotion && y < innerHeight) heroPhone.style.translate = `0 ${y * -0.08}px`;
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = $("#navToggle"), links = $("#navLinks");
  const setMenu = (open) => {
    links.classList.toggle("is-open", open);
    nav.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  const year = $("#year");
  if (year) year.textContent = toFa(new Date().getFullYear());
})();
