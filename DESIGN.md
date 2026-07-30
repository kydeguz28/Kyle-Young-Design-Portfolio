---
name: Kyle Young Engineering Portfolio
description: A polished mechanical-engineering portfolio with a black-and-white typographic studio hero, dark cinematic case studies, modular research panels, and warm editorial recruiter sections.
colors:
  black: "#06080d"
  navy: "#0b1522"
  ink: "#121417"
  off-white: "#f4efe7"
  warm-paper: "#fffaf1"
  paper-deep: "#e7ded1"
  muted-ucla-blue: "#4f7f9f"
  light-blue: "#8bb3cc"
  amber: "#d28a35"
  thermal-pink: "#ff4fb8"
  thermal-purple: "#6d4dff"
  evidence-panel: "#101723"
  evidence-panel-deep: "#0d1118"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontWeight: 900
    lineHeight: 0.78
    letterSpacing: "0"
  editorial:
    fontFamily: "Libre Baskerville, Georgia, serif"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.58
  metadata:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontWeight: 900
    letterSpacing: "0.08em"
rounded:
  default: "0"
spacing:
  gutter: "clamp(18px, 4vw, 56px)"
  section: "clamp(72px, 10vw, 144px)"
components:
  studio-hero:
    backgroundColor: "{colors.off-white}"
    heading: "Oversized black-and-white Kyle Young wordmark with portrait overlap"
  bento-work-grid:
    backgroundColor: "{colors.black}"
    behavior: "Varied card spans, image-led priority, neon only for research/simulation artifact gaps"
  cinematic-case-study:
    backgroundColor: "{colors.black}"
    behavior: "Large project title, sparse metadata, decision/result callouts, wide technical imagery, sticky desktop TOC"
---

# Design System: Kyle Young Engineering Portfolio

## Creative North Star

**Studio Engineering Editorial.**

The portfolio should feel like mechanical engineering work presented by a design studio: oversized black-and-white identity, cinematic dark case-study surfaces, restrained UCLA-blue metadata, amber proof marks, warm editorial sections, and technical artifacts treated as the primary visual evidence.

It must not read like a generic software portfolio or SaaS landing page. Physical systems, data, drawings, CAD, test evidence, and individual ownership are the center of the interface.

## Visual Rules

- Use monumental type selectively: identity, major section transitions, and project titles.
- Keep body copy readable and warm, especially in About, Experience, and Contact.
- Use JetBrains Mono only for project numbers, metadata, dates, skills, tools, captions, and quantitative proof.
- Preserve hard rectangular modules and precise borders. Rounded cards are not a defining motif.
- Use neon pink/purple only inside thermal, simulation, and research visualization modules.
- If a project lacks public artifacts, label the gap clearly instead of fabricating polish.

## Layout System

The homepage is a curated recruiter scan:

- Typographic hero with Kyle Young as the dominant visual object.
- Selected Work bento grid with varied composition and rank.
- Warm editorial About.
- Structured Experience list optimized for quick recruiter scanning.
- High-contrast Contact close.

Case studies use a dark cinematic publication model:

- Sparse top navigation.
- Large project title and one-sentence problem statement.
- Metadata grid for category, role, tools, dates, team, and duration where available.
- Wide hero image or artifact.
- Structured sections for context, constraints, process, decisions, validation, manufacturing, results, and reflection where the project supports them.
- Decision/result callouts for the strongest recruiter evidence.
- Desktop sticky table of contents generated from section metadata.

## Content Rules

- Do not invent metrics, tools, dates, outcomes, employers, awards, or responsibilities.
- Make Kyle's individual contribution explicit wherever the source content supports it.
- Prefer evidence-driven copy: designed, analyzed, fabricated, tested, automated, coordinated, calibrated.
- Use callout blocks for results, constraints, and engineering decisions that a recruiter should see in five seconds.
- Avoid vague claims such as "innovative problem solver" unless immediately supported by project evidence.
- Keep artifact gaps visible for research and microfluidics until public images, datasets, or notes are added.

## Interaction Rules

- Use restrained motion: reveal-on-scroll, animated counters, light hero movement, image scale on hover.
- Respect `prefers-reduced-motion`.
- Never hide important information behind hover.
- Keep keyboard focus visible and mobile navigation touch-friendly.
