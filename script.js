/* ============================================================
   KYLE YOUNG — ENGINEERING PORTFOLIO
   script.js — All vanilla JS, zero dependencies
   ============================================================ */

'use strict';

/* ── RETICLE CANVAS ──────────────────────────────────────── */
(function initReticle() {
  const canvas = document.getElementById('reticleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, mouse = { x: -999, y: -999 }, raf;
  const COPPER = '#B5671E';
  const COPPER_DIM = 'rgba(181,103,30,0.18)';

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function draw(ts) {
    ctx.clearRect(0, 0, W, H);

    const mx = mouse.x, my = mouse.y;
    const visible = mx > 0 && mx < W && my > 0 && my < H;

    if (visible) {
      const r1 = 28, r2 = 48, r3 = 80, tickLen = 14, gap = r1 + 6;

      ctx.save();
      ctx.strokeStyle = COPPER;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.7;

      // Inner ring
      ctx.beginPath();
      ctx.arc(mx, my, r1, 0, Math.PI * 2);
      ctx.stroke();

      // Outer dashed ring
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(mx, my, r3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Crosshair ticks — top, right, bottom, left
      ctx.globalAlpha = 0.9;
      const ticks = [
        [mx, my - gap, mx, my - gap - tickLen],
        [mx + gap, my, mx + gap + tickLen, my],
        [mx, my + gap, mx, my + gap + tickLen],
        [mx - gap, my, mx - gap - tickLen, my],
      ];
      ticks.forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Center dot
      ctx.globalAlpha = 1;
      ctx.fillStyle = COPPER;
      ctx.beginPath();
      ctx.arc(mx, my, 2, 0, Math.PI * 2);
      ctx.fill();

      // Coordinate readout
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = COPPER;
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(`${Math.round(mx)}, ${Math.round(my)}`, mx + r2 + 4, my - 6);

      ctx.restore();
    }

    raf = requestAnimationFrame(draw);
  }

  window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });
  window.addEventListener('resize', resize, { passive: true });
  resize();
  raf = requestAnimationFrame(draw);
})();


/* ── NAVIGATION ──────────────────────────────────────────── */
(function initNav() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const allLinks = links ? links.querySelectorAll('a') : [];

  // Scroll state
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });

    // Close on link click
    allLinks.forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        links.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    allLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }
})();


/* ── INTERSECTION OBSERVER — REVEAL ──────────────────────── */
(function initReveal() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const targets = document.querySelectorAll('[data-reveal], .timeline-item, .project-card, .skill-group, .certs-row');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('[data-reveal], .project-card, .skill-group'));
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 80, 400);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => observer.observe(el));
})();


/* ── SKILL BARS ──────────────────────────────────────────── */
(function initSkillBars() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (prefersReduced) {
          entry.target.style.width = entry.target.style.getPropertyValue('--pct') || '80%';
        } else {
          entry.target.classList.add('animated');
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  bars.forEach(bar => observer.observe(bar));
})();


/* ── CONTACT FORM ────────────────────────────────────────── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  if (!form) return;

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setNote(msg, isError) {
    if (!note) return;
    note.textContent = msg;
    note.style.color = isError ? '#e05757' : 'var(--copper)';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name)                  { setNote('Please enter your name.', true);    return; }
    if (!validateEmail(email))  { setNote('Please enter a valid email.', true); return; }
    if (!message)               { setNote('Please include a message.', true);   return; }

    // Build mailto — works completely client-side, no server needed
    const body = encodeURIComponent(
      `Hi Kyle,\n\n${message}\n\n— ${name}\n${email}`
    );
    const sub = encodeURIComponent(subject || `Portfolio inquiry from ${name}`);
    const mailto = `mailto:kyleyoung@g.ucla.edu?subject=${sub}&body=${body}`;

    window.location.href = mailto;
    setNote('Opening your email client…', false);

    setTimeout(() => {
      form.reset();
      setNote('', false);
    }, 3000);
  });
})();


/* ── SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('nav')?.offsetHeight || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ── HERO TYPING EYEBROW (subtle cycle) ──────────────────── */
(function initEyebrow() {
  const el = document.querySelector('.hero-eyebrow .mono');
  if (!el) return;

  const labels = [
    '<engineer>',
    '<designer>',
    '<builder>',
    '<analyst>',
    '<engineer>',
  ];
  let idx = 0;
  let charIdx = 0;
  let deleting = false;
  let pause = false;

  function type() {
    if (pause) return;
    const target = labels[idx];

    if (!deleting && charIdx <= target.length) {
      el.textContent = target.slice(0, charIdx++);
      setTimeout(type, 65);
    } else if (!deleting && charIdx > target.length) {
      pause = true;
      setTimeout(() => {
        pause = false;
        deleting = true;
        type();
      }, 2800);
    } else if (deleting && charIdx > 0) {
      el.textContent = target.slice(0, charIdx--);
      setTimeout(type, 35);
    } else {
      deleting = false;
      idx = (idx + 1) % labels.length;
      pause = true;
      setTimeout(() => { pause = false; type(); }, 300);
    }
  }

  // Only run if user hasn't asked for reduced motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setTimeout(type, 1200);
  }
})();


/* ── RESUME DOWNLOAD FALLBACK ────────────────────────────── */
(function initResumeBtn() {
  // If no resume.pdf exists, gracefully handle the click
  const btns = document.querySelectorAll('[href="resume.pdf"]');
  btns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      try {
        const res = await fetch('resume.pdf', { method: 'HEAD' });
        if (!res.ok) throw new Error('not found');
        // File exists — let default download behavior proceed
      } catch {
        e.preventDefault();
        // Fallback: open contact instead
        alert('Resume PDF not yet uploaded. Please email kyleyoung@g.ucla.edu to request a copy, or use the contact form below.');
      }
    });
  });
})();


/* ── PROJECT CARD HOVER TILT (subtle) ───────────────────── */
(function initCardTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return; // skip on touch

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(600px) rotateX(${-dy * 2.5}deg) rotateY(${dx * 2.5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
