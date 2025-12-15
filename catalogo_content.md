# catalogo.html Content Registry

Every section of `catalogo.html` is documented below. Each block represents one element inside the segment, capturing the visible text, the typography used (per `styles.css`), its responsive sizing (desktop + mobile), and its semantic/SEO tag.

## Global Typography Notes

- **Body font**: `Poppins`, fallback `'Helvetica Neue', Arial, sans-serif` (base 16px). Used for navigation, hero copy, filters, product cards, pagination, FAQ text, and footer links. Uppercase treatments and letter spacing come from CSS utilities.
- **Serif accent**: `Playfair Display`, fallback `Times New Roman`, serif. Reserved for large headings such as the hero `h1` if needed (current hero uses Poppins) and can appear in future editorial blocks.

## Encoding Guidelines

- Save `catalogo.html` as UTF-8 (no BOM). In Windows Terminal/PowerShell run `chcp 65001` before piping file contents to avoid mojibake.
- When pasting Spanish copy, ensure accents/ñ/ú stay literal; do not paste text that was already decoded as CP1252. If you see sequences like `Ã±` or `?` inside words, re-decode with `latin1` then re-encode to UTF-8 before saving.
- Keep content registries (`catalogo_content.md`, `index_content.md`) in UTF-8 as well so headings/descriptions mirror the live HTML without corrupted characters.

---

## Segment: Announcement Banner

Element: Banner Copy  
- Text: `Disfruta de descuentos exclusivos de hasta el 30% en papeles murales seleccionados.`  
- Font & Size: `Poppins`, `0.85rem`, uppercase, `letter-spacing: 0.08em`.  
- Desktop Size: Full-width strip at the very top with `0.65rem × 1rem` padding, background `#4a5952`.  
- Mobile Size: Same padding; copy wraps to two lines with the same line height when viewport is narrow.  
- SEO Tag: `<div class="announcement">`.

---

## Segment: Header & Mega Menu

Element: Logo  
- Text: `alt="Decomural"` image (`Logo-Decomural-02-1024x193.webp`).  
- Font & Size: N/A (image).  
- Desktop Size: Image is `32px` tall, sits at the left of `.site-header` (`display:flex`; padding `1.25rem clamp(1rem, 5vw, 4rem)`).  
- Mobile Size: `.logo` flexes to 100% width on wrap so the brand sits above the nav pills while keeping the same height.  
- SEO Tag: `<img>` within `<header>`.

Element: Primary Navigation Links  
- Text: `Diseños`, `Personalizados`, `Infantiles` (active), `Vinílicos`, `Cortinas y Persianas`, `Blog`, `Puntos de Venta`.  
- Font & Size: `Poppins`, `0.9rem`, uppercase, `letter-spacing: 0.08em`.  
- Desktop Size: `.primary-nav ul` is a centered flex row with `gap:1.5rem` and a translucent top border.  
- Mobile Size: Below `768px` the list wraps with `gap:1rem` and aligns left underneath the logo.  
- SEO Tag: `<nav class="primary-nav">` `<a>` nodes.

Element: Mega Menu Columns  
- Text & Lists:  
  - `Colección`: `Van Gogh II`, `Textum`, `Smart Surfaces`, `Elements`, `Drawn into Nature`, `Mia + Paul`, `Stories of Life`, `Rafias`.  
  - `Color`: swatch list `Negro`, `Azul`, `Marrón`, `Verde`, `Gris`, `Neutro`, `Rosa`, `Púrpura`, `Rojo`, `Blanco`, `Amarillo`.  
  - `Patrón`: `Abstract`, `Animal`, `Floral`, `Geométrico`, `Landscape`, `Tropical`.  
  - `Información`: `Guía paso a paso`, `FAQs`.  
- Font & Size: Headings `Poppins` `0.7rem`, uppercase with `0.2em` letter spacing; list items `Poppins` `0.72rem`, uppercase `letter-spacing:0.12em`. Swatch dots are `0.35rem` circles.  
- Desktop Size: `.mega-menu` spans the nav width, positioned absolutely (`left:-1rem`, `right:-1rem`) with `2rem` padding and grid `repeat(auto-fit, minmax(140px, 1fr))`. Appears on hover/focus with drop shadow and rounded bottom corners.  
- Mobile Size: Entire mega menu hidden at `=768px`, so links work without dropdown.  
- SEO Tag: `<ul class="mega-list">` blocks within `.mega-columns`.

Element: Mega Menu Highlight Card  
- Text: Image + heading `Mural destacado`, body `Descubre el mural del año y dale vida a tu espacio infantil.`, CTA button `Shop now`.  
- Font & Size: Body `Poppins` `0.8rem`; button `.ghost.small` `0.65rem`.  
- Desktop Size: `.mega-col.highlight` spans two grid rows, includes a `140px`-tall image and button, `border-radius:1rem`.  
- Mobile Size: Hidden with the rest of the mega menu under `768px`.  
- SEO Tag: `<div class="mega-col highlight">`.
---

## Segment: Breadcrumbs

Element: Trail  
- Text: `Home – Diseños – Stories of Life`.  
- Font & Size: `Poppins` `0.75rem`, uppercase, `letter-spacing:0.2em`.  
- Desktop Size: Inline flex row with small gap, placed near the top of `<main>`.  
- Mobile Size: Wraps as needed but maintains uppercase tracking.  
- SEO Tag: `<div class="breadcrumbs">` with `<a>` + `<span>` separators.

---

## Segment: Hero Intro

Element: Eyebrow  
- Text: `Diseños`.  
- Font & Size: `Poppins` `0.75rem`, uppercase, `letter-spacing:0.4em`.  
- Desktop Size: Positioned above the main hero heading with generous top/bottom margin.  
- Mobile Size: Same sizing; spacing tightens slightly due to column width.  
- SEO Tag: `<p class="eyebrow">`.

Element: Title  
- Text: `Stories of Life`.  
- Font & Size: `Poppins` `clamp(2rem, 4vw, 3rem)`, uppercase, `letter-spacing:0.15em`.  
- Desktop Size: Inline block centered within `.hero-content`, max width around `600px`.  
- Mobile Size: Shrinks with clamp formula to fit narrow screens.  
- SEO Tag: `<h1>`.

Element: Lede Paragraph  
- Text: Short state `Desde un cielo lleno de nubes y aves hasta un jardín etéreo y encantado, nuestas Colecciones Infantiles crean un punto focal hipnotizante en cualquier habitación. Estos murales a medida están diseñados específicamente para adaptarse a tu espacio.`; expanded state `Desde un cielo lleno de nubes y aves hasta un jardín etéreo y encantado, nuestros murales infantiles azules crean un punto focal hipnotizante en cualquier habitación. Estos murales a medida están diseñados específicamente para adaptarse a tu espacio. Diseñados según tus requisitos exactos, cada mural se siente único. Desde escenas clásicas de casas de campo hasta bosques tropicales llenos de flores exuberantes, los murales azules aportan un toque de elegancia a tu decoración. Úsalos en la sala o la cocina como elemento clave de tu diseño, equilibrados con colores que armonicen con los puntos focales del mural. O crea una habitación de ensueño donde el mural azul te rodee de belleza natural. Descubre también toda nuestra colección de murales a medida.`  
- Font & Size: `Poppins` body `1rem`, line-height `1.8`.  
- Desktop Size: Max width `600px`, sits below heading with spacing.  
- Mobile Size: Full-width paragraph; line length shorter but typography consistent.  
- SEO Tag: `<p class="lede" id="hero-description">`.

Element: Toggle Button  
- Text: `Leer más` / `Leer menos`.  
- Font & Size: `.ghost` button `0.75rem`, uppercase `letter-spacing:0.2em`.  
- Desktop Size: Aligned under the lede; button width auto; triggers JS to expand hero copy.  
- Mobile Size: Full-width centered button thanks to inherent padding.  
- SEO Tag: `<button class="ghost hero-toggle">`.

---

## Segment: Filters + Result Count

Element: Result Counter  
- Text: Defaults to `Encontrados: 24 resultados` (JS updates).  
- Font & Size: `Poppins` `0.85rem`, muted color.  
- Desktop Size: Left-aligned within `.results` flex container.  
- Mobile Size: Stacks above filter pills with full-width alignment.  
- SEO Tag: `<div class="results-count" data-results-count>`.

Element: Filter Button “Color”  
- Text: `Color ▾` plus dropdown list populated via JS.  
- Font & Size: `.pill` button `Poppins` `0.75rem`; dropdown items also uppercase `0.75rem`.  
- Desktop Size: Inline pill with `gap:0.75rem`; dropdown min width `180px`.  
- Mobile Size: Pill stretches to `width:100%`; dropdown overlays below.  
- SEO Tag: `<button class="pill">` + `<ul class="filter-dropdown swatch-list" data-color-filter>`.

Element: Filter Button “Patrón”  
- Text: Static list `Abstracto`, `Floral`, `Animales`, `Texturas`, `Plano`, `Geométrico`.  
- Font & Size: `Poppins` `0.75rem`.  
- Desktop Size: Inline pill with absolute dropdown.  
- Mobile Size: Full-width pill; dropdown overlays.  
- SEO Tag: `<button>` + `<ul class="filter-dropdown">`.

Element: Filter Button “Colección”  
- Text: Placeholder `Cargando colecciones...` replaced dynamically.  
- Font & Size: `Poppins` `0.75rem`.  
- Desktop Size: Inline pill and dropdown like other filters.  
- Mobile Size: Full-width pill with stacked dropdown.  
- SEO Tag: `<ul class="filter-dropdown" data-collection-filter>`.

Element: Filter Button “Marca”  
- Text: `Marca ▾` (no dropdown content).  
- Font & Size: `Poppins` `0.75rem`.  
- Desktop Size: Inline pill finishing the row.  
- Mobile Size: Full-width pill with chevron to match others.  
- SEO Tag: `<button class="pill">`.

---

## Segment: Product Grid

Element: Product Cards  
- Text: Generated per SKU (e.g., heading `Stories of Life 369223`, rating text `SKU 369223`, `Código: 369223`).  
- Font & Size: Card heading `Poppins` `0.95rem`, uppercase `letter-spacing:0.18em`; rating `0.75rem`; metadata `0.78rem`.  
- Desktop Size: `.product-grid` uses `grid-template-columns: repeat(4, minmax(0, 1fr))` with `1.5rem` gaps; media queries reduce the columns to 3 (≤1100px), 2 (≤820px), and 1 (≤540px). Each card has rounded corners and drop shadow.  
- Mobile Size: Single-column stack retains the same padding and hover behavior degrades gracefully on touch devices.  
- SEO Tag: `<section class="product-grid" data-product-grid>` containing `<article class="product-card">`.

Element: Card Media  
- Text: Image plus badges `New` (when applicable) and `Mural`.  
- Font & Size: Badges `0.62rem` uppercase with letter-spacing `0.25em`.  
- Desktop Size: `div.card-media` enforces `aspect-ratio:1/1`, rounded corners, and hover zoom.  
- Mobile Size: Same aspect ratio; hover image swap is handled via touch listeners.  
- SEO Tag: `<div class="card-media">` + `<img>`.

Element: Card Body Meta  
- Text: Rating line (`★★★★★` or `★★★★☆` + numeric), `SKU ####`, and `Código ####`.  
- Font & Size: Body `Poppins` `1rem`; rating icons `0.85rem`; code text uppercase `0.78rem`.  
- Desktop Size: `padding:1.75rem`, `gap:0.4rem`.  
- Mobile Size: Padding unchanged for legibility.  
- SEO Tag: `<div class="card-body">`.

---

## Segment: Pagination

Element: Pagination Container  
- Text: Arrow buttons plus page numbers `1`, `2`, `3`, `4`, `5` (`5` is active).  
- Font & Size: Page links `Poppins` `0.85rem`, uppercase `letter-spacing:0.15em`; arrow icons use Unicode arrows at `1.25rem`.  
- Desktop Size: Flex row centered with `gap:1.25rem`; arrow buttons are `46px` circles.  
- Mobile Size: Media query stacks `.pagination` vertically and centers the arrows below the pages.  
- SEO Tag: `<nav class="pagination" aria-label="Paginación">`.

---

## Segment: FAQ

Element: Section Heading  
- Text: Eyebrow `Preguntas frecuentes`, Title `Todo sobre nuestros murales a medida`, Lede `Inspirado en la sección FAQ del sitio original, este bloque agrupa las dudas más comunes para que el cliente continúe su compra sin fricciones.`  
- Font & Size: Eyebrow `Poppins` uppercase; Title `Playfair Display`; lede `Poppins`.  
- Desktop Size: Header limited to `640px` inside `.faq` card with `padding:3rem` and `border-radius:1.5rem`.  
- Mobile Size: Full-width card; padding remains but edges sit closer to the viewport.  
- SEO Tag: `<div class="faq-header">`.

Element: FAQ Items  
- Text:  
  1. Question `¿Qué es un mural bespoke?` / Answer `Trabajamos con una imagen completa en lugar de un patrón repetido, imprimiéndola según las medidas exactas de tu muro para lograr un acabado artesanal.`  
  2. Question `¿Puedo pedir una muestra?` / Answer `Ofrecemos packs de muestra con las cuatro terminaciones disponibles. Así puedes evaluar textura y color antes de confirmar tu pedido definitivo.`  
  3. Question `¿Cómo debo medir mi pared?` / Answer `Mide la altura y el ancho en varios puntos y comparte siempre la lectura mayor. De esta forma garantizamos que el mural cubra por completo el espacio.`  
  4. Question `¿En qué estancias puedo usar un mural?` / Answer `Nuestras bases resistentes permiten instalarlo en dormitorios, salas, estudios e incluso baños ventilados, siempre evitando el contacto directo con el agua.`  
- Font & Size: Toggle button `0.9rem` uppercase; body `0.9rem` muted.  
- Desktop Size: `.faq-grid` auto-fit columns (`minmax(260px, 1fr)`), `1.25rem` gap; cards have inset border and `1.25rem` padding.  
- Mobile Size: Single-column stack; JS ensures only one accordion stays open.  
- SEO Tag: `<article class="faq-item">` with `<button class="faq-trigger">` and `<div class="faq-body">`.

---

## Segment: Footer

Element: Footer Columns  
- Text:  
  - `Atención`: `Envíos y devoluciones`, `Estado de mi pedido`, `Guía de instalación`.  
  - `Empresa`: `Nuestra historia`, `Sustentabilidad`, `Prensa`.  
  - `Inspiración`: `Blog Deco`, `Catálogo digital`, `Colecciones 2025`.  
- Font & Size: Headings `Poppins` `0.85rem` uppercase; links `Poppins` `0.9rem`.  
- Desktop Size: `.footer-columns` grid auto-fits `minmax(180px, 1fr)` with `gap:2rem`.  
- Mobile Size: Columns stack in multiple rows while maintaining spacing.  
- SEO Tag: `<div class="footer-column">`.

Element: Newsletter Block  
- Text: Eyebrow `Newsletter`, Title `Novedades exclusivas`, body `Suscríbete para recibir lanzamientos, colaboraciones y acceso anticipado a ofertas especiales.`, input placeholder `tu@email.com`, button `Suscribirme`, legal note `Al suscribirte aceptas nuestras políticas de privacidad.`  
- Font & Size: Eyebrow `Poppins` uppercase; body `Poppins` `0.9rem`; button `0.75rem` uppercase.  
- Desktop Size: `.footer-newsletter` spans roughly two columns; form uses flex with input `flex:1 1 220px`.  
- Mobile Size: Form wraps (input and button stack) due to `flex-wrap: wrap`.  
- SEO Tag: `<div class="footer-newsletter">` with `<form class="newsletter-form">`.

Element: Footer Bottom  
- Text: Social badges `Ig`, `Pi`, `Fb`, `Yt`; copyright `© 2025 Decomural. Todos los derechos reservados.`; payment icons `Visa`, `Mastercard`, `PayPal`, `Amex`.  
- Font & Size: Buttons `36px` circles; copy `0.75rem`.  
- Desktop Size: `display:flex`, `justify-content:space-between`, `gap:1rem`.  
- Mobile Size: Media query stacks vertically and left-aligns the content.  
- SEO Tag: `<div class="footer-bottom">`.

---

## Dynamic Copy Notes

Element: Hero Description Toggle  
- Text: Short and long hero descriptions stored in `heroCopy` JS object; `.hero-toggle` button swaps between them and updates `aria-expanded`.  
- SEO Tag: `<p id="hero-description">` updated by script.

Element: Product Grid Data  
- Text: Generated from `storiesOfLifeSkus`; entries with `disponible = 0` are excluded.  
- SEO Tag: `<section data-product-grid>` containing dynamically created `.product-card` articles.

Element: Filters  
- Text: Color dropdown uses unique `color` values; Colección dropdown uses `disenoCollections`.  
- SEO Tag: `<ul data-color-filter>` and `<ul data-collection-filter>`.

Element: Mega Menu Collections  
- Text: `<ul data-collection-list>` updates with each nav item's `data-collection` attribute on hover/focus.  
- SEO Tag: `<ul class="mega-list" data-collection-list">`.

Update this markdown whenever `catalogo.html` copy, layout, or responsive behavior changes.
