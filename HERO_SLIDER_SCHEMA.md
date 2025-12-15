# Hero Slider Layout Schema

## Desktop Layout (≥1024px)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           Hero Slider Container                             │
│                              Height: 550px                                  │
│                                                                             │
│  ┌────────────┐  ←gap:2rem→  ┌──────────────────┐  ←gap:2rem→  ┌───────────────┐
│  │            │               │                  │               │               │
│  │   Sample   │               │  Center Content  │               │   Ambiente    │
│  │   Image    │               │                  │               │   Image       │
│  │   (Left)   │               │  • Eyebrow       │               │   (Right)     │
│  │            │               │  • Title (H2)    │               │               │
│  │   1.8fr    │               │  • Description   │               │    5fr        │
│  │            │               │  • CTA Button    │               │               │
│  │            │               │                  │               │               │
│  │            │               │     4.2fr        │               │               │
│  │            │               │                  │               │               │
│  └────────────┘               └──────────────────┘               └───────────────┘
│                                                                             │
│  Total Grid: [1.8fr  +  4.2fr  +  5fr] = 11 fractional units              │
│  Percentages: [16.4%  +  38.2%  +  45.4%] ≈ 100%                          │
│  ⚠️  Left image increased 20% from original (1.5fr → 1.8fr)                │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Proportional Breakdown

### Grid Columns (CSS Grid)
```
grid-template-columns: 1.8fr 4.2fr 5fr;
```

**Relative Sizes:**
- **Left Image**: 1.8fr → ~16.4% of total width (+20% from original)
- **Center Content**: 4.2fr → ~38.2% of total width (reduced to accommodate left)
- **Right Image**: 5fr → ~45.4% of total width (unchanged)
- **Gap between columns**: 2rem (32px on desktop)

### Height
- **Fixed height**: 550px
- **Padding vertical**: `py-12 lg:py-0`
  - Mobile: 3rem (48px) top/bottom
  - Desktop: 0 (content vertically centered via flexbox)

### Example with 1200px Container Width
```
Container: 1200px
Gaps: 2 × 32px = 64px
Available: 1200px - 64px = 1136px

Left Image:     1136px × (1.8/11) = 186px  ≈ 16.4% (+20% increase)
Center Content: 1136px × (4.2/11) = 434px  ≈ 38.2% (reduced)
Right Image:    1136px × (5.0/11) = 516px  ≈ 45.4% (unchanged)
```

## Mobile Layout (<1024px)

```
┌──────────────────────────────────────┐
│         Hero Slider Container        │
│            Height: 550px             │
│                                      │
│  ┌────────────────────────────────┐ │
│  │                                │ │
│  │      Center Content            │ │
│  │                                │ │
│  │      • Eyebrow                 │ │
│  │      • Title (H2)              │ │
│  │      • Description             │ │
│  │      • CTA Button              │ │
│  │                                │ │
│  │      (Full Width)              │ │
│  │                                │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │                                │ │
│  │      Mobile Image              │ │
│  │      (Sample Image)            │ │
│  │                                │ │
│  │      Max Width: 384px          │ │
│  │      Aspect Ratio: 1:1         │ │
│  │                                │ │
│  └────────────────────────────────┘ │
│                                      │
└──────────────────────────────────────┘
```

### Mobile Specifics
- **Layout**: Single column (stacked vertically)
- **Images**: Only sample image shown, centered
- **Image max-width**: 384px (max-w-sm)
- **Image aspect ratio**: 1:1 (square)
- **Text alignment**: Centered
- **Gap**: 1.5rem (24px) between elements

## Typography Sizes (Reduced for Better Proportion)

### Title (H2)
```
font-size: clamp(1.75rem, 4.5vw, 2.75rem);
- Minimum: 28px (1.75rem) [reduced from 32px]
- Fluid: 4.5% of viewport width [reduced from 5%]
- Maximum: 44px (2.75rem) [reduced from 48px]
```

### Description
```
font-size: text-base md:text-lg
- Mobile: 1rem (16px) [reduced from 18px]
- Desktop: 1.125rem (18px) [reduced from 20px]
```

### Eyebrow
```
font-size: 0.8rem (12.8px) [reduced from 14px]
text-transform: uppercase
letter-spacing: widest
```

### CTA Button
```
font-size: 0.7rem (11.2px) [reduced from 12px]
padding: 0.5rem 1.5rem (8px 24px)
text-transform: uppercase
letter-spacing: widest
```

## Color Properties

### Background
```css
background: var(--slide-background, #000000)
/* Dynamic per slide, default black */
```

### Text Color
```css
color: var(--slide-textColor, #ffffff)
/* Dynamic per slide, default white */
```

## Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| < 1024px | Single column, stacked layout, center-aligned text |
| ≥ 1024px | Three-column grid, left-aligned text, full images visible |

## Image Specifications

### Desktop Images
- **Format**: WebP preferred, PNG/JPG supported
- **Object-fit**: cover (maintains aspect ratio, crops if needed)
- **Border radius**: 0 (squared corners)
- **Loading**: lazy (except first slide)

### Left Image (Sample)
- Width: ~13.6% of container
- Height: 550px (full slider height)
- Hidden on mobile

### Right Image (Ambiente)
- Width: ~45.5% of container
- Height: 550px (full slider height)
- Hidden on mobile

### Mobile Image
- Max width: 384px
- Aspect ratio: 1:1 (square)
- Centered horizontally

## Swiper Configuration

```javascript
{
  spaceBetween: 0,           // No gap between slides
  slidesPerView: 1,          // One slide visible at a time
  loop: true,                // Infinite loop
  autoplay: {
    delay: 5000,             // 5 seconds per slide
    disableOnInteraction: false
  },
  speed: 800,                // Transition speed (ms)
  navigation: true,          // Next/prev arrows
  pagination: {
    clickable: true          // Dot indicators
  }
}
```

## File Location
```
nextspace-astro/src/layouts/partials/DecomuralHeroSlider.astro
```
