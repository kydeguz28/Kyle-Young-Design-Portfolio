---
name: Kyle Young Swiss Engineering Dossier
description: A mechanical-engineering portfolio system built from Swiss editorial typography, technical drawing language, a framed hero, layered identity type, a monochrome portrait cutout, Golden Gate bridge linework, and evidence-led project sections.
colors:
  paper: "#F1EFE8"
  paperSoft: "#FBFAF4"
  ink: "#0B0C0C"
  charcoal: "#161818"
  muted: "#737574"
  rule: "#D8D5CC"
  steelBlue: "#587B9B"
  uclaBlueMuted: "#315F7C"
typography:
  display:
    fontFamily: "Archivo, Arial, Helvetica, sans-serif"
    fontWeight: 900
    lineHeight: 0.78
    letterSpacing: "-0.038em"
  headline:
    fontFamily: "Archivo, Arial, Helvetica, sans-serif"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.035em"
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
  none: "0"
  small: "6px"
  mobileFrame: "16px"
  frame: "clamp(14px, 2vw, 24px)"
spacing:
  gutter: "clamp(18px, 4vw, 60px)"
  section: "clamp(56px, 8vw, 132px)"
  framePadding: "clamp(14px, 2vw, 26px)"
  tight: "8px"
  medium: "18px"
  wide: "32px"
components:
  heroFrame:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.frame}"
    padding: "{spacing.framePadding}"
  primaryButton:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paperSoft}"
    typography: "{typography.label}"
    padding: "12px 18px"
    height: "48px"
  secondaryButton:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "12px 18px"
    height: "48px"
---

# Design System: Kyle Young Swiss Engineering Dossier

## 1. Overview

The portfolio presents Kyle Young as a mechanical engineer, researcher, builder, and suspension lead through a precise editorial-technical visual system. The homepage should feel like a museum poster crossed with an engineering presentation board: large black grotesk type, high-contrast portraiture, sparse technical annotations, Golden Gate bridge linework, and real project evidence.

The hero is the identity anchor. A near-full-viewport rounded frame contains minimal navigation, oversized layered "KYLE YOUNG" typography, a black-and-white portrait cutout, SVG bridge construction lines, coordinate marks, social links, and a restrained role statement. The name and portrait must interlock through explicit duplicate text layers and clipping, not a single z-indexed title.

Below the hero, the site transitions directly into evidence: additive-manufacturing thermal research, Bruin Formula Racing suspension, SF Unity robotics, cerebrospinal fluid flow research, and microfluidic device development.

## 2. Colors

Use a quiet off-white system with near-black typography and steel-blue technical overlays.

- `paper` `#F1EFE8`: primary page and hero field.
- `paperSoft` `#FBFAF4`: lighter panel interiors, button text, and elevated surfaces.
- `ink` `#0B0C0C`: primary typography, navigation, bridge silhouettes, and rules.
- `charcoal` `#161818`: secondary dark text and dense technical marks.
- `muted` `#737574`: supporting copy and low-priority metadata.
- `rule` `#D8D5CC`: construction lines, borders, contour strokes, and quiet dividers.
- `steelBlue` `#587B9B`: bridge shadow layer, displacement fields, and restrained engineering data accents.
- `uclaBlueMuted` `#315F7C`: optional deeper blue accent for UCLA or systems references.

Do not introduce bright gradients, neon colors, glassmorphism, blueprint textures, glowing effects, or broad copper/orange accents. Blue is a technical signal, not a full-page theme.

## 3. Typography

Display type uses `Archivo` with the visual weight of a condensed grotesk. It should feel structural, vertical, and architectural. The hero name is intentionally monumental and may crop against the frame.

- Hero display: `Archivo`, `900`, `clamp(6.6rem, 18.6vw, 19.8rem)`, line-height `0.78`, letter-spacing `-0.038em`.
- Section headline: `Archivo`, `700`, `clamp(2.5rem, 6vw, 6.8rem)`, line-height `0.92`, letter-spacing `-0.035em`.
- Body: `Archivo`, `500`, `1rem` to `1.08rem`, line-height around `1.5`.
- Technical label: `IBM Plex Mono`, `700`, `0.62rem` to `0.78rem`, uppercase, letter-spacing `0.04em`.

Keep text readable when layered over the portrait. Foreground name fragments should only cover selected portions of letters so the portrait remains recognizable and the identity remains legible.

## 4. Layout

The homepage opens with `.hero-dossier`, a framed composition that nearly fills the viewport. The frame is separated from the page by a thin dark border and a subtle shadow. Navigation sits inside the frame, not in a heavy external bar.

Layer order for the hero:

1. Off-white page background.
2. Hero frame field.
3. Pale technical grid, contour lines, and steel-blue bridge shadow.
4. Oversized background name layer.
5. Primary black bridge drawing.
6. Monochrome portrait cutout.
7. Clipped foreground name fragments.
8. Navigation, role text, social links, scale marks, and labels.

Desktop should preserve the dramatic horizontal bridge composition and the portrait near the right edge. Tablet reduces annotation density. Mobile stacks "KYLE" and "YOUNG", keeps the portrait central, reduces bridge span to a compact tower/cable motif, and removes nonessential labels to prevent horizontal overflow.

Sections below the hero use full-width editorial bands and alternating case rows. Avoid conventional portfolio card grids in the hero; use cards only for repeated project items or constrained tool panels outside the hero.

## 5. Elevation & Depth

Depth is restrained and mostly graphic:

- Hero frame shadow: `0 18px 44px rgba(11, 12, 12, 0.08)`.
- Portrait shadow: subtle drop shadow only, enough to separate the cutout from type.
- Bridge depth: achieved with offset steel-blue and black SVG layers.
- Case-study depth: created through spacing, rule lines, and media scale, not heavy shadows.

Avoid glossy surfaces, floating panels, glass effects, dramatic blur, or heavy card shadows.

## 6. Shapes

Use precise, low-radius geometry.

- Hero frame radius: `clamp(14px, 2vw, 24px)`.
- Mobile hero frame radius: `16px`.
- Small repeated items: `6px` maximum unless an existing component requires otherwise.
- Buttons and text controls: hard-edged or minimally rounded.
- Technical overlays: thin rules, crosshairs, ticks, dashed leaders, axes, and contour paths.

No decorative blobs, orbs, bokeh, fake HUD frames, or rounded pill navigation.

## 7. Components

### HeroFrame

`.hero-frame` owns the near-full-viewport poster field. It contains internal navigation, bridge SVG layers, layered name typography, portrait cutout, social links, role statement, annotations, and scale marks. It must reserve stable space with `min-height`, responsive padding, and clipping so animation does not cause layout shift.

### HeroNavigation

`.hero-nav` is a sparse monospaced row: `KYLE YOUNG`, `WORK`, `RESEARCH`, `SYSTEMS`, `ABOUT`, and `MECHANICAL ENGINEER`. Links use thin underline/rule hover states and visible keyboard focus. No desktop hamburger, pill shell, heavy divider, or large logo treatment.

### LayeredName

`.layered-name` renders duplicate name layers. `.name-layer-back` sits behind the portrait. `.name-layer-front` contains clipped fragments such as `.front-kyle` and `.front-young` that pass in front of selected portrait regions. This is the core illusion and should not be replaced by a single text element.

### PortraitCutout

`.hero-portrait` uses `images/headshot-cutout.png`, a transparent cutout derived from Kyle's authentic portrait. It is displayed in high-contrast black and white with preserved clothing and object texture. Do not blur, posterize, or make it look like a generic corporate headshot.

### BridgeLinework

The Golden Gate bridge is an SVG motif, not a tourist image. Use towers, deck lines, suspension cables, and hangers as compositional structure. Any numeric engineering values in decorative annotations must be clearly illustrative unless backed by real project analysis.

### SocialLinks

`.hero-socials` is a quiet vertical link group in the lower-left. Links must have accessible labels, keyboard focus states, and monochrome visual treatment.

### WorkIndex

The selected work section proves the hero claim. Rows should foreground project evidence and outcomes. The current order is additive manufacturing, Bruin Formula Racing suspension, SF Unity robotics, cerebrospinal fluid flow research, and microfluidics.

## 8. Do's and Don'ts

Do:

- Preserve the Swiss-editorial engineering identity.
- Keep the hero composition integrated, cropped, and confident.
- Use SVG for bridge and technical linework so it stays sharp.
- Keep annotations sparse and explicitly illustrative when not sourced from real data.
- Respect `prefers-reduced-motion`.
- Use GSAP only for restrained load reveals, bridge draw-in, subtle parallax, and scroll-dependent offsets.
- Keep focus states visible and contrast strong.
- Let real projects and real artifacts carry the engineering credibility.

Don't:

- Restore the old horizontal scrolling showreel as the homepage hero.
- Use generic cards, pill nav, bright gradients, glassmorphism, blueprints, glowing UI, or fake futuristic overlays.
- Animate bridge deformation, individual letters, or cartoon-like structural motion.
- Suggest Kyle designed the Golden Gate Bridge.
- Present invented technical values as factual analysis.
- Allow mobile horizontal overflow.
- Replace the portrait/name interlock with a single z-indexed title.
