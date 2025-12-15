# Mega Menu Redesign Plan

## Current Implementation Analysis

### Current Structure (DecomuralHeader.astro)
- **Container**: `min-w-[600px]` - relatively narrow
- **Grid Layout**: `grid-cols-[2fr_1fr_1fr_1.5fr]` - 4 columns
- **Image Size**: `h-24` (96px height) in highlight card
- **Positioning**: `absolute left-0` - positioned relative to nav item

### Mockup Specifications (styles.css)
- **Positioning**: `left: -1rem; right: -1rem` - spans beyond nav item
- **Grid**: `repeat(auto-fit, minmax(140px, 1fr))` - flexible columns
- **Image**: `height: 140px` - larger than current
- **Padding**: `2rem clamp(1rem, 5vw, 3rem)` - responsive padding

## Proposed Changes

### 1. Increase Overall Width
**Current**: `min-w-[600px]`
**Proposed**: `min-w-[900px]` or use viewport-relative width

**Rationale**:
- Allows more breathing room for content
- Can display larger preview image
- Better showcases wallpaper products
- More modern, spacious design

### 2. Expand Image Display Area
**Current**:
- Image: `h-24` (96px) in small highlight card
- Card: `w-full` within 1.5fr column

**Proposed Options**:

#### Option A: Larger Highlight Card (Recommended)
- Image: `h-48` (192px) - 2x current size
- Aspect ratio: `aspect-[4/3]` or `aspect-[3/2]`
- Card width: Occupies full column width

#### Option B: Dedicated Image Column
- Create 5th column specifically for image
- Image: `h-56` (224px) or `h-64` (256px)
- Aspect ratio: `aspect-[3/4]` (portrait orientation)
- Grid: `grid-cols-[2fr_1fr_1fr_1fr_2fr]`

#### Option C: Full-Width Image Banner
- Image spans entire mega menu width at top
- Height: `h-32` (128px)
- Aspect ratio: `aspect-[21/9]` (ultra-wide)
- Content columns below

### 3. Adjust Grid Layout

#### Current Grid
```css
grid-cols-[2fr_1fr_1fr_1.5fr]
```
- Collections: 2fr (33%)
- Color: 1fr (17%)
- Pattern: 1fr (17%)
- Info + Image: 1.5fr (25%)

#### Proposed Grid (Option A - Wider + Larger Image)
```css
grid-cols-[2.5fr_1fr_1fr_1fr_2fr]
```
- Collections: 2.5fr (30%)
- Color: 1fr (12%)
- Pattern: 1fr (12%)
- Info: 1fr (12%)
- Image Highlight: 2fr (24%)

**Advantages**:
- Dedicated space for image
- Better visual hierarchy
- Info links separated from image

#### Proposed Grid (Option B - Match Mockup)
```css
grid-template-columns: repeat(auto-fit, minmax(160px, 1fr))
```
- Flexible columns
- Adapts to content
- Matches mockup closely

### 4. Positioning Strategy

#### Current
```css
position: absolute;
left: 0;
top: full;
min-w-[600px];
```

#### Proposed
```css
position: absolute;
left: 50%;
transform: translateX(-50%);
top: calc(100% + 0.5rem);
width: 90vw;
max-width: 1200px;
```

**Advantages**:
- Centers mega menu relative to viewport
- Responsive width (90vw)
- Maximum width constraint (1200px)
- Spans beyond nav item for better visual impact

### 5. Image Specifications

#### Recommended Image Sizes

**Option A (Highlight Card)**:
- Display: `192px × 144px` (4:3 ratio)
- Source: `400px × 300px` (retina)
- Format: WebP with fallback

**Option B (Dedicated Column)**:
- Display: `224px × 298px` (3:4 portrait)
- Source: `500px × 667px` (retina)
- Format: WebP with fallback

**Option C (Banner)**:
- Display: `1200px × 128px` (21:9 ultra-wide)
- Source: `2400px × 256px` (retina)
- Format: WebP with fallback

### 6. Content Adjustments

#### Collections Column
- Increase font size: `0.8rem` → `0.85rem`
- Better line height: `1.5` → `1.7`
- More spacing: `space-y-2` → `space-y-2.5`

#### Color & Pattern Columns
- Keep current sizes
- Consider showing more items (8 colors instead of 6)

#### Image Highlight
- Larger title: `text-sm` → `text-base`
- Larger description: `text-xs` → `text-sm`
- Better CTA button styling

## Implementation Plan

### Phase 1: Structure Changes
1. ✅ Update mega menu container width to `min-w-[900px]`
2. ✅ Change positioning to centered (left: 50%, translateX)
3. ✅ Add max-width constraint (1200px)

### Phase 2: Grid Redesign
1. ✅ Update grid to 5 columns: `grid-cols-[2.5fr_1fr_1fr_1fr_2fr]`
2. ✅ Separate Info and Image into distinct columns
3. ✅ Adjust gap spacing if needed

### Phase 3: Image Enhancement
1. ✅ Increase image height to `h-48` (192px)
2. ✅ Set aspect ratio to `aspect-[4/3]`
3. ✅ Update image card padding/styling
4. ✅ Ensure images are optimized (WebP format)

### Phase 4: Typography & Spacing
1. ✅ Increase collection link font sizes
2. ✅ Improve line heights and spacing
3. ✅ Update heading sizes for better hierarchy

### Phase 5: Testing
1. ✅ Test on various screen sizes (1024px, 1280px, 1440px, 1920px)
2. ✅ Verify image loading and quality
3. ✅ Test hover states and transitions
4. ✅ Ensure accessibility (keyboard navigation, ARIA)

## Recommended Approach

**Start with Option A (Larger Highlight Card)** because:
- Minimal code changes
- Maintains current 4-column structure (just adjusts proportions)
- Doubles image size from 96px → 192px
- Easy to implement and test
- Can iterate to Option B if needed

### Final Specifications (Option A)

```css
/* Mega Menu Container */
.mega-menu {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(100% + 0.5rem);
  width: 90vw;
  max-width: 1200px;
  min-width: 900px;
}

/* Grid Layout */
.mega-grid {
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1fr 2fr;
  gap: 2.5rem;
}

/* Image Highlight */
.highlight-card img {
  height: 192px; /* was 96px */
  aspect-ratio: 4/3;
  object-fit: cover;
}
```

## Open Questions

1. **Should mega menu span full viewport width or stay constrained?**
   - Recommendation: Constrained to max-width: 1200px for better readability

2. **Which image aspect ratio works best for wallpaper preview?**
   - Recommendation: 4:3 (landscape) shows room ambiente best

3. **Should we add hover effects to the image?**
   - Recommendation: Yes, subtle zoom on hover (scale: 1.05)

4. **Dynamic image per line (Diseño, Personalizados, etc)?**
   - Recommendation: Yes, each line should show relevant preview image

5. **Should image link to specific collection or general catalog?**
   - Recommendation: Link to featured collection for that line

## Next Steps

1. User approval on approach (Option A, B, or C)
2. Implement chosen option
3. Test with real content and images
4. Iterate based on visual results
5. Document final specifications
