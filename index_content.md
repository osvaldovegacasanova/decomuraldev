# index.html Content Registry

Every section of `index.html` is documented below. Each block represents one element inside the segment, capturing the visible text, the typography used (per `styles.css`), its responsive sizing (desktop + mobile), and its semantic/SEO tag.

## Global Typography Notes

- **Body font**: `Poppins`, fallback `'Helvetica Neue', Arial, sans-serif` (base 16px). Used for most text, navigation, buttons, and labels. Letter spacing and uppercase styling are applied via CSS utilities.
- **Serif accent**: `Playfair Display`, fallback `Times New Roman`, serif. Used for prominent headings (hero, FAQ title, showcase eyebrow/title).

## Encoding Guidelines

- Save `index.html` as UTF-8 (no BOM). On Windows shells, run `chcp 65001` before using `Get-Content`/`cat` to prevent mojibake.
- When pasting Spanish copy, keep accents/ñ/ú literal; avoid text that was double-encoded (e.g., `Ã±`, `Colecci?n`). If corruption appears, re-decode with `latin1` and re-encode to UTF-8 before committing.
- Maintain these registry files (`index_content.md`, `catalogo_content.md`) in UTF-8 so documented text mirrors the HTML without corrupted characters.

---

## Segment: Announcement Banner

Element: Banner Copy  
- Text: Disfruta de descuentos exclusivos de hasta el 30% en papeles murales seleccionados.  
- Font & Size: `Poppins`, `0.85rem`, uppercase, `letter-spacing: 0.08em`, centered on a charcoal strip.  
- Desktop Size: Full-width bar pinned to the top of the viewport with `0.65rem` vertical padding and `1rem` horizontal padding; text remains on a single line on wide screens.  
- Mobile Size: Still full width with the same padding; copy wraps to two lines when space is constrained but line height remains `1.4`.  
- SEO Tag: `<div class="announcement">` (no heading level).

---

## Segment: Header & Mega Menu

Element: Logo  
- Text: `alt="Decomural"` image (`Logo-Decomural-02-1024x193.webp`).  
- Font & Size: N/A (image).  
- Desktop Size: Image fixed to `32px` height, auto width; sits to the left inside `.site-header` which is `display:flex` with `gap:1rem` and `padding: 1.25rem clamp(1rem, 5vw, 4rem)`.  
- Mobile Size: `.logo` becomes `flex: 1 1 100%`, so the image spans a full-width row while keeping the same `32px` height.  
- SEO Tag: `<img>` within `<header>`.

Element: Primary Navigation Links  
- Text: `Diseños`, `Personalizados`, `Infantiles` (activo), `Vinílicos`, `Cortinas y Persianas`, `Blog`, `Puntos de Venta`.  
- Font & Size: `Poppins`, `0.9rem`, uppercase, `letter-spacing: 0.08em`.  
- Desktop Size: `.primary-nav ul` is a flex row with `gap: 1.5rem`, centered and separated by a top border; the group shares the row with the logo.  
- Mobile Size: Below `768px` the list wraps with `gap: 1rem`, aligns left, and consumes the full width beneath the logo.  
- SEO Tag: `<nav class="primary-nav">` `<a>` items.

Element: Mega Menu Interactions  
- Text: Interactive behavior controlled via `data-mega` attributes; collections per link:  
  - `Diseños`: `Van Gogh II`, `Textum`, `Smart Surfaces`, `Elements`, `Drawn into Nature`, `Mia + Paul`, `Stories of Life`, `Rafias`.  
  - `Personalizados`: `Anna D'Andrea`.  
  - `Infantiles`: `Doodleedo`, `Happy`, `Smalltalk`.  
  - `Vinílicos`: `Folia`, `Muravinil`, `Muraltec`, `Duplex`.  
- Font & Size: List items `Poppins` `0.72rem`, uppercase, `letter-spacing: 0.12em`; heading `Colección` at `0.7rem`.  
- Desktop Size: `.mega-menu` is absolutely positioned from `left:-1rem` to `right:-1rem`, padded `2rem`, and spans the nav width with a max depth of ~`420px`; transitions in/out on hover/focus.  
- Mobile Size: Media query hides `.mega-menu` entirely (`display:none`) so touch devices only show the primary nav links.  
- SEO Tag: `<ul class="mega-list" data-collection-list>` rendered via JS.

Element: Mega Menu Color Column  
- Text: Swatch list `Negro`, `Azul`, `Marrón`, `Verde`, `Gris`, `Neutro`, `Rosa`, `Púrpura`, `Rojo`, `Blanco`, `Amarillo`.  
- Font & Size: `Poppins` `0.72rem`; swatch dots `0.35rem` circles.  
- Desktop Size: Column width follows the `minmax(140px, 1fr)` grid; swatches stack vertically with `0.35rem` gaps.  
- Mobile Size: Column hidden with the entire mega menu at `≤768px`.  
- SEO Tag: `<ul class="mega-list swatches">`.

Element: Mega Menu Info Column  
- Text: List items `Guía paso a paso` y `FAQs`.  
- Font & Size: `Poppins` `0.72rem`, uppercase, `letter-spacing: 0.12em`; heading `Información` at `0.7rem`.  
- Desktop Size: Shares the same column width as other lists within the dropdown grid, leaving extra breathing room now that Habitación/Diseñador options were removed.  
- Mobile Size: Hidden with the rest of the mega menu under `768px`.  
- SEO Tag: `<ul class="mega-list">`.

Element: Mega Menu Highlight Card  
- Text: Heading `Mural destacado`, body `Descubre el mural del año y dale vida a tu espacio infantil.`, CTA `Shop now`.  
- Font & Size: `Poppins` `0.8rem` body; button `.ghost.small` at `0.65rem`.  
- Desktop Size: `.mega-col.highlight` spans two grid rows, `border-radius:1rem`, contains a `140px`-tall image and CTA button; occupies roughly 1/4 of the dropdown width on large screens.  
- Mobile Size: Hidden with the rest of the mega menu under `768px`.  
- SEO Tag: `<div class="mega-col highlight">`.

---

## Segment: Hero Slider

Element: Slide 1 Copy  
- Text: Eyebrow `Colección infantil`, Title `Stories of Life`, Description `Murales envolventes con nubes etéreas y fauna ilustrada.`, CTA `Explorar Stories of Life`.  
- Font & Size: Eyebrow `Poppins` small caps; Title `Poppins` `clamp(2rem, 5vw, 3rem)` uppercase with `0.2em` letter spacing; CTA `.ghost` button uppercase `0.75rem`.  
- Desktop Size: Swiper container height fixed to `550px`, slide grid columns `2fr / 5fr / 4fr`; side panels hold square images with `border-radius:0.75rem`.  
- Mobile Size: Below `900px` the slide collapses into a single column stack, height becomes auto, and the CTA remains centered.  
- SEO Tag: `<section id="slider">` with slide content inside `<h2>` and `<p>` elements.

Element: Slide 2 Copy  
- Text: Eyebrow `Texturas naturales`, Title `Elements II`, Description `Elementos naturales para un living contemporáneo.`, CTA `Explorar Elements II`.  
- Font & Size: Matches slide 1.  
- Desktop Size: Same `550px` height and 3-column grid, background `#10261d`.  
- Mobile Size: Same single-column behavior with stacked images.  
- SEO Tag: Same slider markup.

Element: Slider Controls  
- Text: Buttons show Swiper chevrons plus dot indicators.  
- Font & Size: Buttons use Swiper icon font within `42px` circles; dots are `32px × 4px` rounded pills.  
- Desktop Size: Controls are absolutely centered vertically at the slide edges; pagination dots sit centered `1rem` from the bottom.  
- Mobile Size: Arrows hidden under `900px`; dots remain centered with equal spacing for touch navigation.  
- SEO Tag: `<button class="slider-control">`, `<div class="swiper-pagination">`.

---

## Segment: Collection Showcase – Línea Diseños

Element: Section Heading  
- Text: Eyebrow `Línea`, Title `Diseños`.  
- Font & Size: Eyebrow `Poppins` uppercase small caps; H2 `Poppins` uppercase with `letter-spacing: 0.08em`.  
- Desktop Size: Centered block above the cards with `margin-bottom: 2rem`, constrained within the main `1180px` content width.  
- Mobile Size: Same typography, but spacing above/below tightens as the section stacks vertically.  
- SEO Tag: `<h2>`.

Element: Card 1  
- Text: Eyebrow `Marca I`, Title `Textum`, Description `Intricate detailing brings the vibrant cityscape of Stories of Life to life — resulting in una pieza que cautiva los sentidos.`, CTA `Explorar Textum`.  
- Font & Size: Eyebrow uses `Playfair Display` italic; Title `Poppins` uppercase `clamp(1.4rem, 3vw, 2rem)`; body `Poppins` default.  
- Desktop Size: Cards sit in a grid `repeat(auto-fit, minmax(320px, 1fr))` with `gap:2.5rem`; media area has `aspect-ratio: 1 / 1.05` (~`320px` square) and `border-radius:0.85rem`.  
- Mobile Size: Grid collapses to a single column occupying the full width; card spacing remains `2.5rem` vertically.  
- SEO Tag: `<article>` with `<h3>` + `<a>`.

Element: Card 2  
- Text: Eyebrow `Marca II`, Title `Rafias`, Description `Nuestra serie Elements II aporta textura mineral y acabados mates de alto desempeño, perfectos para livings contemporáneos.`, CTA `Explorar Rafias`.  
- Font & Size: Same as card 1.  
- Desktop Size: Same responsive card sizing and aspect ratio.  
- Mobile Size: Single-column stack identical to other cards.  
- SEO Tag: `<article>`.

Element: Card 3  
- Text: Eyebrow `Marca I`, Title `Mia + Paul`, Description `La colección Drawn into Nature envuelve los ventanales con vegetación botánica y tonos borgoña sofisticados.`, CTA `Explorar Mia + Paul`.  
- Font & Size: Same as card 1.  
- Desktop Size: Shares the same grid cell width and ~`1:1` media frame.  
- Mobile Size: Full-width stacked card.  
- SEO Tag: `<article>`.

---

## Segment: Collection Showcase – Línea Personalizados

Element: Section Heading  
- Text: Eyebrow `Línea`, Title `Personalizados`.  
- Font & Size: Matches Línea Diseños heading.  
- Desktop Size: Centered heading above the auto-fit grid.  
- Mobile Size: Same text but spacing compresses to keep hierarchy readable on small screens.  
- SEO Tag: `<h2>`.

Element: Card 1  
- Text: Eyebrow `Anima Deco`, Title `Antique`, Description `Paneles hechos a medida con arenas y grafitos que combinan con mobiliario mid-century.`, CTA `Explorar Antique`.  
- Font & Size: `Playfair Display` eyebrow, `Poppins` uppercase title.  
- Desktop Size: Shares the same showcase grid (min `320px`, `gap:2.5rem`, square imagery).  
- Mobile Size: Single-column, media keeps the `aspect-ratio:1/1.05`.  
- SEO Tag: `<article>`.

Element: Card 2  
- Text: Eyebrow `Anima Deco`, Title `Aves`, Description `Llevamos obras maestras a gran formato para comedores o livings con asesoría uno a uno.`, CTA `Explorar Aves`.  
- Font & Size: Same as card 1.  
- Desktop Size: Same responsive dimensions.  
- Mobile Size: Single-column layout.  
- SEO Tag: `<article>`.

Element: Card 3  
- Text: Eyebrow `Anima Deco`, Title `Botanical`, Description `Paisajes botánicos sobre pedido que coordinamos con textiles y pinturas exclusivas.`, CTA `Explorar Botanical`.  
- Font & Size: Same as card 1.  
- Desktop Size: Same card footprint.  
- Mobile Size: Full-width stacked.  
- SEO Tag: `<article>`.

---

## Segment: Collection Showcase – Línea Infantiles

Element: Section Heading  
- Text: Eyebrow `Línea`, Title `Infantiles`.  
- Font & Size: Same heading styling.  
- Desktop Size: Centered text preceding the grid, spaced by `2rem`.  
- Mobile Size: Maintains typography but sits closer to the cards to save vertical space.  
- SEO Tag: `<h2>`.

Element: Card 1  
- Text: Eyebrow `Marca I`, Title `Doodleedo`, Description `Stories of Life crea atmósferas suaves con cielos nebulosos y constelaciones.`, CTA `Explorar Doodleedo`.  
- Font & Size: `Playfair Display` eyebrow, `Poppins` title.  
- Desktop Size: Same `minmax(320px, 1fr)` grid cells with ~square imagery.  
- Mobile Size: Single-column stack with consistent padding.  
- SEO Tag: `<article>`.

Element: Card 2  
- Text: Eyebrow `Marca II`, Title `Happy`, Description `Ilustraciones en acuarela con animales soñados para habitaciones de juego.`, CTA `Explorar Happy`.  
- Font & Size: Same as card 1.  
- Desktop Size: Same card footprint.  
- Mobile Size: Full-width stack.  
- SEO Tag: `<article>`.

Element: Card 3  
- Text: Eyebrow `Marca III`, Title `Smalltalk`, Description `Murales envolventes con lunas brillantes y follaje que invitan al descanso.`, CTA `Explorar Smalltalk`.  
- Font & Size: Same as card 1.  
- Desktop Size: Same card footprint.  
- Mobile Size: Full-width stack.  
- SEO Tag: `<article>`.

---

## Segment: Collection Showcase – Línea Vinílicos

Element: Section Heading  
- Text: Eyebrow `Línea`, Title `Vinílicos`.  
- Font & Size: Same heading styling.  
- Desktop Size: Centered heading with `2rem` bottom margin above grid.  
- Mobile Size: Sits flush with the stacked cards, using the same fonts.  
- SEO Tag: `<h2>`.

Element: Card 1  
- Text: Eyebrow `Marca I`, Title `Muravinil`, Description `Vinilos texturizados pensados para alto tráfico con acabado mate premium.`, CTA `Explorar Muravinil`.  
- Font & Size: `Playfair Display` eyebrow, `Poppins` title.  
- Desktop Size: Same responsive showcase grid (≈`320px` square media).  
- Mobile Size: Full-width stack with preserved aspect ratio.  
- SEO Tag: `<article>`.

Element: Card 2  
- Text: Eyebrow `Marca II`, Title `Folia`, Description `Paneles lavables con follajes exuberantes ideales para cocinas y pasillos.`, CTA `Explorar Folia`.  
- Font & Size: Same as card 1.  
- Desktop Size: Same grid cell dimensions.  
- Mobile Size: Single-column card.  
- SEO Tag: `<article>`.

Element: Card 3  
- Text: Eyebrow `Marca III`, Title `Muraltec`, Description `Vinilos que imitan fibras tejidas para estudios o terrazas techadas.`, CTA `Explorar Muraltec`.  
- Font & Size: Same as card 1.  
- Desktop Size: Same grid cell dimensions.  
- Mobile Size: Single-column card.  
- SEO Tag: `<article>`.

---

## Segment: FAQ

Element: Section Heading  
- Text: Eyebrow `Preguntas frecuentes`, Title `Todo sobre nuestros murales a medida`, Lede `Inspirado en la sección FAQ...`.  
- Font & Size: Eyebrow `Poppins` uppercase; Title `Playfair Display` uppercase; lede `Poppins` body.  
- Desktop Size: Header capped at `max-width: 640px` with `margin-bottom: 2rem` inside a padded `.faq` card (`padding:3rem`).  
- Mobile Size: Same copy centered within the stacked layout; padding reduces visually because the card spans edge-to-edge but still uses `3rem` minus responsive container gutters.  
- SEO Tag: `<h2>` for title, `<p>` for eyebrow/lede.

Element: Question 1  
- Text: Question `¿Qué es un mural bespoke?` and answer `Trabajamos con una imagen completa en lugar de un patrón repetido, imprimiéndola según las medidas exactas de tu muro para lograr un acabado artesanal.`  
- Font & Size: Button `.faq-trigger` `Poppins` `0.9rem` uppercase; answer uses body font.  
- Desktop Size: `.faq-grid` uses `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`, so each card is ~`260-360px` wide with `1.25rem` padding.  
- Mobile Size: Grid collapses to a single column where each item spans full width with the same padding.  
- SEO Tag: `<button>` + `<div class="faq-body">`.

Element: Question 2  
- Text: Question `¿Puedo pedir una muestra?` and answer `Ofrecemos packs de muestra con las cuatro terminaciones disponibles. Así puedes evaluar textura y color antes de confirmar tu pedido definitivo.`  
- Font & Size: Same as question 1.  
- Desktop Size: Same card size as other entries.  
- Mobile Size: Full-width stack.  
- SEO Tag: `<article class="faq-item">` with button/body.

Element: Question 3  
- Text: Question `¿Cómo debo medir mi pared?` and answer `Mide la altura y el ancho en varios puntos y comparte siempre la lectura mayor. De esta forma garantizamos que el mural cubra por completo el espacio.`  
- Font & Size: Same as question 1.  
- Desktop Size: Same grid footprint.  
- Mobile Size: Full-width stack.  
- SEO Tag: `<article>`.

Element: Question 4  
- Text: Question `¿En qué estancias puedo usar un mural?` and answer `Nuestras bases resistentes permiten instalarlo en dormitorios, salas, estudios e incluso baños ventilados, siempre evitando el contacto directo con el agua.`  
- Font & Size: Same as question 1.  
- Desktop Size: Same grid footprint.  
- Mobile Size: Full-width stack.  
- SEO Tag: `<article>`.

---

## Segment: Footer

Element: Column “Atención”  
- Text: Links `Envíos y devoluciones`, `Estado de mi pedido`, `Guía de instalación`.  
- Font & Size: Heading `Poppins` `0.85rem` uppercase; links `Poppins` `0.9rem`.  
- Desktop Size: Part of a responsive grid `repeat(auto-fit, minmax(180px, 1fr))` with `gap:2rem`; lists align to the top of the footer column.  
- Mobile Size: Columns stack in two or three rows depending on width, each still min `180px`.  
- SEO Tag: `<h3>` + `<ul>`.

Element: Column “Empresa”  
- Text: `Nuestra historia`, `Sustentabilidad`, `Prensa`.  
- Font & Size: Same as Column “Atención”.  
- Desktop Size: Shares the auto-fit grid cell.  
- Mobile Size: Stacked column with the same padding.  
- SEO Tag: `<h3>` + `<ul>`.

Element: Column “Inspiración”  
- Text: `Blog Deco`, `Catálogo digital`, `Colecciones 2025`.  
- Font & Size: Same as other columns.  
- Desktop Size: Shares the auto-fit grid cell.  
- Mobile Size: Stacked column.  
- SEO Tag: `<h3>` + `<ul>`.

Element: Newsletter Block  
- Text: Eyebrow `Newsletter`, Title `Novedades exclusivas`, body paragraph, input placeholder `tu@email.com`, button `Suscribirme`, legal note `Al suscribirte aceptas nuestras políticas de privacidad.`  
- Font & Size: Titles follow heading rules; button uppercase `0.75rem`.  
- Desktop Size: Spans roughly two grid columns due to intrinsic width; form is a flex row with the input (`flex:1 1 220px`) and button hugging the right side.  
- Mobile Size: Form stacks because `flex-wrap: wrap`, so input and button sit on separate rows while preserving rounded pills.  
- SEO Tag: `<form>` + `<p>` elements.

Element: Footer Bottom  
- Text: Social tags `Ig`, `Pi`, `Fb`, `Yt`; copyright `© 2025 Decomural...`; payment list `Visa`, `Mastercard`, `PayPal`, `Amex`.  
- Font & Size: Social buttons `36px` circles; text and payment labels `Poppins` `0.75rem`.  
- Desktop Size: Flex row `justify-content: space-between` with `gap:1rem`.  
- Mobile Size: Media query stacks the row so items align left and wrap naturally.  
- SEO Tag: `<div class="footer-bottom">` contents.

---

## Dynamic Copy Notes

Element: Hero Slider Slides  
- Text: Managed through the `heroSlides` array in the inline `<script>`. Any text change must be mirrored both in the script and in this registry.  
- SEO Tag: `<section id="slider">` child slides.  

This markdown should be refreshed whenever new segments, visual changes, or textual tweaks are introduced.
