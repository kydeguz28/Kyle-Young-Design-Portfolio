---
name: Kyle Young Editorial Engineering Dossier
description: A dark engineering portfolio system with an off-white identity poster, extended bottom-anchored side-profile portraiture, oversized name typography, luminous evidence rows, and restrained UCLA blue.
colors:
  paper: "#0d1113"
  panel: "#151b1e"
  panel-2: "#20282c"
  ink: "#f4f1e9"
  muted: "rgba(244, 241, 233, 0.68)"
  quiet: "rgba(244, 241, 233, 0.48)"
  line: "rgba(244, 241, 233, 0.16)"
  line-strong: "rgba(244, 241, 233, 0.32)"
  blue: "#73a9d6"
  poster-blue: "#2c66ad"
  poster-paper: "#f4f1e9"
  poster-ice: "rgba(115, 169, 214, 0.24)"
  white: "#fffaf0"
typography:
  display:
    fontFamily: "Archivo, Arial, Helvetica, sans-serif"
    fontSize: "clamp(2.4rem, 6vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.018em"
  hero:
    fontFamily: "Helvetica Now Display, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(6rem, 12.4vw, 15rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.018em"
  body:
    fontFamily: "Archivo, Arial, Helvetica, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0"
  label:
    fontFamily: "IBM Plex Mono, Consolas, monospace"
    fontSize: "clamp(0.64rem, 0.74vw, 0.78rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.04em"
rounded:
  frame: "28px"
  pill: "999px"
spacing:
  gutter: "clamp(18px, 4.4vw, 64px)"
  xs: "clamp(10px, 1.2vw, 16px)"
  sm: "clamp(18px, 2vw, 30px)"
  md: "clamp(34px, 4.6vw, 78px)"
  lg: "clamp(64px, 9vw, 144px)"
components:
  primary-button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.frame}"
    height: "46px"
  secondary-button:
    backgroundColor: "rgba(244, 241, 233, 0.04)"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.frame}"
    height: "46px"
  contact-button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.frame}"
    height: "52px"
---

# Design System: Kyle Young Editorial Engineering Dossier

## Overview

**Creative North Star: "The Precision Identity Poster"**

The portfolio presents Kyle Young as a hands-on mechanical engineer through a first viewport that behaves like an editorial poster: a dark industrial page shell, an off-white framed identity field, oversized cropped name typography, and an extended side-profile portrait that is bottom-anchored so the body continues through the frame edge. The person is the first signal; the project evidence follows as calm, scannable proof.

The system is precise, minimal, luminous, and work-focused. It uses real artifacts, compact metadata, disciplined rows, and restrained UCLA blue rather than decorative tech effects. The dark page gives the work an engineering-lab context, while the warm poster paper keeps the introduction personal and memorable.

**Key Characteristics:**
- Off-white identity poster inside a dark industrial portfolio shell.
- Oversized name typography layered with a real portrait, never an illustrated replacement.
- Restrained graphite, warm off-white, and UCLA blue with very few accent moments.
- Spacious evidence rows and proof panels instead of generic equal card grids.
- Motion is subtle, visible without JavaScript, and disabled for reduced motion.

## Colors

The palette is graphite and warm off-white, with UCLA blue reserved for links, state, and technical emphasis.

### Primary
- **Graphite Field**: The dark page background and industrial shell; used for the global body, fixed navigation, and dark project surfaces.
- **Warm Ink**: Primary foreground on dark surfaces; used for body copy, headings, and high-contrast actions.
- **UCLA Signal Blue**: The main action and state accent; used sparingly for focus rings, hover rules, active link lines, and technical labels.

### Secondary
- **Poster Blueprint Blue**: The stronger blue used inside the off-white hero poster for social-link tokens and precise identity accents.
- **Ice Draft Blue**: A translucent blue wash used as quiet atmospheric light, not as a dominant background.

### Neutral
- **Panel Graphite**: Repeated dark panel surface for research, media fallbacks, and low-depth containers.
- **Deep Panel Graphite**: Secondary dark surface for nested evidence zones and heavier contrast.
- **Quiet Rule**: Low-contrast separators and borders on dark surfaces.
- **Strong Rule**: Higher-contrast borders when the interface needs structure.
- **Poster Paper**: Warm off-white hero and homepage content surface.
- **Warm White**: Soft off-white utility color for media and high-key accents.

### Named Rules
**The Blue Rarity Rule.** Blue should be a signal, not a wash. Use it for interaction, metadata, and small technical emphasis before using it as a large surface.

**The Real Evidence Rule.** Generated or atmospheric imagery may support the system, but project proof should come from repository assets or explicitly confirmed real artifacts.

## Typography

**Display Font:** Archivo, with Arial and Helvetica fallbacks.

**Hero Font:** Helvetica Now Display / Helvetica Neue stack for the oversized identity poster.

**Label/Mono Font:** IBM Plex Mono for navigation, metadata, and compact structured labels.

**Character:** The typography is direct and engineered. Archivo carries the portfolio's evidence and section hierarchy; the hero stack creates the memorable poster moment; IBM Plex Mono is reserved for actual navigation, labels, and metadata.

### Hierarchy
- **Hero Identity** (700, fluid oversized clamp, tight line-height): The "Kyle Young" poster name only. It should stay anchored to the portrait and should not become a generic section headline style.
- **Display** (900, large clamp, tight line-height): Section headers, case-study titles, and major proof statements.
- **Title** (700-900, medium-large clamp): Project cards, timeline entries, and repeated evidence modules.
- **Body** (500, 16px base, 1.5-1.62 line-height): Project summaries, about copy, and case-study prose. Keep reading columns near the existing 72ch measure.
- **Label** (700-800, small, uppercase, tracked): Navigation, metadata, dates, social-link chips, and structured engineering labels.

### Named Rules
**The Monospace Earns Its Place Rule.** Use IBM Plex Mono only for navigation, metadata, labels, and measurement-like text. Do not use it as a decorative signifier for "technical."

## Layout

The global site is a static, responsive portfolio with a fixed dark navigation bar and a centered content width capped around 1920px for the homepage shell. Content uses `--gutter` for responsive page margins, `--max` for standard section width, and a small set of clamp-based spacing tokens for vertical rhythm.

The homepage opens with a near-full-viewport framed poster. The generated extended portrait asset is pinned below the poster's lower edge and scales with the viewport, so the lower body disappears through the frame rather than floating inside it. Below the hero, the page shifts to evidence: an identity statement, selected work rows, research panels, leadership proof, and contact actions.

Responsive behavior is content-driven: two-column evidence rows collapse to one column under tablet/mobile breakpoints, the hero composition simplifies under 820px and then stacks under 560px, and touch targets remain large enough for mobile navigation and contact actions.

## Elevation & Depth

Depth is restrained and structural. The system prefers tonal layering, borders, and media contrast; shadows appear where they clarify physical layering, such as the hero poster frame, image-led proof panels, and hover-lift media states.

### Shadow Vocabulary
- **Poster Frame Lift** (`0 18px 58px rgba(13, 17, 19, 0.18)`): Used to separate the off-white identity poster from the dark page shell.
- **Soft Proof Lift** (`0 22px 72px rgba(13, 17, 19, 0.28)`): Used for homepage media proof on warm paper surfaces.
- **Panel Lift** (`0 20px 56px rgba(13, 17, 19, 0.08)`): Used sparingly for light evidence panels.
- **Focus Halo** (`0 0 0 4px rgba(115, 169, 214, 0.22)`): Used only as an interaction or focus state.

### Named Rules
**The Shadow Must Explain Layering Rule.** Shadows should describe a real surface relationship or interaction state. Avoid colored glow as decoration.

## Shapes

The form language is mostly rectilinear with one generous frame radius. The portfolio uses a 28px radius for major framed surfaces and media containers, square edges for the portrait cutout and typography layers, and pill radius only where the element is genuinely a compact chip or small label.

Borders are thin and low contrast. Heavy outlines, glowing strokes, and nested card frames should be avoided unless they are carrying real hierarchy.

## Components

### Buttons
- **Shape:** Generous framed buttons using the system radius.
- **Primary:** Warm ink on dark surfaces or blue contact action where the context calls for the main conversion.
- **Hover / Focus:** Short translate lift, color inversion or blue state, and visible focus outline/halo.
- **Secondary:** Transparent or low-opacity surface with warm ink and a quiet border.

### Navigation
- **Style:** Fixed dark industrial nav, uppercase compact labels, centered link group, and right-aligned utility actions.
- **Hover / Active:** A 1px blue underline draws from right to left and link text brightens.
- **Mobile:** Nav compacts behind the existing menu control with minimum 44px target behavior.

### Hero Poster
- **Style:** Off-white frame, oversized name, portrait cutout, role lockup, and social links layered inside one controlled poster field.
- **Anchor:** Use the extended torso portrait and bottom-anchor it below the poster frame. Let the body run through the lower edge as the viewport expands.
- **State:** Entry animation may reveal the poster parts, but the composition must remain readable without JavaScript.

### Evidence Rows
- **Style:** Large media plus concise project copy, usually two columns on desktop and one column on smaller screens.
- **Media:** Real images should fill their containers with `object-fit: cover`; technical placeholders are acceptable only when evidence is pending.
- **Interaction:** Media can lift and scale subtly on hover.

### Chips / Labels
- **Style:** Small uppercase metadata, often IBM Plex Mono, with quiet borders or blue text.
- **Use:** Roles, dates, systems tags, social labels, and project metadata.

### Cards / Containers
- **Corner Style:** Use the 28px radius for major containers; avoid nested cards.
- **Background:** Dark panels on the industrial shell, warm paper panels in the homepage evidence area.
- **Border:** Low-contrast line tokens.
- **Internal Padding:** Use the clamp spacing scale, not fixed dense padding.

## Do's and Don'ts

### Do:
- **Do** keep the portrait, name typography, and hero role lockup visually registered as one poster composition.
- **Do** use real project imagery and repository evidence wherever available.
- **Do** keep blue rare and intentional.
- **Do** use large, calm type for proof moments and compact mono labels for structured details.
- **Do** preserve visible focus states and reduced-motion behavior.

### Don't:
- **Don't** turn the homepage into a grid of same-size generic cards.
- **Don't** use neon glow, rainbow gradients, glassmorphism, or decorative HUD overlays.
- **Don't** replace Kyle's portrait with an illustration or generated face.
- **Don't** use monospace as a general body or heading costume.
- **Don't** let the hero portrait float upward from the bottom edge when resizing; the lower body should pass through the frame.
