# Kyle Young Engineering Portfolio

Static mechanical-engineering portfolio built with HTML, CSS, JavaScript, and GSAP.

The current homepage direction is **Swiss Engineering Poster with Typographic Interlock**: a restrained editorial composition using a framed first viewport, layered `Kyle Young` typography, monochrome portrait cutout, Golden Gate SVG linework, sparse technical metadata, social links, and GSAP scroll parallax.

## Local Development

Install dependencies if needed:

```powershell
npm install
```

Run a local static server:

```powershell
npx http-server . -p 8080
```

Open:

```text
http://localhost:8080
```

The site is static, so opening `index.html` directly also works for content review. Use a local server when testing GSAP and route behavior.

## Files

- `index.html` - homepage content, framed Swiss-editorial hero, selected work, research, leadership, and contact
- `style.css` - dossier visual system, responsive layout, and project-route styling
- `script.js` - navigation, hero parallax, reveal behavior, case-study table of contents, media fallbacks
- `projects/` - existing case-study routes preserved
- `images/` - real project media and existing generated atmospheric assets
- `prompts/higgsfield/` - saved bridge-generation prompts
- `assets/media-manifest.json` - media provenance, dimensions, alt text, and generation status
- `design-audit.md` - Impeccable-oriented critique prompt, findings, and fixes
- `YoungKyle_Resume.pdf` - resume linked from navigation and contact

## Media Provenance

The homepage uses Kyle's real `images/headshot.jpg` only. It does not generate or redraw Kyle's face.

Real project media is used for project evidence. Existing generated assets in `images/generated/` are used only as atmospheric connective material and are labeled in alt text and `assets/media-manifest.json`.

Higgsfield bridge-generation prompts were saved before generation attempts. Generation was blocked by the connected workspace plan, so the bridge system is implemented through authored CSS/SVG linework instead of generated bridge files.

## Routes

Existing project pages remain available:

- `projects/shock-packaging.html`
- `projects/anti-roll-bar-test-fixture.html`
- `projects/csf-flow-analysis.html`
- `projects/sf-unity.html`
- `projects/karl-2023.html` - SF Unity detail page
- `projects/phoenix-2024.html` - SF Unity detail page
- `projects/differential-wrist-mechanism.html`
- `projects/flite-test-tutor.html`
- `projects/novelforge-products.html`

## Deployment

For GitHub Pages or another static host, publish the repository root. The homepage uses local GSAP files from `node_modules`; if the host does not include `node_modules`, copy those assets or switch the script tags in `index.html` to a trusted CDN. Without GSAP, the hero remains readable and CSS-rendered.
