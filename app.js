/* =========================================================
   Villa Cialo Boutique — app.js v2
   Gallery categories, booking → WA + email + localStorage
   Admin CMS synced, no fake notifications
   ========================================================= */

// ── Settings (CMS) ──────────────────────────────────────
const SETTINGS_KEY = 'cialo:settings:v2';
const BOOKINGS_KEY = 'cialo:bookings:v1';
const GALLERY_KEY  = 'cialo:gallery:v1';

const DEFAULT_SETTINGS = {
  phone: '050-1234567',
  whatsapp: '972501234567',
  email: 'info@villacialoboutique.com',
  whatsappMsg: 'שלום, אני מעוניין/ת לשמוע פרטים על Villa Cialo Boutique',
  hero: { titleLine1: 'חוויית בוטיק', titleLine2: 'פרטית מול הכנרת', sub: 'ריזורט יוקרתי בנוף כנרת — בריכה מחוממת, ג\'קוזי ספא, חדרי סוויטה ונוף עוצר נשימה' },
  heroImage: '',
  aboutImg1: '',
  aboutImg2: '',
};

const DEFAULT_GALLERY = [
  { id:'g1',  file:'vila_681_331148_JmHVx7E.jpg', title:'בריכה מחוממת',    cat:'בריכה' },
  { id:'g2',  file:'vila_681_331149_hE9uJeR.jpg', title:'נוף לכנרת',       cat:'נוף'   },
  { id:'g3',  file:'vila_681_331150_CdQLDNq.jpg', title:'כנרת מהמרפסת',   cat:'נוף'   },
  { id:'g4',  file:'vila_681_331151_LSsMEj1.jpg', title:'חדר שינה',        cat:'חדרים' },
  { id:'g5',  file:'vila_681_331152_v6SV3uB.jpg', title:'סוויטה',          cat:'חדרים' },
  { id:'g6',  file:'vila_681_331153_zDbZq9y.jpg', title:'חדר נוסף',        cat:'חדרים' },
  { id:'g7',  file:'vila_681_331154_ukygqEC.jpg', title:'ג\'קוזי ספא',     cat:'ג\'קוזי'},
  { id:'g8',  file:'vila_681_331155_A49sLxn.jpg', title:'ג\'קוזי עם נוף',  cat:'ג\'קוזי'},
  { id:'g9',  file:'vila_681_331156_N3WAnES.jpg', title:'בריכה בלילה',     cat:'בריכה' },
  { id:'g10', file:'vila_681_331157_bEtKsEQ.jpg', title:'שחייה פרטית',     cat:'בריכה' },
  { id:'g11', file:'vila_681_331158_1UV49D3.jpg', title:'חדר מאסטר',       cat:'חדרים' },
  { id:'g12', file:'vila_681_331159_PShTfwt.jpg', title:'חדר ילדים',       cat:'חדרים' },
  { id:'g13', file:'vila_681_331160_KTHuqfu.jpg', title:'חצר הוילה',       cat:'כללי'  },
  { id:'g14', file:'vila_681_331161_VjMwqmc.jpg', title:'חדר זוגי',        cat:'חדרים' },
  { id:'g15', file:'vila_681_331162_FHg773s.jpg', title:'כניסה',           cat:'כללי'  },
  { id:'g16', file:'vila_681_331163_trQ91Yf.jpg', title:'סלון',            cat:'כללי'  },
  { id:'g17', file:'vila_681_331164_QHEn94q.jpg', title:'סוויטת זוגות',   cat:'חדרים' },
  { id:'g18', file:'vila_681_331165_9QsNHcA.jpg', title:'מטבח',            cat:'כללי'  },
  { id:'g19', file:'vila_681_331166_AU1uV1a.jpg', title:'שקיעה',           cat:'נוף'   },
  { id:'g20', file:'vila_681_331167_TkvD4ZK.jpg', title:'אזור בריכה',      cat:'בריכה' },
  { id:'g21', file:'vila_681_331168_a3GM41u.jpg', title:'ספא',             cat:'ג\'קוזי'},
  { id:'g22', file:'vila_681_331169_EMs9XU6.jpg', title:'הוילה מבחוץ',    cat:'כללי'  },
  { id:'g23', file:'vila_681_331170_geC6AuF.jpg', title:'גלריה',           cat:'נוף'   },
  { id:'g24', file:'vila_681_331171_m6k28dZ.jpg', title:'חדר נוסף',        cat:'חדרים' },
  { id:'g25', file:'vila_681_331179_zJTfTpM.jpg', title:'חדר משפחתי',     cat:'חדרים' },
  { id:'g26', file:'vila_681_331185_EpcV2Ms.jpg', title:'סוויטת אורחים',  cat:'חדרים' },
  { id:'g27', file:'vila_681_331200_EPjxLmP.jpg', title:'חוץ',             cat:'כללי'  },
  { id:'g28', file:'vila_681_331201_jVtvTts.jpg', title:'נוף ערב',         cat:'נוף'   },
  { id:'g29', file:'vila_681_331206_NCUHvgt.jpg', title:'כנרת',            cat:'נוף'   },
];

function getSettings() {
  try { return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') }; }
  catch { return DEFAULT_SETTINGS; }
}
function getGallery() {
  try {
    const stored = localStorage.getItem(GALLERY_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_GALLERY;
  } catch { return DEFAULT_GALLERY; }
}
function getBookings() {
  try { return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]'); } catch { return []; }
}
function saveBooking(b) {
  const arr = getBookings();
  arr.unshift(b);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(arr));
}

const S = getSettings();

// ── Apply CMS settings to page ──────────────────────────
function applySettings() {
  const wa = `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(S.whatsappMsg)}`;
  const tel = `tel:${S.phone.replace(/[^\d+]/g, '')}`;

  document.querySelectorAll('#footWa, #stickyWa, #floatWa').forEach(a => { if(a) a.href = wa; });
  const fp = document.getElementById('footPhone');
  const sc = document.getElementById('stickyCall');
  if (fp) { fp.href = tel; fp.textContent = S.phone; }
  if (sc) sc.href = tel;
  const fm = document.getElementById('footMail');
  if (fm) fm.href = `mailto:${S.email}`;

  // Hero text
  const l1 = document.getElementById('heroLine1');
  const l2 = document.getElementById('heroLine2');
  const hs = document.getElementById('heroSub');
  if (l1 && S.hero?.titleLine1) l1.textContent = S.hero.titleLine1;
  if (l2 && S.hero?.titleLine2) l2.textContent = S.hero.titleLine2;
  if (hs && S.hero?.sub) hs.textContent = S.hero.sub;

  // Hero image override
  if (S.heroImage) {
    const hi = document.getElementById('heroImg');
    if (hi) hi.src = S.heroImage;
  }
  // About images
  if (S.aboutImg1) { const a = document.getElementById('aboutImg1'); if(a) a.src = S.aboutImg1; }
  if (S.aboutImg2) { const a = document.getElementById('aboutImg2'); if(a) a.src = S.aboutImg2; }
}

// ── Loader ──────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) l.classList.add('hidden');
  }, 600);
});

// ── Custom cursor ────────────────────────────────────────
(function cursor() {
  const c = document.getElementById('cursor');
  if (!c || matchMedia('(max-width: 900px)').matches) return;
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function loop() {
    cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
    c.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();
  document.querySelectorAll('[data-cursor="hover"], a, button').forEach(el => {
    el.addEventListener('mouseenter', () => c.classList.add('hover'));
    el.addEventListener('mouseleave', () => c.classList.remove('hover'));
  });
})();

// ── Navbar scroll ────────────────────────────────────────
(function nav() {
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Mobile menu ──────────────────────────────────────────
(function burger() {
  const b = document.getElementById('burger');
  const m = document.getElementById('mobileMenu');
  b?.addEventListener('click', () => { b.classList.toggle('open'); m.classList.toggle('open'); });
  m?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    b.classList.remove('open'); m.classList.remove('open');
  }));
})();

// ── Scroll reveal ────────────────────────────────────────
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// ── Parallax ─────────────────────────────────────────────
(function parallax() {
  const heroBg = document.getElementById('heroBg');
  const pEls = document.querySelectorAll('[data-parallax]');
  function loop() {
    const y = window.scrollY;
    if (heroBg) heroBg.style.transform = `translateY(${y * 0.35}px) scale(${1 + Math.min(y/3000, 0.15)})`;
    pEls.forEach(el => {
      const r = el.getBoundingClientRect();
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const offset = (window.innerHeight - r.top) * speed * 0.3;
      el.style.transform = `translateY(${-offset}px)`;
    });
    requestAnimationFrame(loop);
  }
  loop();
})();

// ── Gallery with categories ──────────────────────────────
let galleryData = [];
let filteredGallery = [];
let lbIdx = 0;

function imgSrc(item) {
  // If it starts with data: or http, use as-is; else prefix images/
  if (!item.file) return '';
  if (item.file.startsWith('data:') || item.file.startsWith('http')) return item.file;
  return 'images/' + item.file;
}

function renderGallery(cat) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  filteredGallery = cat === 'הכל' ? [...galleryData] : galleryData.filter(g => g.cat === cat);
  const layout = ['wide tall', '', '', 'tall', '', 'wide', '', '', 'tall', '', '', '', 'wide', '', '', ''];
  grid.innerHTML = '';
  filteredGallery.forEach((img, i) => {
    const div = document.createElement('div');
    div.className = 'gi reveal in ' + (layout[i] || '');
    div.dataset.idx = i;
    div.dataset.cursor = 'hover';
    div.innerHTML = `<img src="${imgSrc(img)}" alt="${img.title}" loading="lazy" />`;
    div.addEventListener('click', () => openLightbox(i));
    grid.appendChild(div);
  });
}

function initGallery() {
  galleryData = getGallery();
  const cats = document.getElementById('galleryCats');
  if (cats) {
    cats.addEventListener('click', e => {
      const btn = e.target.closest('.gcat-btn');
      if (!btn) return;
      cats.querySelectorAll('.gcat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery(btn.dataset.cat);
    });
  }
  renderGallery('הכל');
}

// ── Lightbox ─────────────────────────────────────────────
function openLightbox(i) {
  lbIdx = i;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  img.src = imgSrc(filteredGallery[i]);
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function lbNav(dir) {
  lbIdx = (lbIdx + dir + filteredGallery.length) % filteredGallery.length;
  openLightbox(lbIdx);
}

(function lightbox() {
  const lbClose = document.getElementById('lbClose');
  const lbNext  = document.getElementById('lbNext');
  const lbPrev  = document.getElementById('lbPrev');
  const lb      = document.getElementById('lightbox');
  lbClose?.addEventListener('click', closeLightbox);
  lbNext?.addEventListener('click', () => lbNav(1));
  lbPrev?.addEventListener('click', () => lbNav(-1));
  lb?.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb?.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbNav(1);
    if (e.key === 'ArrowRight') lbNav(-1);
  });
})();

// ── Booking form ─────────────────────────────────────────
document.getElementById('bookForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const booking = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    status: 'חדש',
    name: fd.get('name') || '',
    phone: fd.get('phone') || '',
    checkin: fd.get('checkin') || '',
    checkout: fd.get('checkout') || '',
    guests: fd.get('guests') || '',
    event: fd.get('event') || '',
    notes: fd.get('notes') || '',
  };

  // Save to localStorage
  saveBooking(booking);

  // Build WA message
  const msg =
    `*הזמנה חדשה - Villa Cialo Boutique*\n` +
    `שם: ${booking.name}\n` +
    `טלפון: ${booking.phone}\n` +
    `כניסה: ${booking.checkin || '-'}\n` +
    `יציאה: ${booking.checkout || '-'}\n` +
    `אורחים: ${booking.guests}\n` +
    `אירוע: ${booking.event}\n` +
    `הערות: ${booking.notes || '-'}`;

  window.open(`https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');

  // Show success
  const form = document.getElementById('bookForm');
  const suc  = document.getElementById('bookSuccess');
  if (form) form.style.display = 'none';
  if (suc)  suc.classList.add('show');
  setTimeout(() => {
    if (form) { form.style.display = ''; form.reset(); }
    if (suc)  suc.classList.remove('show');
  }, 7000);
});

// ── Year ─────────────────────────────────────────────────
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// ── Init ──────────────────────────────────────────────────
applySettings();
initGallery();
/* =========================================================
   Villa Cialo Boutique — app.js v3
   Firebase Firestore כמקור אמת יחיד — ללא localStorage
   ========================================================= */

// ── Loader ──────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) l.classList.add('hidden');
  }, 600);
});

// ── Custom cursor ────────────────────────────────────────
(function cursor() {
  const c = document.getElementById('cursor');
  if (!c || matchMedia('(max-width: 900px)').matches) return;
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function loop() {
    cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
    c.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();
  document.querySelectorAll('[data-cursor="hover"], a, button').forEach(el => {
    el.addEventListener('mouseenter', () => c.classList.add('hover'));
    el.addEventListener('mouseleave', () => c.classList.remove('hover'));
  });
})();

// ── Navbar scroll ────────────────────────────────────────
(function nav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Mobile menu ──────────────────────────────────────────
(function burger() {
  const b = document.getElementById('burger');
  const m = document.getElementById('mobileMenu');
  b?.addEventListener('click', () => { b.classList.toggle('open'); m.classList.toggle('open'); });
  m?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    b.classList.remove('open'); m.classList.remove('open');
  }));
})();

// ── Scroll reveal ────────────────────────────────────────
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// ── Parallax ─────────────────────────────────────────────
(function parallax() {
  const heroBg = document.getElementById('heroBg');
  const pEls = document.querySelectorAll('[data-parallax]');
  function loop() {
    const y = window.scrollY;
    if (heroBg) heroBg.style.transform = `translateY(${y * 0.35}px) scale(${1 + Math.min(y / 3000, 0.15)})`;
    pEls.forEach(el => {
      const r = el.getBoundingClientRect();
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      const offset = (window.innerHeight - r.top) * speed * 0.3;
      el.style.transform = `translateY(${-offset}px)`;
    });
    requestAnimationFrame(loop);
  }
  loop();
})();

// ── Year ─────────────────────────────────────────────────
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();

// ── Gallery (מנוהל ע"י Firebase — ראה סקריפט module ב-index.html) ──
// כל לוגיקת הגלריה עברה לסקריפט Firebase בתחתית index.html

// ── Lightbox (standalone — עובד עם galleryGrid שנבנה ע"י Firebase) ──
(function lightbox() {
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbNext  = document.getElementById('lbNext');
  const lbPrev  = document.getElementById('lbPrev');

  // מערך תמונות נוכחי — יתעדכן כשגלריה מתרנדרת
  let items = [];
  let idx   = 0;

  function open(i) {
    idx = i;
    lbImg.src = items[i]?.src || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  function nav(dir) {
    idx = (idx + dir + items.length) % items.length;
    lbImg.src = items[idx]?.src || '';
  }

  // חשוף לעולם כדי שגלריה Firebase תוכל להשתמש
  window.openLightbox = function(src, allItems, clickedIdx) {
    items = allItems;
    open(clickedIdx);
  };

  lbClose?.addEventListener('click', close);
  lbNext?.addEventListener('click', () => nav(1));
  lbPrev?.addEventListener('click', () => nav(-1));
  lb?.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => {
    if (!lb?.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') nav(1);
    if (e.key === 'ArrowRight') nav(-1);
  });
})();
