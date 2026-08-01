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
  const targets = document.querySelectorAll('.reveal, .case-row, .research-list article, .leadership-grid article');
  if (!targets.length) return;

  if (reduceMotionQuery.matches || !('IntersectionObserver' in window)) {
    targets.forEach(target => target.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(target => observer.observe(target));
})();

(function initHeroMotion() {
  const hero = document.querySelector('[data-hero]');
  if (!hero || reduceMotionQuery.matches) return;

  const { gsap, ScrollTrigger } = window;
  if (!gsap) return;

  const nav = hero.querySelector('.hero-nav');
  const role = hero.querySelector('.hero-role-statement');
  const socials = hero.querySelector('.hero-socials');
  const portrait = hero.querySelector('.hero-portrait');
  const nameBack = hero.querySelector('.name-layer-back');
  const nameFront = hero.querySelector('.name-layer-front');
  const bridgeBlue = hero.querySelector('.hero-bridge-blue');
  const bridgeBlack = hero.querySelector('.hero-bridge-black');
  const labels = hero.querySelectorAll('.hero-annotations span, .hero-figure');

  const ctx = gsap.context(() => {
    gsap.from([nav, role, socials], {
      y: 12,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power3.out'
    });

    gsap.from(labels, {
      y: 8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      delay: 0.25,
      ease: 'power3.out'
    });

    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      const scrub = {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6
      };

      gsap.to(portrait, { y: -18, ease: 'none', scrollTrigger: scrub });
      gsap.to(nameBack, { x: -18, y: 8, ease: 'none', scrollTrigger: scrub });
      gsap.to(nameFront, { x: 6, ease: 'none', scrollTrigger: scrub });
      gsap.to(bridgeBlue, { x: 18, y: -4, ease: 'none', scrollTrigger: scrub });
      gsap.to(bridgeBlack, { x: -8, ease: 'none', scrollTrigger: scrub });
    }
  }, hero);

  window.addEventListener('beforeunload', () => ctx.revert(), { once: true });
})();

(function initShowreel() {
  const section = document.querySelector('[data-retired-showreel]');
  const pin = section?.querySelector('.showreel-pin');
  const track = section?.querySelector('.showreel-track');
  const scenes = Array.from(section?.querySelectorAll('.showreel-scene') || []);
  const progress = section?.querySelector('.showreel-progress span');
  const counter = section?.querySelector('.scene-counter');
  if (!section || !pin || !track || !scenes.length) return;

  const gsapReady = Boolean(window.gsap && window.ScrollTrigger);
  const videos = scenes.flatMap(scene => Array.from(scene.querySelectorAll('video')));

  function setActiveScene(index) {
    scenes.forEach((scene, sceneIndex) => {
      const active = sceneIndex === index;
      scene.classList.toggle('active', active);
      scene.setAttribute('aria-current', active ? 'true' : 'false');
    });
    if (counter) counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;

    videos.forEach(video => {
      const active = scenes[index]?.contains(video);
      if (active && !reduceMotionQuery.matches) {
        video.play?.().catch(() => {});
      } else {
        video.pause?.();
      }
    });
  }

  function refreshForMedia() {
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  section.querySelectorAll('img, video').forEach(media => {
    if (media.complete || media.readyState >= 1) return;
    media.addEventListener('load', refreshForMedia, { once: true });
    media.addEventListener('loadedmetadata', refreshForMedia, { once: true });
  });

  setActiveScene(0);

  if (!gsapReady || reduceMotionQuery.matches) {
    section.dataset.gsapReady = 'false';
    return;
  }

  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 821px) and (prefers-reduced-motion: no-preference)', () => {
      section.dataset.gsapReady = 'true';
      section.classList.add('motion-ready');

      const introTitle = scenes[0]?.querySelector('.scene-copy h1');
      const introLabel = scenes[0]?.querySelector('.scene-label');
      const introLede = scenes[0]?.querySelector('.scene-lede');
      const introMeta = scenes[0]?.querySelectorAll('.scene-meta div');
      const introPortrait = scenes[0]?.querySelector('.portrait-cutout');
      const introLines = scenes[0]?.querySelectorAll('.bridge-lines path');

      gsap.set(introLines, { strokeDashoffset: 1400 });
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from(introLines, {
          strokeDashoffset: 1400,
          duration: 1.1,
          stagger: 0.08
        })
        .from(introTitle, {
          clipPath: 'inset(0 0 100% 0)',
          yPercent: 8,
          duration: 0.72
        }, 0.18)
        .from([introLabel, introLede], {
          y: 16,
          opacity: 0,
          filter: 'blur(6px)',
          duration: 0.5,
          stagger: 0.08
        }, 0.42)
        .from(introPortrait, {
          clipPath: 'polygon(48% 0, 100% 0, 52% 100%, 0 100%)',
          x: 28,
          opacity: 0,
          duration: 0.7
        }, 0.54)
        .from(introMeta, {
          y: 14,
          opacity: 0,
          duration: 0.42,
          stagger: 0.06
        }, 0.74);

      const getScrollSpan = () => {
        const measured = Math.max(1, track.scrollWidth - window.innerWidth);
        const min = window.innerHeight * 3.5;
        const max = window.innerHeight * 5;
        return Math.min(max, Math.max(min, measured * 0.75));
      };

      const updateDistance = () => {
        const distance = Math.max(1, track.scrollWidth - window.innerWidth);
        section.style.setProperty('--showreel-scroll', `${Math.round(getScrollSpan())}px`);
        return distance;
      };

      let distance = updateDistance();
      const ro = 'ResizeObserver' in window ? new ResizeObserver(() => {
        distance = updateDistance();
        ScrollTrigger.refresh();
      }) : null;
      ro?.observe(track);
      ro?.observe(section);

      const tween = gsap.to(track, {
        x: () => -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollSpan()}`,
          pin: pin,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            const index = Math.min(scenes.length - 1, Math.max(0, Math.round(self.progress * (scenes.length - 1))));
            setActiveScene(index);
            if (progress) progress.style.width = `${(self.progress * 100).toFixed(2)}%`;
            section.style.setProperty('--dash', `${1400 - self.progress * 1400}`);
          }
        }
      });

      scenes.forEach((scene, sceneIndex) => {
        const media = scene.querySelector('.scene-media > img:first-child, .systems-montage, .portrait-cutout');
        const title = scene.querySelector('.scene-copy h1, .scene-copy h2');
        const meta = scene.querySelectorAll('.scene-meta div');
        if (media) {
          gsap.fromTo(media, { scale: 1.05 }, {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: scene,
              containerAnimation: tween,
              start: 'left 80%',
              end: 'right 20%',
              scrub: true
            }
          });
        }
        if (title && sceneIndex > 0) {
          gsap.fromTo(title, { clipPath: 'inset(0 0 100% 0)' }, {
            clipPath: 'inset(0 0 0% 0)',
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scene,
              containerAnimation: tween,
              start: 'left 70%',
              toggleActions: 'play none none reverse'
            }
          });
        }
        if (meta.length) {
          gsap.fromTo(meta, { y: 16, opacity: 0 }, {
            y: 0,
            opacity: 1,
            duration: 0.46,
            stagger: 0.045,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scene,
              containerAnimation: tween,
              start: 'left 58%',
              toggleActions: 'play none none reverse'
            }
          });
        }
      });

      const onPointerMove = event => {
        const x = (event.clientX / window.innerWidth - 0.5) * 10;
        const y = (event.clientY / window.innerHeight - 0.5) * 8;
        gsap.to('.active .scene-media, .active .portrait-cutout, .active .systems-montage', {
          x,
          y,
          duration: 0.55,
          ease: 'power2.out',
          overwrite: true
        });
      };

      section.addEventListener('pointermove', onPointerMove, { passive: true });

      return () => {
        section.classList.remove('motion-ready');
        section.removeEventListener('pointermove', onPointerMove);
        ro?.disconnect();
        intro.kill();
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    mm.add('(max-width: 820px), (prefers-reduced-motion: reduce)', () => {
      section.dataset.gsapReady = 'false';
      gsap.set(track, { clearProps: 'transform' });
      gsap.set(scenes, { clearProps: 'transform' });

      if (!('IntersectionObserver' in window)) return undefined;
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          setActiveScene(scenes.indexOf(entry.target));
        });
      }, { threshold: 0.42 });
      scenes.forEach(scene => observer.observe(scene));
      return () => observer.disconnect();
    });

    return () => mm.revert();
  }, section);

  window.addEventListener('beforeunload', () => ctx.revert(), { once: true });
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
    if (!img.hasAttribute('loading') && !img.closest('.portrait-cutout') && !img.closest('.scene-media')) {
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
