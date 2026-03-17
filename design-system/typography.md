# Typography System — Brad Carter Portfolio

## Font Families

| Token | Value | Usage |
|-------|-------|-------|
| `T.font` | `'Inter', system-ui, sans-serif` | UI chrome, labels, buttons, status bar |
| `T.mono` | `'JetBrains Mono', 'Fira Code', monospace` | Code editor, all preview panels, body copy |

---

## Type Scale

### Display

| Name | Size | Line Height | Letter Spacing | Weight | Color | Usage |
|------|------|-------------|----------------|--------|-------|-------|
| Display XL | `clamp(64px, 10vw, 120px)` | `0.92` | `-0.03em` | `700` | `#1a1a1a` | Hero pixel-art fallback text |
| Display | `36px` | `1.15` | `-0.02em` | `700` | `#1a1a1a` | Section heroes |

### Headings

| Name | Size | Line Height | Letter Spacing | Weight | Color | Usage |
|------|------|-------------|----------------|--------|-------|-------|
| H1 | `28px` | `1.15` | `-0.01em` | `700` | `#1a1a1a` (light) / `#e8e8e8` (dark) | Page title, project title |
| H2 | `18px` | `1.2` | `0` | `600` | `#1a1a1a` (light) / `#e8e8e8` (dark) | Section heading |
| H3 | `16px` | `1.4` | `0` | `600` | `#333` (light) / `#d4d4d4` (dark) | Sub-section heading |
| H4 | `14px` | `1.4` | `0` | `600` | `#333` (light) / `#aaa` (dark) | Card label, role title |
| H5 | `13px` | `1.4` | `0` | `600` | `#555` (light) / `#888` (dark) | Tertiary label |

### Body

| Name | Size | Line Height | Color | Usage |
|------|------|-------------|-------|-------|
| `T.body` | `16px` | `1.4` | `#333` | Standard prose (light bg) |
| `T.small` | `15px` | `1.4` | `#555` | Secondary prose (light bg) |
| Body Dark | `15px` | `1.4` | `#d1d5dc` | Prose on dark bg (work/preview) |
| Body Dark Alt | `15px` | `1.4` | `#f1f1f1` | Prose on dark bg (about preview) |

### Labels & UI Text

| Name | Size | Letter Spacing | Transform | Weight | Color | Usage |
|------|------|----------------|-----------|--------|-------|-------|
| `T.label` | `12px` | `0.08em` | `uppercase` | `600` | `#888` | Section labels, UI metadata |
| Tab label | `12px` | `0` | none | `400` | `#d4d4d4` (active) / `#969696` (inactive) | Editor tabs |
| Status bar | `11px` | `0` | none | `400` | `rgba(255,255,255,0.9)` | Bottom status bar |
| Title bar | `11.5px` | `0` | none | `400` | `#9d9d9d` | Window title |
| Code editor | `12.5px` | `0` | none | `400` | `#d4d4d4` | Left panel code lines |

---

## Color Palette

### Dark Theme (Preview Panels)

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#1e1e1e` | Editor background |
| Surface | `#161616` | Preview panel background |
| Tab bar | `#2d2d2d` | Tab strip |
| Title bar | `#323233` | Title/status bar |
| Border | `#111` | Panel borders |

### Dark Theme Text

| Token | Hex | Usage |
|-------|-----|-------|
| Text primary | `#e8e8e8` | Headlines, emphasis |
| Text primary alt | `#f1f1f1` | About preview body |
| Text secondary | `#d4d4d4` | Body, active tabs |
| Text muted | `#d1d5dc` | Work preview body |
| Text dim | `#aaa` | Secondary info |
| Text dimmer | `#999` | Tertiary info |
| Text faint | `#888` | Labels, metadata |
| Text disabled | `#777` / `#666` | Timestamps, hints |
| Line numbers | `#4b5563` | Code line numbers |

### Light Theme (Preview Toolbar)

| Token | Hex | Usage |
|-------|-----|-------|
| Text | `#1a1a1a` | Headings on white |
| Text secondary | `#333` | Body on white |
| Text muted | `#555` | Secondary on white |
| Text dim | `#888` | Tertiary, labels on white |

### Syntax / Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Gold | `#d4a96a` | Focus rings, accent |
| Blue | `#61afef` | Keywords, TS ext badge |
| Red | `#e06c75` | Strings-red, PDF badge |
| Amber | `#e5c07b` | JS ext badge |
| Green | `#98c379` | JSON badge, booleans |
| Teal | `#56b6c2` | Type names |
| Comment | `#abb2bf` | Code comments, MD badge |

---

## Spacing

### Base Unit

All spacing is built on a **4px base unit**. Use multiples of 4 wherever possible.

### Spacing Scale

| Step | px | rem | Usage |
|------|----|-----|-------|
| 1 | `4px` | `0.25rem` | Tight gaps, dot/badge nudge |
| 1.5 | `6px` | `0.375rem` | Traffic light gap, tab icon gap |
| 2 | `8px` | `0.5rem` | Inline element gap, chip padding |
| 2.5 | `10px` | `0.625rem` | List item icon gap |
| 3 | `12px` | `0.75rem` | Small padding, line number pad |
| 3.5 | `14px` | `0.875rem` | Tab horizontal padding, medium gap |
| 4 | `16px` | `1rem` | Standard margin, section gap |
| 5 | `20px` | `1.25rem` | Paragraph margin-bottom, card inner |
| 6 | `24px` | `1.5rem` | Card padding, section gap |
| 7 | `28px` | `1.75rem` | Card section inner padding |
| 8 | `32px` | `2rem` | Contact block margin, large gap |
| 10 | `40px` | `2.5rem` | Page section gap |
| 12 | `48px` | `3rem` | Preview panel vertical padding (`T.pad`) |
| 13 | `52px` | `3.25rem` | Preview panel horizontal padding (`T.pad`) |
| 16 | `64px` | `4rem` | Large section separation |

### Component Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `T.pad` | `48px 52px` | Preview panel padding (vertical / horizontal) |
| `T.maxW` | `65ch` | Max line length for prose |

### Common Gaps (Flexbox / Grid)

| Context | Gap | Notes |
|---------|-----|-------|
| Traffic light dots | `6px` | Title bar |
| Tab items | `7px` | Icon + filename |
| Inline labels | `8px` | Bullet dot + text |
| Tool chips | `10px` | Icon + label |
| Stat cards | `12px` | Label stack |
| Name + avatar | `24px` | About header |
| Cards (vertical) | `24px` | Work page card list |
| Contact items | `16px` | Resume contact row |

### Margin & Padding Patterns

| Context | Value | Notes |
|---------|-------|-------|
| Paragraph spacing | `20px` bottom | Body copy rhythm |
| Section heading gap | `16px` bottom | Label → first content |
| Section separator | `32px` bottom | Between resume sections |
| Card inner padding | `20px 24px` | Work/resume cards |
| Work page outer | `24px 48px` | Work preview container |
| Preview panel | `48px 52px` | All other preview panels |

### Border Radius

| Size | Value | Usage |
|------|-------|-------|
| XS | `3px` | Scrollbar thumb |
| SM | `4px` | Address bar, inline chips |
| MD | `6px` | Buttons, profile photo, tags |
| LG | `8px` | Cards, panels |
| XL | `12px` (`0.75rem`) | Editor window, preview frame |

---

## Buttons

### Base `.btn`

| Property | Value |
|----------|-------|
| Padding | `11px 24px` |
| Border radius | `4px` |
| Font family | `Inter`, system-ui, sans-serif |
| Font size | `14px` |
| Font weight | `600` |
| Letter spacing | `-0.01em` |
| Transition | `background, color, border-color, opacity` — `150ms ease` |

### Primary `.btn-primary` — Filled

| State | Background | Color | Border |
|-------|-----------|-------|--------|
| Default | `#e8e8e8` | `#111` | transparent |
| Hover | `#fff` | `#111` | transparent |
| Active | `#ccc` | `#111` | transparent |
| Focus | `#e8e8e8` | `#111` | `2px solid #d4a96a` (outline, offset 3px) |
| Disabled | `#3a3a3a` | `#666` | transparent |

### Secondary `.btn-secondary` — Ghost

| State | Background | Color | Border |
|-------|-----------|-------|--------|
| Default | transparent | `#888` | `1px solid #333` |
| Hover | transparent | `#ccc` | `1px solid #666` |
| Active | `rgba(255,255,255,0.04)` | `#e8e8e8` | `1px solid #888` |
| Focus | transparent | `#888` | `2px solid #d4a96a` (outline, offset 3px) |
| Disabled | transparent | `#444` | `1px solid #2a2a2a` |

---

## Rules (Practical Typography Compliance)

- **Body font-size**: 15–16px minimum (never below 15px for prose)
- **Line-height**: 1.2–1.45 range. Body = 1.4. Display/h1 = 1.15. Never exceed 1.45 for body text.
- **All-caps tracking**: 0.08em on `T.label`. Never use letter-spacing on normal lowercase text.
- **Text color**: Never use pure `#000`. Minimum `#888` for small text on dark backgrounds.
- **Heading hierarchy**: Max 3 distinct sizes in any single view.
- **Font consistency**: Use `T.mono` for all preview panels and code contexts. Use `T.font` for chrome only.
