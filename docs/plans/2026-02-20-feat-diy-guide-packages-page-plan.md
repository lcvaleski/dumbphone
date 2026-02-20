---
title: "feat: Add DIY Guide Packages Page"
type: feat
date: 2026-02-20
---

# Add DIY Guide Packages Page at /packages

## Overview

Create a new standalone page at `/packages` that sells 4 digital guide packages as a budget-friendly DIY alternative to the CorePhone pre-configured device. The page reuses the existing design system (CSS variables, typography, card patterns) and has its own checkout flow. Parents who want to configure their own iPhone can buy individual guides or a discounted bundle.

## Problem Statement / Motivation

CorePhone currently only offers a premium pre-configured iPhone ($599+). Parents who already own an iPhone or want a cheaper option have no path to purchase. These guides create a lower-price-point entry into the CorePhone ecosystem and capture revenue from DIY-minded parents.

## Proposed Solution

A new `packages.html` page with 4 package cards in a responsive grid:

| # | Package | Description | Price |
|---|---------|-------------|-------|
| 1 | Apple Configurator Guide | Step-by-step guide to using Apple Configurator 2 for permanent device restrictions | $29 |
| 2 | Apple Screen Time Guide | Complete guide to maximizing Apple's built-in Screen Time parental controls | $19 |
| 3 | Screen Blocking Apps Guide | Reviews and setup guides for top third-party screen blocking apps | $19 |
| 4 | Complete Bundle | All 3 guides at a discount | $49 (save $18) |

Each card has a "Buy" CTA button. The bundle card is visually promoted with a "Best Value" badge and shows the savings vs buying individually ($67 vs $49).

## Technical Approach

### New Files

- **`packages.html`** - New page, same structure as `index.html` (shared header/footer pattern, same font imports, same CSS)
- No new CSS file needed - add packages-specific styles to `styles.css`
- No new JS file needed - add minimal checkout logic to `script.js` or inline

### Design System Reuse

Reuse these existing primitives from `styles.css`:

- **CSS Variables**: `--accent-blue`, `--accent-green`, `--accent-yellow`, `--text-primary`, `--text-secondary`, `--bg-cream`, `--bg-gray`, `--border-light`
- **Typography**: `Crimson Text` for page heading, `Inter` for card content
- **Container**: `.container` (max-width: 900px, centered)
- **Buttons**: Existing `.add-to-cart` / `.flow-button` button styles
- **Footer/Header**: Same logo, nav links, footer structure

### Page Structure

```
packages.html
├── <header> (logo + nav back to main site)
├── <section class="packages-hero">
│   ├── h1: "DIY Parental Control Guides"
│   └── p: subtitle explaining these are self-guided alternatives
├── <section class="packages-grid">
│   ├── .package-card (Apple Configurator Guide) - $29
│   ├── .package-card (Screen Time Guide) - $19
│   ├── .package-card (Screen Blocking Apps Guide) - $19
│   └── .package-card.featured (Complete Bundle) - $49 + badge
├── <section class="packages-faq"> (2-3 guide-specific FAQs)
└── <footer> (same as main site)
```

### Card Component Design

Each `.package-card` contains:
- Guide title (h3)
- 2-3 sentence description
- 3-5 bullet points of what's included
- Price display
- CTA button ("Get This Guide" / "Get All 3 Guides")

The **bundle card** gets:
- A `featured` class with accent border (`--accent-green`)
- "Best Value" badge positioned top-right
- Strikethrough showing original price ($67) next to discounted price ($49)
- "Save $18" callout

### Responsive Grid

```
Desktop (>768px):  2x2 grid, equal-sized cards
Tablet (481-768px): 2-column grid
Mobile (<=480px):  Single column, stacked
```

Bundle card is same size as others (not full-width) to keep the grid clean.

### Checkout Flow

For now, each "Buy" button links to a placeholder URL or Shopify checkout URL (variant IDs TBD when Shopify products are created). The buttons use dummy `#` hrefs until real Shopify variants exist.

Pattern follows existing `script.js` approach:
```javascript
// When Shopify variants are created, replace with real IDs
const guideVariants = {
    'configurator': 'VARIANT_ID_HERE',
    'screentime': 'VARIANT_ID_HERE',
    'blocking-apps': 'VARIANT_ID_HERE',
    'bundle': 'VARIANT_ID_HERE'
};
```

### Navigation Updates

- Add "Guides" link in `packages.html` header
- Add "Guides" link in `index.html` footer (lightweight cross-link, not main nav)
- `packages.html` header links back to main site

## Acceptance Criteria

- [x] New `packages.html` page loads at `/packages`
- [x] 4 package cards displayed in responsive 2x2 grid (desktop), single column (mobile)
- [x] Each card shows: title, description, bullet points, price, CTA button
- [x] Bundle card has "Best Value" badge and shows savings ($67 vs $49)
- [x] Page reuses existing CSS variables, fonts, container widths, and button styles
- [x] Header has CorePhone logo + link back to main product
- [x] Footer matches main site footer
- [x] Mobile responsive with adequate touch targets (44x44px minimum buttons)
- [x] Vanilla Tilt 3D effect on package cards (consistent with main site)
- [x] CTA buttons have placeholder hrefs (ready for Shopify variant IDs)
- [x] 2-3 guide-specific FAQ items at bottom of page

## Implementation Checklist

### `packages.html`

```html
<!-- Same <head> as index.html (fonts, CSS, favicon, viewport) -->
<!-- Updated <title> and meta tags for /packages -->
<!-- Header with logo + "Back to CorePhone" link -->
<!-- Hero section with page title + subtitle -->
<!-- 4 package cards in .packages-grid -->
<!-- Brief FAQ section -->
<!-- Same footer as index.html -->
<!-- Vanilla Tilt init on .package-card elements -->
```

### `styles.css` additions

```css
/* Package card grid */
.packages-grid { }

/* Individual package card */
.package-card { }

/* Featured/bundle card */
.package-card.featured { }

/* Best Value badge */
.package-badge { }

/* Price display with strikethrough for bundle */
.package-price { }
.package-price .original { }

/* Responsive breakpoints */
@media (max-width: 768px) { }
@media (max-width: 480px) { }
```

### `script.js` or inline script

Minimal JS needed:
- Vanilla Tilt initialization on cards
- FAQ accordion (reuse existing pattern)
- Placeholder checkout handler for CTA buttons

## What This Plan Does NOT Include

- Actual Shopify product/variant creation (manual step in Shopify admin)
- Guide content creation (PDFs, videos, etc.)
- Payment processing integration (just placeholder buttons)
- Analytics/tracking setup
- Email delivery system for purchased guides
- User account/portal for accessing guides

## References

- Existing design system: `styles.css:1-17` (CSS variables)
- Typography: `styles.css:36-62` (h1, h2, h3 styles)
- Container: `styles.css:29-33` (.container)
- Button patterns: `styles.css` (`.add-to-cart`, `.flow-button`)
- Checkout pattern: `script.js` (Shopify form submission)
- Footer: `index.html:672-695`
- Vanilla Tilt setup: `index.html:749-781`
