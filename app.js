/* =========================================================
   Villa Cialo Boutique — app.js v3
   UI בלבד — גלריה, הגדרות והזמנות מנוהלים ע"י Firebase
   ב-index.html. הקובץ הזה לא נוגע ב-localStorage בכלל.
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
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
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

// ── Gallery filter buttons ────────────────────────────────
// הגלריה עצמה מתרנדרת ע"י Firebase ב-index.html.
// כאן רק מטפלים בכפתורי הסינון — הם מסננים את ה-.gi שכבר בDOM.
(function galleryCats() {
  const cats = document.getElementById('galleryCats');
  if (!cats) return;

  cats.addEventListener('click', e => {
    const btn = e.target.closest('.gcat-btn');
    if (!btn) return;
    cats.querySelectorAll('.gcat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    document.querySelectorAll('#galleryGrid .gi').forEach(item => {
      const match = cat === 'הכל' || item.dataset.cat === cat;
      item.style.display = match ? '' : 'none';
    });
  });
})();

// ── Lightbox ─────────────────────────────────────────────
// עובד על כל תמונה שFirebase מוסיף לגריד — openLightbox נחשף גלובלית.
let lbItems = [];
let lbIdx   = 0;

function openLightbox(idx) {
  lbIdx = idx;
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  if (!lb || !img || !lbItems[idx]) return;
  img.src = lbItems[idx];
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openLightbox = openLightbox;

// Firebase יקרא לזה לאחר שבנה את הגריד
window.setLightboxItems = function(items) {
  lbItems = items;
};

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

function lbNav(dir) {
  if (!lbItems.length) return;
  lbIdx = (lbIdx + dir + lbItems.length) % lbItems.length;
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

// ── Year ─────────────────────────────────────────────────
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();
