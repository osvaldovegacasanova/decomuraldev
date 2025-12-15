# Index Page Visual Differences - Mockup vs Current Implementation

**Last Updated:** 2025-12-12

This document lists all visual and content differences between the `index.html` mockup and the current Astro implementation at `src/pages/index.astro`.

---

## ✅ COMPLETED SECTIONS

### 1. Hero Slider ✅
- ✅ Component exists: `DecomuralHeroSlider.astro`
- ✅ Uses Excel data from `IndexheroSlides` sheet
- ✅ Swiper.js integration with navigation and pagination
- ✅ 3-column grid layout (2fr/5fr/4fr) on desktop
- ✅ Single column stack on mobile
- ✅ Background colors and text colors from data
- ✅ Sample and ambiente images displayed

### 2. Collection Showcase Sections ✅
- ✅ Component exists: `CollectionShowcaseSection.astro`
- ✅ Uses Excel data from `CollectionShowcase` sheet
- ✅ 4 sections (Diseños, Personalizados, Infantiles, Vinílicos)
- ✅ 3 cards per section (12 total)
- ✅ Responsive grid (1-3 columns)
- ✅ 1:1 aspect ratio images
- ✅ AOS animations

---

## 🔴 PENDING VISUAL FIXES

### 1. Announcement Banner ❌ MISSING
**Mockup:**
```html
<div class="announcement">
  Disfruta de descuentos exclusivos de hasta el 30% en papeles murales seleccionados.
</div>
```
- Font: Poppins, 0.85rem, uppercase, letter-spacing: 0.08em
- Style: Full-width charcoal strip, centered text
- Padding: 0.65rem vertical, 1rem horizontal

**Current:** Not implemented

**Tasks:**
- [ ] Create AnnouncementBanner.astro component
- [ ] Read text from Excel `site` sheet
- [ ] Add to Base.astro layout before header
- [ ] Style with charcoal background (#2c2c2c or similar)
- [ ] Make it dismissible (optional)

---

### 2. FAQ Section ⚠️ NEEDS CONTENT UPDATE

**Mockup Content:**
1. ¿Qué es un mural bespoke?
2. ¿Puedo pedir una muestra?
3. ¿Cómo debo medir mi pared?
4. ¿En qué estancias puedo usar un mural?

**Current Content (in English):**
1. How secure is my financial data on your platform?
2. Do you offer phone support?
3. Can I use my own domain?
4. Do you offer a discount for annual plans?
5. Can I change my password?
6. Do you offer a free plan?

**Mockup Layout:**
- Header: Eyebrow "Preguntas frecuentes", Title "Todo sobre nuestros murales a medida"
- Lede: "Inspirado en la sección FAQ del sitio original, este bloque agrupa las dudas más comunes..."
- Grid: 4 items in responsive auto-fit grid (min 260px)
- First item open by default (aria-expanded="true")

**Current Layout:**
- Header: "FAQS", "Still Have A Question?"
- Button: "See All FAQs" link to /faqs
- Accordion component with React

**Tasks:**
- [ ] Update `src/content/faqs/-index.md` with Spanish content from mockup
- [ ] Change header text to Spanish: "Preguntas frecuentes" / "Todo sobre nuestros murales a medida"
- [ ] Add lede paragraph
- [ ] Remove "See All FAQs" button (not in mockup)
- [ ] Verify first item opens by default
- [ ] Adjust grid layout to match mockup (4 items in auto-fit columns)

---

### 3. Header/Mega Menu ⚠️ STYLE DIFFERENCES

**Mockup Specifications:**
- Logo height: 32px
- Primary nav font: Poppins, 0.9rem, uppercase, letter-spacing: 0.08em
- Mega menu font: Poppins, 0.72rem, uppercase, letter-spacing: 0.12em
- Mega menu heading: 0.7rem
- Color swatches: 0.35rem circles with color classes
- Mega menu highlight card: 140px image height, rounded corners (1rem)

**Current Implementation:**
- DecomuralHeader.astro exists with mega menu
- Using similar structure but may have different font sizes
- Color dots are static in menu.json without actual color classes

**Tasks:**
- [ ] Verify logo height is 32px (currently may be different)
- [ ] Audit font sizes against mockup specifications
- [ ] Add actual CSS color classes for color dots (.dot.black, .dot.blue, etc.)
- [ ] Verify mega menu column widths match mockup grid
- [ ] Ensure highlight card image is 140px tall
- [ ] Mobile: Verify mega menu is completely hidden at ≤768px

---

### 4. Collection Showcase Cards ⚠️ MINOR STYLE DIFFERENCES

**Mockup Specifications:**
- Card eyebrow: Playfair Display italic (serif accent)
- Card title: Poppins uppercase, clamp(1.4rem, 3vw, 2rem)
- Media aspect ratio: 1 / 1.05 (slightly taller than square)
- Border radius: 0.85rem on media
- Grid: repeat(auto-fit, minmax(320px, 1fr)) with gap: 2.5rem
- CTA: Text link style (underlined link, not button)

**Current Implementation:**
- Using CollectionCard.astro component
- May have different aspect ratio or border radius
- Eyebrow may not be using Playfair Display italic

**Tasks:**
- [ ] Verify eyebrow uses Playfair Display italic font
- [ ] Ensure title uses clamp(1.4rem, 3vw, 2rem)
- [ ] Check aspect ratio is exactly 1/1.05 (not 1/1)
- [ ] Verify border-radius: 0.85rem on images
- [ ] Ensure grid uses minmax(320px, 1fr) with 2.5rem gap
- [ ] Change CTA from button to text-link style (if currently button)

---

### 5. Hero Slider ⚠️ MINOR STYLE DIFFERENCES

**Mockup Specifications:**
- Height: Fixed 550px on desktop
- Grid columns: 2fr / 5fr / 4fr
- Mobile breakpoint: 900px (not 768px)
- Title: clamp(2rem, 5vw, 3rem) uppercase, letter-spacing: 0.2em
- CTA button: .ghost class, uppercase, 0.75rem
- Side panel images: border-radius: 0.75rem
- Dots: 32px × 4px rounded pills

**Current Implementation:**
- DecomuralHeroSlider.astro exists
- May have different breakpoint or sizing

**Tasks:**
- [ ] Verify slider height is 550px (not auto)
- [ ] Confirm grid is exactly 2fr / 5fr / 4fr
- [ ] Check mobile breakpoint is 900px, not 768px
- [ ] Verify title uses clamp(2rem, 5vw, 3rem) with 0.2em letter-spacing
- [ ] Ensure border-radius on panel images is 0.75rem
- [ ] Verify pagination dots are 32px × 4px pills (not circles)

---

### 6. Footer ⚠️ CONTENT NOT CUSTOMIZED

**Mockup Content:**
- Columns: "Atención", "Empresa", "Inspiración"
- Newsletter: "Newsletter", "Novedades exclusivas"
- Social: Ig, Pi, Fb, Yt (as circular buttons)
- Payments: Visa, Mastercard, PayPal, Amex labels

**Current Implementation:**
- Using template's default footer
- May have different column titles or links
- English content instead of Spanish

**Tasks:**
- [ ] Update footer column titles to Spanish: "Atención", "Empresa", "Inspiración"
- [ ] Update links to match mockup (Envíos y devoluciones, Estado de mi pedido, etc.)
- [ ] Change newsletter heading to "Novedades exclusivas"
- [ ] Verify newsletter form has placeholder "tu@email.com"
- [ ] Add legal note: "Al suscribirte aceptas nuestras políticas de privacidad"
- [ ] Update social links to show Ig/Pi/Fb/Yt as 36px circles
- [ ] Add payment method labels: Visa, Mastercard, PayPal, Amex
- [ ] Copyright: "© 2025 Decomural. Todos los derechos reservados."

---

### 7. Typography/Fonts ⚠️ NEEDS VERIFICATION

**Mockup Fonts:**
- Primary: Poppins (body, nav, buttons, labels)
- Serif accent: Playfair Display (hero titles, FAQ title, showcase eyebrow/title)

**Current Implementation:**
- Base.astro loads fonts from theme.json
- theme.json should specify Poppins as primary
- Playfair Display may not be loaded or used

**Tasks:**
- [ ] Verify theme.json has Poppins as font_family.primary
- [ ] Add Playfair Display as font_family.secondary (if not exists)
- [ ] Update CSS to use Playfair Display for:
  - Hero slider titles
  - FAQ section title
  - Collection showcase card eyebrows
- [ ] Ensure letter-spacing and text-transform match mockup

---

### 8. Call To Action Section ⚠️ NOT IN MOCKUP

**Current:** CallToAction component is included in index.astro

**Mockup:** No CTA section between collection showcases and FAQ

**Tasks:**
- [ ] DECISION NEEDED: Keep or remove CallToAction component?
  - If keep: Update content to Spanish
  - If remove: Delete line from index.astro
- Recommendation: REMOVE - not in mockup specification

---

## 📊 SUMMARY

### High Priority (Visual Blockers)
1. **Announcement Banner** - Completely missing
2. **FAQ Content** - Wrong content (English financial questions vs Spanish wallpaper questions)
3. **Footer Content** - Template defaults instead of Decomural content

### Medium Priority (Style Polish)
4. **Mega Menu Color Dots** - Need actual CSS color classes
5. **Collection Card Eyebrows** - Need Playfair Display italic
6. **Hero Slider Sizing** - Verify 550px height and exact grid proportions

### Low Priority (Fine-tuning)
7. **Typography Audit** - Verify all font sizes match mockup specs
8. **Mobile Breakpoints** - Ensure 900px for slider, 768px for mega menu
9. **Border Radius** - Verify 0.75rem (slider), 0.85rem (cards)

---

## ESTIMATED EFFORT

- **Announcement Banner**: 30 min (create component + Excel integration)
- **FAQ Content Update**: 15 min (update markdown file)
- **FAQ Layout Adjustments**: 30 min (remove button, add lede, Spanish text)
- **Footer Customization**: 45 min (update all sections with Spanish content)
- **Mega Menu Color Dots**: 30 min (add CSS classes)
- **Typography Audit**: 1 hour (verify/adjust all font sizes)
- **Collection Card Styling**: 30 min (eyebrow font, aspect ratio)
- **Hero Slider Fine-tuning**: 30 min (height, grid, breakpoints)

**TOTAL ESTIMATED TIME: ~4-5 hours**

---

## NEXT STEPS

1. Start with high-priority items (Announcement Banner, FAQ, Footer)
2. Move to medium-priority style polish
3. Final typography audit and fine-tuning
4. Cross-browser testing
5. Mobile responsiveness verification
