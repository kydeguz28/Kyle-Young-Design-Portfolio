'use strict';

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

(function initHeader() {
  const header = document.getElementById('siteHeader');
  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('navToggle');
  if (!header) return;

  const links = Array.from(nav?.querySelectorAll('a[href^="#"]') || []);
  const sections = links
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 12);

    let current = sections[0]?.id || '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });

    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }

  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('open'));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') setOpen(false);
  });
})();

(function initReveals() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach(target => target.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(target => observer.observe(target));
})();

(function initCounters() {
  const counters = Array.from(document.querySelectorAll('[data-count]'));
  if (!counters.length) return;

  function setCounterValue(counter, value) {
    const target = Number(counter.dataset.count || 0);
    const suffix = target >= 100 ? '+' : '';
    counter.textContent = `${Math.round(value).toLocaleString()}${suffix}`;
  }

  function animate(counter) {
    const target = Number(counter.dataset.count || 0);
    if (!target || prefersReducedMotion) {
      setCounterValue(counter, target);
      return;
    }

    const duration = 900;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounterValue(counter, target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animate(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => observer.observe(counter));
})();

(function initHeroParallax() {
  const targets = Array.from(document.querySelectorAll('[data-speed]'));
  if (!targets.length || prefersReducedMotion) return;

  let ticking = false;

  function update() {
    const offset = Math.min(window.scrollY, window.innerHeight);
    targets.forEach(target => {
      const speed = Number(target.dataset.speed || 0);
      target.style.setProperty('--parallax-y', `${offset * speed}px`);
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
})();

(function initCaseToc() {
  const shell = document.querySelector('.project-shell');
  const sections = Array.from(document.querySelectorAll('.case-section'));
  if (!shell || sections.length < 3) return;

  const toc = document.createElement('nav');
  toc.className = 'case-toc';
  toc.setAttribute('aria-label', 'Case study sections');

  const links = sections.map((section, index) => {
    const heading = section.querySelector('h2');
    const label = section.querySelector('.kicker')?.textContent?.trim() || heading?.textContent?.trim() || `Section ${index + 1}`;
    const id = heading?.id || `case-section-${index + 1}`;
    if (heading) heading.id = id;
    section.id = section.id || `${id}-wrap`;

    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = `${String(index + 1).padStart(2, '0')} ${label}`;
    toc.append(link);
    return { link, section };
  });

  shell.prepend(toc);

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(item => item.link.classList.toggle('active', item.section === entry.target));
    });
  }, { rootMargin: '-30% 0px -55% 0px' });

  links.forEach(item => observer.observe(item.section));
})();

(function initImageFallbacks() {
  document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading') && !img.closest('.hero-subject') && !img.closest('.case-hero-figure')) {
      img.loading = 'lazy';
    }

    img.addEventListener('error', () => {
      const fallback = document.createElement('div');
      fallback.className = 'media-placeholder';
      fallback.textContent = img.dataset.fallback || `Missing image: ${img.getAttribute('src') || 'unknown'}`;
      img.replaceWith(fallback);
    }, { once: true });
  });
})();
