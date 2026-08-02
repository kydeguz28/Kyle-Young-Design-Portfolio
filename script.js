'use strict';

document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

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
    header.classList.toggle('scrolled', window.scrollY > 8);
    let current = sections[0]?.id || '';

    sections.forEach(section => {
      const top = section.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY >= top - 160) current = section.id;
    });

    links.forEach(link => {
      const active = link.getAttribute('href') === `#${current}`;
      link.classList.toggle('active', active);
      if (active) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
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

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setOpen(false)));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) setOpen(false);
  }, { passive: true });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') setOpen(false);
  });
})();

(function initReveals() {
  const targets = document.querySelectorAll('.reveal, .identity-statement, .section-heading, .home-section, .entry-panel, .info-panel, .timeline-panel, .rounded-content-card, .experience-row, .skill-row, .project-group, .timeline-list article, .community-list article, .skills-columns article, .case-row, .research-list article, .leadership-feature, .about-footer, .anduril-section, .anduril-section-header, .arsenal-card, .promo-strip article, .experience-rail article, .skill-matrix article, .about-cutout');
  if (!targets.length) return;

  if (reduceMotionQuery.matches || !('IntersectionObserver' in window)) {
    targets.forEach(target => target.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      if (window.gsap) {
        const media = entry.target.querySelector('.case-media, .leadership-media-pair, .about-portrait, .about-cutout, .arsenal-card img');
        const copy = entry.target.querySelector('.case-copy, .contact-block, .research-list, h2, h3, p');

        window.gsap.fromTo(entry.target, {
          y: 26,
          opacity: 0,
          filter: 'blur(10px)'
        }, {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out'
        });

        if (media) {
          window.gsap.fromTo(media, {
            scale: 1.05,
            filter: 'brightness(1.08) saturate(0.9)'
          }, {
            scale: 1,
            filter: 'brightness(1) saturate(1)',
            duration: 1.15,
            ease: 'power3.out'
          });
        }

        if (copy) {
          window.gsap.fromTo(copy, {
            y: 18,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            duration: 0.78,
            delay: 0.08,
            ease: 'power3.out'
          });
        }
      }

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(target => observer.observe(target));
})();

(function initHeroMotion() {
  const hero = document.querySelector('[data-hero]');
  if (!hero || reduceMotionQuery.matches || !window.gsap) return;

  const ctx = window.gsap.context(() => {
    if (hero.classList.contains('anduril-hero')) {
      window.gsap.from('.anduril-brand, .anduril-links a, .anduril-utilities > *, .anduril-hero-copy > *', {
        y: 28,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out'
      });

      window.gsap.fromTo('.anduril-hero-media', {
        scale: 1.08
      }, {
        scale: 1.02,
        duration: 1.8,
        ease: 'power3.out'
      });
      return;
    }

    window.gsap.from('.poster-brand, .poster-links a, .poster-name, .poster-portrait, .poster-role, .poster-socials, .poster-thesis', {
      y: 34,
      opacity: 0,
      filter: 'blur(12px)',
      duration: 1.08,
      stagger: 0.1,
      ease: 'power3.out'
    });

    window.gsap.fromTo('.poster-frame', {
      boxShadow: 'inset 0 0 0 1px rgba(13, 17, 19, 0.08)'
    }, {
      boxShadow: 'inset 0 0 0 1px rgba(13, 17, 19, 0.24)',
      duration: 1.1,
      ease: 'power3.out'
    });
  }, hero);

  window.addEventListener('beforeunload', () => ctx.revert(), { once: true });
})();

(function initScrollDrama() {
  if (reduceMotionQuery.matches || !window.gsap || !window.ScrollTrigger) return;

  window.gsap.registerPlugin(window.ScrollTrigger);

  window.gsap.utils.toArray('.case-media img, .arsenal-card img, .anduril-hero-media').forEach(img => {
    window.gsap.fromTo(img, {
      yPercent: -4
    }, {
      yPercent: 4,
      ease: 'none',
      scrollTrigger: {
        trigger: img.closest('.case-row') || img.closest('.arsenal-card') || img.closest('.anduril-hero') || img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  window.gsap.utils.toArray('.skills-words span').forEach((word, index) => {
    window.gsap.fromTo(word, {
      y: 44,
      opacity: 0,
      filter: 'blur(10px)'
    }, {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      delay: index * 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.skills-typographic',
        start: 'top 70%',
        once: true
      }
    });
  });

  window.gsap.utils.toArray('[data-count-to]').forEach(stat => {
    const target = Number(stat.dataset.countTo || stat.textContent || 0);
    if (!Number.isFinite(target)) return;
    const state = { value: 0 };

    window.gsap.to(state, {
      value: target,
      duration: 1.4,
      ease: 'power2.out',
      snap: { value: 1 },
      onUpdate: () => {
        stat.textContent = String(Math.round(state.value));
      },
      scrollTrigger: {
        trigger: stat,
        start: 'top 82%',
        once: true
      }
    });
  });
})();

(function initProjectSearch() {
  const toggle = document.querySelector('[data-search-toggle]');
  const panel = document.getElementById('projectSearch');
  const input = document.getElementById('projectFilter');
  const cards = Array.from(document.querySelectorAll('[data-project-card]'));
  const empty = document.querySelector('[data-empty-projects]');
  if (!toggle || !panel || !input || !cards.length) return;

  function setOpen(open) {
    panel.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (open) input.focus();
  }

  function filterProjects() {
    const query = input.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
      const text = `${card.textContent || ''} ${card.dataset.keywords || ''}`.toLowerCase();
      const visible = !query || text.includes(query);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    if (empty) empty.hidden = visibleCount !== 0;
  }

  toggle.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
  input.addEventListener('input', filterProjects);
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
    if (!img.hasAttribute('loading')) img.loading = 'lazy';

    img.addEventListener('error', () => {
      const fallback = document.createElement('div');
      fallback.className = 'media-placeholder';
      fallback.textContent = img.dataset.fallback || `Missing image: ${img.getAttribute('src') || 'unknown'}`;
      img.replaceWith(fallback);
    }, { once: true });
  });
})();
