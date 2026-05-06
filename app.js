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
