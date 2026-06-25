'use strict';

// Sticky nav state + active section highlight
(function initNav() {
  const nav = document.getElementById('siteNav');
  const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function update() {
    nav.classList.toggle('scrolled', window.scrollY > 16);
    let current = sections[0]?.id || '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section.id;
    });
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// Mobile nav
(function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Reveal animations
(function initReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.reveal');
  if (prefersReduced) {
    targets.forEach(target => target.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  targets.forEach(target => observer.observe(target));
})();

// Replace missing images with clean placeholders so the site never shows broken icons.
(function initImageFallbacks() {
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', () => {
      const fallback = document.createElement('div');
      fallback.className = 'media-placeholder';
      fallback.textContent = img.dataset.fallback || 'Add project image here';
      img.replaceWith(fallback);
    }, { once: true });
  });
})();
