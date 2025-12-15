# Hero Slider Section - Complete Summary

**Last Updated:** 2025-12-12
**Component:** DecomuralHeroSlider.astro
**Location:** Homepage (index.astro)

---

## 1. Overview

The hero slider is the primary visual element on the homepage, showcasing featured wallpaper collections through an auto-rotating carousel. It uses Swiper.js for smooth transitions and supports 2 active slides.

---

## 2. Current Implementation

### File Structure

```
src/
├── pages/
│   └── index.astro                          # Uses <DecomuralHeroSlider />
└── layouts/
    └── partials/
        └── DecomuralHeroSlider.astro        # Main component (210 lines)
```

### Data Source

**Primary:** `data.xlsx` → Sheet: `IndexheroSlides`

**Current Data (2 slides):**

| Field | Slide 1 | Slide 2 |
|-------|---------|---------|
| **indexorder** | 1 | 2 |
| **eyebrow** | Colección 2025 | Texturas naturales |
| **title** | Stories of Life | Elements II |
| **description** | Murales envolventes con nubes etéreas y fauna ilustrada. | Elementos naturales para un living contemporáneo. |
| **sampleImage** | 369223.webp | 300434.webp |
| **ambientImage** | 369223_3-768x512.webp | 300434_4-768x1024.webp |
| **background** | #3d1c1f | #10261d |
| **textColor** | #ffffff | #ffffff |
| **link** | catalogo.html | catalogo.html |
| **linkLabel** | Explorar Stories of Life | Explorar Elements II |

**Image Path Logic:**
- Excel stores only filenames
- Component maps collection names to folders:
  - `Stories of Life` → `/images/wallpapers/storiesoflife/`
  - `Elements II` → `/images/wallpapers/elementsII/`

---

## 3. Layout Structure

### Desktop Layout (≥900px)

```
┌────────────────────────────────────────────────────────────────┐
│                         Hero Slider (550px height)              │
│  ┌───────┐  ┌────────────────────┐  ┌──────────────────┐      │
│  │       │  │                    │  │                  │      │
│  │Sample │  │  Center Content    │  │    Ambiente      │      │
│  │ Image │  │  - Eyebrow         │  │     Image        │      │
│  │       │  │  - Title           │  │                  │      │
│  │(1.5fr)│  │  - Description     │  │     (5fr)        │      │
│  │       │  │  - CTA Button      │  │                  │      │
│  │       │  │  (4.5fr)           │  │                  │      │
│  └───────┘  └────────────────────┘  └──────────────────┘      │
│                                                                 │
│  [◄ Prev]                  [● ● ●]                  [Next ►]   │
└────────────────────────────────────────────────────────────────┘
```

**Grid:** `1.5fr 4.5fr 5fr` (sample, content, ambiente)
- Sample: 14% width (reduced from 18%)
- Content: 41% width (reduced from 45%)
- Ambiente: 45% width (increased from 36%)
**Height:** 550px fixed
**Gap:** 6-8rem between columns
**Rationale:** Wider ambiente column better accommodates landscape photos (16:9, 4:3 ratios)

### Mobile Layout (<900px)

```
┌──────────────────────────┐
│   Center Content         │
│   - Eyebrow              │
│   - Title                │
│   - Description          │
│   - CTA Button           │
├──────────────────────────┤
│   Sample Image           │
│   (square)               │
└──────────────────────────┘
        [● ● ●]
```

**Grid:** Single column
**Height:** Auto
**Images:** Only sample shown, ambiente hidden

---

## 4. Design Specifications

### Typography

| Element | Font | Size | Styling |
|---------|------|------|---------|
| **Eyebrow** | Poppins | 0.875rem (14px) | Uppercase, tracking-widest, opacity: 0.8 |
| **Title** | Poppins | clamp(2rem, 5vw, 3rem) | Uppercase, letter-spacing: 0.2em, Bold |
| **Description** | Poppins | 1.125-1.25rem (18-20px) | Line-height: 1.8, max-width: 36rem |
| **CTA Button** | Poppins | 0.75rem (12px) | Uppercase, tracking-widest |

### Colors

- **Background:** Slide-specific (from Excel `background` field)
  - Slide 1: `#3d1c1f` (dark burgundy)
  - Slide 2: `#10261d` (dark forest green)
- **Text:** Slide-specific (from Excel `textColor` field)
  - Both slides: `#ffffff` (white)
- **Button:** Ghost style with 2px border, inherits text color

### Images

- **Aspect Ratio:** `1:1` (square) via `aspect-square`
- **Border Radius:** `0.75rem` (12px)
- **Object Fit:** `cover`
- **Loading:** Lazy (except first slide should be eager)

### Navigation Controls

**Arrows:**
- Size: 42px × 42px circular buttons
- Background: `rgba(255, 255, 255, 0.1)` with blur
- Icon: 16px white chevrons
- Position: Vertically centered, absolute edges
- Hidden: Below 900px (mobile)

**Pagination Dots:**
- Shape: 32px × 4px rounded pills (horizontal bars)
- Color: `rgba(255, 255, 255, 0.5)` inactive, `white` active
- Position: Bottom center, 1rem from edge
- Always visible on all screen sizes

---

## 5. Swiper Configuration

```javascript
{
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 5000,              // 5 seconds per slide
    disableOnInteraction: false
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
}
```

**Event Listener:** `astro:page-load` (supports client-side navigation)

---

## 6. Comparison: Current vs Mockup

### ✅ Matching Elements

| Aspect | Status |
|--------|--------|
| 3-column desktop layout | ✅ Implemented |
| Sample + Ambiente images | ✅ Both shown |
| Eyebrow, Title, Description, CTA | ✅ All present |
| Background & text colors per slide | ✅ Configurable |
| Swiper navigation & pagination | ✅ Working |
| Mobile single-column stack | ✅ Responsive |
| Lazy loading images | ✅ Enabled |

### ⚠️ Differences from Mockup

| Aspect | Mockup (index.html) | Current (Astro) | Notes |
|--------|---------------------|-----------------|-------|
| **Autoplay delay** | 6000ms (6 sec) | 5000ms (5 sec) | Minor timing difference |
| **Grid proportions** | `2fr 5fr 4fr` | `1.5fr 4.5fr 5fr` | ⚠️ Modified for wider ambiente |
| **Animation speed** | 900ms | 200ms (fadeIn) | Faster transition in Astro |
| **CTA Link** | `catalogo.html` | `/catalogo?coleccion={slug}` | ✅ Improved (actual filtering) |
| **Mobile image** | Sample only | Sample only | ✅ Match |
| **Image sizing** | Square aspect | Full height fill | ⚠️ Better for landscape ambiente |
| **CTA button** | Large padding | Compact (fit-content) | ✅ Improved visual balance |

---

## 7. Image Path Resolution Issues

### Problem

Excel stores only filenames, but the component needs full paths. Current mapping uses hardcoded folder names:

```javascript
const folderMap = {
  'Stories of Life': 'storiesoflife',
  'Elements II': 'elementsII'
};
```

### Risk

Adding new collections requires updating the component code.

### Solution

Better approach: Read `folder` field from collections content:

```javascript
// Get collection folder from collection content
const collections = await getCollection('collections');
const folderMap = Object.fromEntries(
  collections.map(c => [c.data.title, c.data.folder])
);
```

---

## 8. Accessibility

### ✅ Implemented

- Semantic HTML: `<section>`, `<h2>`, `<p>`, `<a>`
- Alt text on images
- Clickable pagination
- Keyboard navigation via Swiper

### ⚠️ Missing

- `aria-label` on section
- `aria-live="polite"` for slide changes
- Focus management on slide transition
- Pause button for autoplay (WCAG 2.2.2)

---

## 9. Performance Considerations

### ✅ Optimizations

- Lazy loading for non-first slides
- WebP image format
- Fixed height prevents layout shift

### ⚠️ Potential Issues

- Reads Excel file on every build (not cached)
- No image optimization (Astro Image not used)
- First slide images should be `loading="eager"`

### Recommendations

1. **Use Astro Image component:**
   ```astro
   import { Image } from 'astro:assets';
   <Image src={sampleImage} alt="..." />
   ```

2. **Eager load first slide:**
   ```astro
   loading={slide.indexorder === 1 ? "eager" : "lazy"}
   ```

3. **Generate static image imports** instead of reading Excel at runtime

---

## 10. Common Improvement Areas

Based on typical hero slider best practices:

### A. Visual Enhancements

- [ ] Add subtle parallax effect on images
- [ ] Implement Ken Burns zoom on images
- [ ] Add fade/blur overlay on background
- [ ] Improve button hover states (scale, glow)
- [ ] Add slide transition effects (fade, slide, etc.)

### B. Functionality

- [ ] Add pause/play toggle button
- [ ] Show slide counter (e.g., "1 / 2")
- [ ] Add keyboard controls (←/→ arrows)
- [ ] Preload next slide images
- [ ] Add slide progress indicator

### C. Content

- [ ] Support video backgrounds
- [ ] Add secondary CTA button
- [ ] Support multiple ambient images per slide
- [ ] Add subtitle/secondary text field
- [ ] Support custom fonts per slide

### D. Performance

- [ ] Use Astro Image for optimization
- [ ] Implement responsive images (srcset)
- [ ] Add loading skeleton/placeholder
- [ ] Cache Excel data during build
- [ ] Optimize bundle size (tree-shake Swiper)

### E. Accessibility

- [ ] Add ARIA labels and live regions
- [ ] Implement pause on hover
- [ ] Add reduced motion support
- [ ] Improve keyboard navigation
- [ ] Add screen reader announcements

### F. Mobile Experience

- [ ] Add swipe gesture indicators
- [ ] Optimize touch target sizes
- [ ] Reduce autoplay speed on mobile
- [ ] Consider vertical layout option
- [ ] Show both images on tablet

---

## 11. Excel Data Schema

**Sheet Name:** `IndexheroSlides`

| Column | Type | Required | Example | Notes |
|--------|------|----------|---------|-------|
| **indexorder** | Number | ✅ | 1 | Sort order (ascending) |
| **eyebrow** | Text | ❌ | "Colección 2025" | Small label above title |
| **title** | Text | ✅ | "Stories of Life" | Main heading, used for collection slug |
| **description** | Text | ❌ | "Murales envolventes..." | Body text |
| **sampleImage** | Filename | ❌ | "369223.webp" | Left panel (desktop) |
| **ambientImage** | Filename | ❌ | "369223_3-768x512.webp" | Right panel (desktop) |
| **background** | Hex Color | ❌ | "#3d1c1f" | Slide background color |
| **textColor** | Hex Color | ❌ | "#ffffff" | All text color |
| **link** | URL | ❌ | "catalogo.html" | CTA destination (legacy) |
| **linkLabel** | Text | ❌ | "Explorar..." | CTA button text |

**Total Slides:** 2 currently configured

---

## 12. Quick Reference

### Adding a New Slide

1. Open `data.xlsx` → Sheet `IndexheroSlides`
2. Add new row with all fields
3. Set `indexorder` to next number (3, 4, etc.)
4. Place images in `/public/images/wallpapers/{collection-folder}/`
5. If new collection, update `folderMap` in DecomuralHeroSlider.astro:19-27
6. Rebuild site: `yarn build`

### Changing Slide Order

1. Edit `indexorder` values in Excel
2. Rebuild site

### Changing Timing

Edit `DecomuralHeroSlider.astro:196`:
```javascript
delay: 5000, // Change to desired milliseconds
```

### Disabling Autoplay

Edit `DecomuralHeroSlider.astro:195-198`:
```javascript
// autoplay: {
//   delay: 5000,
//   disableOnInteraction: false,
// },
```

---

## 13. Files to Review for Changes

| File | Purpose | Lines to Check |
|------|---------|----------------|
| `DecomuralHeroSlider.astro` | Main component | All (210 lines) |
| `data.xlsx` | Hero slide data | Sheet: IndexheroSlides |
| `index.astro` | Page using slider | Line 9 |
| `Base.astro` | Layout wrapper | CSS/JS imports |
| `/public/images/wallpapers/` | Image assets | Slide images |

---

## 14. Testing Checklist

Before deploying hero slider changes:

- [ ] Desktop (1920px, 1440px, 1024px) - All slides look correct
- [ ] Tablet (768px) - Layout transitions smoothly
- [ ] Mobile (375px, 320px) - Single column, readable text
- [ ] Autoplay works (5 seconds per slide)
- [ ] Navigation arrows work (desktop only)
- [ ] Pagination dots work and show active state
- [ ] CTA buttons link to correct filtered catalog pages
- [ ] Images load and display correctly (no 404s)
- [ ] Text is readable on all background colors
- [ ] Slide transitions are smooth
- [ ] Keyboard navigation works (Tab, Arrow keys)
- [ ] Screen reader announces slides correctly
- [ ] Page load performance is acceptable (<3s LCP)

---

**End of Summary**
