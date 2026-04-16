/* =========================================
   ANIMALIST — LANDING PAGE SCRIPT
   ========================================= */

// ── Scroll reveal with IntersectionObserver ──
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0, rootMargin: '0px' }
);

document.querySelectorAll('[data-reveal]').forEach((el) => {
  revealObserver.observe(el);
});

// ── Scroll-to-bottom button visibility ──
let end = document.querySelector('#end').getBoundingClientRect().top;

window.addEventListener('scroll', () => {
  const tobottom = document.querySelector('#toBottom');
  if (window.scrollY <= end - 1000) {
    tobottom.style.display = 'block';
  } else {
    tobottom.style.display = 'none';
  }
});

// ── Hero parallax ──
window.addEventListener('scroll', () => {
  const rock = document.querySelector('.rock');
  const platform = document.querySelector('.platform');
  const bg = document.querySelector('.bg');
  const text = document.querySelector('.text');

  const height = document.querySelector('header').offsetHeight - 1000;

  if (window.scrollY < height) {
    const value = window.scrollY;

    platform.style.bottom = (value / height) * 1000 + 'px';
    rock.style.right = -value * 1.5 + 'px';
    rock.style.opacity = 1 - value / height;
    text.style.bottom = value * 0.3 + 'px';
  }
});
