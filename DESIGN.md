---
name: Kyle Young Editorial Engineering Poster
description: A personal engineering portfolio system led by an off-white framed identity poster, side-profile portraiture, oversized cropped name typography, luminous minimal product-style sections, sharp project evidence rows, and restrained UCLA blue.
colors:
  paper: "#0D1113"
  panel: "#151B1E"
  panel2: "#20282C"
  ink: "#F4F1E9"
  muted: "rgba(244, 241, 233, 0.68)"
  quiet: "rgba(244, 241, 233, 0.48)"
  rule: "rgba(244, 241, 233, 0.16)"
  blue: "#73A9D6"
  bridgeCopper: "#B45D43"
typography:
  display:
    fontFamily: "Archivo, Arial, Helvetica, sans-serif"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.032em"
  body:
    fontFamily: "Archivo, Arial, Helvetica, sans-serif"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0"
  label:
    fontFamily: "IBM Plex Mono, Consolas, monospace"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.04em"
rounded:
  small: "8px"
spacing:
  gutter: "clamp(18px, 4.4vw, 64px)"
  section: "clamp(64px, 9vw, 144px)"
  medium: "clamp(18px, 2vw, 30px)"
components:
  primaryButton:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    height: "46px"
  secondaryButton:
    backgroundColor: "rgba(244, 241, 233, 0.04)"
    textColor: "{colors.ink}"
    borderColor: "{colors.rule}"
    typography: "{typography.label}"
    height: "46px"
---

# Design System: Kyle Young Modern Engineering Dossier

## 1. Overview

The portfolio presents Kyle Young as a modern, hands-on mechanical engineer through an editorial identity poster that immediately makes the person memorable before moving into engineering evidence. The first viewport is anchored by a side-profile portrait, oversized cropped name typography, a black frame, and restrained UCLA blue. The rest of the page behaves like a disciplined evidence index with large project media, tight copy, and clear next actions.

The visual world is editorial, precise, minimal, and luminous. The homepage opens light and personal, then moves through Apple-like product storytelling sections: large calm type, quiet surfaces, soft blue radiance, restrained shadows, and image-led proof. It avoids the old hidden reel, generic card grids, loud AI gradients, glass effects, and decorative technical clutter. Every section should either identify Kyle, prove a capability with a real artifact, or move the visitor toward a project, resume, or contact action.

## 2. Colors

Use graphite and warm off-white as the main reading system.

- `paper` `#0D1113`: page background and header base.
- `panel` `#151B1E`: repeated research panels and media fallbacks.
- `panel2` `#20282C`: deeper secondary surfaces.
- `ink` `#F4F1E9`: primary text.
- `muted` `rgba(244, 241, 233, 0.68)`: body copy.
- `quiet` `rgba(244, 241, 233, 0.48)`: low-priority identity text.
- `rule` `rgba(244, 241, 233, 0.16)`: borders and separators.
- `blue` `#73A9D6`: UCLA/technical action color.
- `bridgeCopper` `#B45D43`: only from the bridge image/material, not a general accent flood.

Do not introduce neon glows, rainbow gradients, beige editorial pages, glassmorphism, or one-note blue/purple themes.

## 3. Typography

Use Archivo for all primary typography. It gives the site a contemporary engineering-document feel without relying on overused tech display faces.

- Hero display: `Archivo`, `900`, `clamp(5.4rem, 14vw, 14rem)`, line-height `0.78`, letter-spacing no tighter than `-0.035em`.
- Section headline: `Archivo`, `900`, `clamp(2.4rem, 6vw, 6rem)`, line-height `0.92`.
- Case title: `Archivo`, `900`, `clamp(2.1rem, 4.4vw, 5rem)`, line-height `0.9`.
- Body: `Archivo`, `500`, line-height around `1.5`.
- Labels: `IBM Plex Mono`, uppercase, `0.68rem` to `0.78rem`, for navigation, metadata, and true structured fields only.

## 4. Layout

The homepage opens with a near-full-viewport framed poster. Navigation sits inside the frame, the name stretches across the middle as cropped black typography, the side-profile portrait sits over the name, social links run vertically on the left, and the role lockup sits bottom-right with a blue rule.

Below the hero:

1. A profile statement explains Kyle's engineering loop.
2. Selected work appears as spacious, luminous product-story rows with large media and supporting metadata.
3. Research is a quiet process section with two high-contrast proof panels.
4. Leadership uses real robotics poster/media evidence with the same soft light treatment.
5. Contact closes with a minimal action block for resume, email, LinkedIn, and GitHub.

Cards are used only for repeated panels or constrained metadata. Page sections are full-width bands with clear rules and generous vertical rhythm.

## 5. Imagery

Use real repository images whenever they exist. Generated imagery must be either clearly atmospheric or used as a background asset where it cannot be mistaken for project proof. The homepage portrait cutout lives at `images/kyle-young-side-profile-cutout.png`; the bridge asset may be used elsewhere as supporting structural atmosphere, not as the primary homepage hero.

Project rows should prefer real artifacts: Formula SAE hardware, robot photos, CSF workflow screenshots, fixtures, prototypes, product imagery, and build photos.

## 6. Interaction

Motion is restrained but premium: hero load, soft section reveals, media lift/scale, and luminous settling on scroll using GSAP where available. Content remains visible without JavaScript. Respect reduced motion.

Buttons and links use visible focus states, precise hover movement, and compact label text. No pill navigation, glowing borders, fake HUD overlays, or decorative progress gauges.
