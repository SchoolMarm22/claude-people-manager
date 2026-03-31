# Design System — Anthropic-Inspired

This demo should feel like it belongs in Anthropic's ecosystem. Not a copy — an echo. The goal is for a reviewer to think "this person already thinks in our visual language."

---

## Design Principles

1. **Warmth over sterility.** Anthropic's brand avoids the cold blue-gray-white of typical enterprise SaaS. It's warmer, more human. Off-whites, warm grays, subtle cream tones.

2. **Space is a feature.** Generous padding, wide margins, breathing room. Dense UIs signal "enterprise software." Spacious UIs signal "we respect your attention."

3. **Typography does the work.** Minimal decoration. No gradients, no complex shadows, no rounded-everything. Clean type hierarchy creates structure.

4. **Restraint.** One accent color. Minimal iconography. No animations unless they serve a purpose (loading states). No dark mode — this is a demo, not a product.

---

## Color Palette

```css
:root {
  /* Backgrounds */
  --bg-primary: #FAFAF8;          /* Warm off-white — main page background */
  --bg-secondary: #FFFFFF;         /* Pure white — cards, panels */
  --bg-tertiary: #F5F3EF;          /* Warm light gray — subtle sections */
  --bg-builder-note: #FDF8F0;      /* Warm cream — Builder's Note background */

  /* Text */
  --text-primary: #1A1A1A;         /* Near-black — headings, body */
  --text-secondary: #6B6B6B;       /* Medium gray — secondary text, descriptions */
  --text-tertiary: #9B9B9B;        /* Light gray — timestamps, metadata */

  /* Brand / Accent */
  --accent-primary: #D97757;       /* Anthropic warm coral — primary accent, links, CTAs */
  --accent-primary-hover: #C4684A; /* Darker coral for hover states */
  --accent-primary-light: #FAF0EB; /* Very light coral — subtle highlights */

  /* Functional */
  --border: #E8E5E0;               /* Warm border color */
  --border-strong: #D1CCC4;        /* Stronger border for emphasis */
  --success: #3B8C6E;              /* Muted green — approval, strong yes */
  --warning: #D4913D;              /* Warm amber — maybe, attention needed */
  --danger: #C4524A;               /* Muted red — no, concerns */
  --info: #5B7FA5;                 /* Muted blue — informational */

  /* Builder's Note specific */
  --builder-border: var(--accent-primary);
  --builder-label: var(--accent-primary);
}
```

---

## Typography

**Font Stack:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

Install Inter from Google Fonts or use `next/font`:
```typescript
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
```

**Scale:**

| Element | Size | Weight | Color | Tailwind |
|---------|------|--------|-------|----------|
| Page title | 32px (2rem) | 600 | text-primary | `text-3xl font-semibold` |
| Section heading | 24px (1.5rem) | 600 | text-primary | `text-2xl font-semibold` |
| Card title | 18px (1.125rem) | 500 | text-primary | `text-lg font-medium` |
| Body text | 16px (1rem) | 400 | text-primary | `text-base` |
| Secondary text | 14px (0.875rem) | 400 | text-secondary | `text-sm text-gray-500` |
| Caption / metadata | 12px (0.75rem) | 400 | text-tertiary | `text-xs text-gray-400` |
| Builder's Note text | 14px (0.875rem) | 400 | text-primary | `text-sm` |
| Builder's Note label | 12px (0.75rem) | 600 | accent-primary | `text-xs font-semibold` |

---

## Component Patterns

### Cards
```
- Background: white (--bg-secondary)
- Border: 1px solid var(--border)
- Border-radius: 8px (rounded-lg)
- Padding: 24px (p-6)
- Shadow: none or very subtle (shadow-sm only on hover)
- Hover: border color transitions to --border-strong
```

Tailwind: `bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors`

### Buttons

**Primary (CTA):**
```
- Background: var(--accent-primary)
- Text: white
- Border-radius: 6px
- Padding: 10px 20px
- Hover: var(--accent-primary-hover)
- No shadow
```
Tailwind: `bg-[#D97757] text-white rounded-md px-5 py-2.5 hover:bg-[#C4684A] transition-colors font-medium`

**Secondary:**
```
- Background: transparent
- Border: 1px solid var(--border)
- Text: var(--text-primary)
- Hover: background var(--bg-tertiary)
```
Tailwind: `border border-gray-200 rounded-md px-5 py-2.5 hover:bg-gray-50 transition-colors font-medium`

### Status Badges

```
🟢 Live AI:         bg-green-50 text-green-700 border border-green-200
🔵 Interactive Demo: bg-blue-50 text-blue-700 border border-blue-200
⚪ Vision:          bg-gray-50 text-gray-600 border border-gray-200
```

Small pill shape: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`

### ChrisNote Component (Notes from Chris)

```
Container:
  - Background: bg-[#FDF8F0]
  - Border: 1px solid var(--accent-primary)/20
  - Border-radius: 12px (rounded-xl)
  - Padding: 20px (p-5)
  - Margin-bottom: 32px (mb-8)
  - Always visible (not behind a toggle)

Label:
  - "💬 NOTES FROM CHRIS"
  - text-xs font-semibold text-[#D97757] uppercase tracking-wider mb-2
  - MessageCircle icon from lucide-react

Content:
  - text-sm text-[#4A4A4A] leading-relaxed
  - space-y-3 for paragraph spacing
```

### Spec Editor (for Screening + Interview Prep modules)

```
- Monospace font (font-mono) for the editable area
- Background: --bg-tertiary (slightly warm gray)
- Border: 1px solid var(--border)
- Min-height: 300px
- Padding: 16px
- A small label above: "Hiring Spec File" with the spec name
- Tab-style selectors to switch between pre-loaded specs
```

### Navigation

**Sidebar (fixed left):**
- Width: 256px (w-64)
- Full height, fixed position
- Logo: "People Products" with Sparkles icon
- 12 nav items with status badges (Live AI / Demo / Concept)
- Account link with gold star at bottom
- Divider before Account

**Status Badges:**
```
🟢 Live AI:   bg-green-100 text-green-700 border-green-200
🔵 Demo:      bg-blue-100 text-blue-700 border-blue-200
🟣 Concept:   bg-violet-100 text-violet-600 border-violet-200
```

**Module pages:**
- Module title + status badge (no back link — sidebar handles navigation)
- Max-width: max-w-5xl

---

## Layout Patterns

**Max content width:** 1200px (max-w-6xl) centered
**Side padding:** 24px mobile, 48px desktop

**Landing page grid:** 
- 2 columns on desktop for module cards
- 1 column on mobile
- Gap: 16px

**Three-panel layout (Screening module):**
- Desktop: flex row, each panel roughly 33%
- Spec editor and resume viewer have min-width
- AI output panel can scroll independently
- Mobile: stack vertically

**Two-panel layout (Interview Prep):**
- Desktop: 40% left (inputs), 60% right (output)
- Mobile: stack vertically

---

## Loading States

When waiting for Claude API response:
- Skeleton loading in the output panel
- Subtle pulse animation (Tailwind: `animate-pulse`)
- Text: "Claude is reviewing..." or "Generating interview prep..."
- Show a small progress indicator (not a spinner — those feel generic)
- Estimated time: "This usually takes 5-10 seconds"

---

## Responsive Considerations

The primary audience views this on desktop (it's in a job application). Mobile should work but doesn't need to be pixel-perfect. Priorities:
1. Desktop: polished, spacious, professional
2. Tablet: functional, slightly compressed
3. Mobile: readable, stacked layouts, nothing broken

---

## Things to Avoid

- ❌ Dark mode toggle (unnecessary complexity)
- ❌ Gradient backgrounds (not Anthropic's style)
- ❌ Rounded-full buttons (too playful)
- ❌ Blue as primary color (too generic, not Anthropic)
- ❌ Heavy box shadows (keep it flat and bordered)
- ❌ Icon-heavy navigation (text is clearer)
- ❌ Animations beyond loading states (distracting)
- ❌ Stock photos or illustrations (clean and text-driven)
