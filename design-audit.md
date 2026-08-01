# Design Audit

## Critique Prompt

“Audit this mechanical-engineering portfolio against the intended direction: quiet editorial engineering dossier, monumental bridge imagery, typographic overlap, restrained technical marginalia, and cinematic GSAP motion.

Evaluate:

1. Immediate identity and clarity
2. Visual hierarchy
3. Composition and negative space
4. Typography scale and rhythm
5. Image-to-text relationship
6. Authentic engineering credibility
7. Spacing consistency
8. Mobile composition
9. Motion quality
10. Accessibility and performance

Be highly critical. Identify anything that feels generic, decorative, crowded, timid, AI-generated, SaaS-like, or disconnected from Kyle’s actual work.

For every criticism, provide:
- the exact component or section
- why it weakens the design
- a concrete implementation change
- priority: critical, high, medium, or low

Do not suggest adding more visual effects by default. Prefer subtraction, stronger hierarchy, and more deliberate scale.”

## Pass 1 - Initial Layout

- Critical: `showreel` used existing generated suspension and thermal imagery without enough immediate provenance. This could make atmospheric material look like project documentation. Change: label generated imagery in alt text and media manifest; pair it with real FEA/CSF artifacts.
- High: `Scene 01` needed a stronger bridge system so it did not read as a generic dark portrait hero. Change: add CSS bridge fog plate, SVG cable curves, datum line, coordinates, and REV metadata.
- High: selected work risked becoming another equal-card grid. Change: use alternating editorial case rows with uneven media scale and project-specific evidence.
- Medium: research section could overstate thermal work because public artifacts are missing. Change: explicitly state the artifact gap and keep generated thermal imagery in the showreel only as atmosphere.

## Pass 1 Changes Made

- Added bridge linework and fog geometry as authored CSS/SVG.
- Kept the real headshot as the only portrait source.
- Added real project artifact insets to generated atmospheric scenes.
- Rebuilt selected work as alternating case-study rows.
- Added manifest entries distinguishing real and generated media.

## Pass 2 - Responsive, Motion, Accessibility

- Critical: desktop horizontal showreel must not trap reduced-motion or mobile users. Change: GSAP matchMedia disables pinning on mobile and prefers-reduced-motion; scenes stack vertically.
- High: pinned distance must be measured dynamically. Change: use `track.scrollWidth - window.innerWidth`, `ResizeObserver`, `invalidateOnRefresh`, and media load refresh.
- High: active media logic must avoid offscreen autoplay. Change: active scene handler pauses inactive videos and only plays active videos when video assets exist.
- High: mobile portrait overlap could cover title/supporting line. Change: portrait becomes smaller, higher, and semi-secondary on mobile; scene media becomes a separate block before copy.
- Medium: local GSAP dependency could fail if `node_modules` is not available on static hosting. Change: script detects missing GSAP and falls back to vertical/natural behavior without breaking content.

## Pass 2 Changes Made

- Implemented GSAP context and `gsap.matchMedia()` cleanup.
- Added desktop progress line, scene counter, cable draw variable, title reveal, and subtle media parallax.
- Added native vertical mobile and reduced-motion fallbacks.
- Preserved keyboard focus, skip link, semantic sections, real links, and alt text.

## Impeccable Tooling Note

The Impeccable skill was present and read from `.agents/skills/impeccable/SKILL.md`. A connector/CLI critique pass could not be run as an external design critic in this harness, so the two critique passes above were performed in-thread using the exact requested prompt and recorded with resulting changes.
