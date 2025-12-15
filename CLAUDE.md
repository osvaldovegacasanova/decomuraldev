# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Website for **Decomural**, a Chilean wallpaper/mural company. This is NOT an e-commerce site - products are displayed for in-store purchase only. No "Buy" CTAs should exist.

Built on the NextSpace Astro template, adapted for a Spanish-language wallpaper catalog site.

## Development Commands

All commands run from `nextspace-astro/`:

```bash
cd nextspace-astro
yarn dev        # Start development server
yarn build      # Production build (accepts 5-15 min builds due to ~1300 images)
yarn preview    # Preview production build
yarn check      # TypeScript/Astro type checking
yarn format     # Format code with Prettier
```

Package manager: Yarn 1.22.22

## Business Domain

### Product Hierarchy
```
Línea (Line) → Colección (Collection) → SKU (individual wallpaper)
```

**Lines (Líneas):**
- Diseños - Design wallpapers
- Personalizados - Custom/personalized wallpapers
- Infantiles - Children's wallpapers
- Vinílicos - Vinyl wallpapers

**Key Rules:**
- A collection belongs to exactly ONE line (no sharing)
- SKU codes are globally unique
- Collection names are unique across all lines
- Each collection has its own image folder

### Product Attributes
- **color**: e.g., Negro, Azul, Marrón, Verde, etc. (always has value, default="default")
- **patrón (pattern)**: Abstracto, Floral, Animales, Texturas, Plano, Geométrico
- **habitación (room)**: Room type for the wallpaper

### Image Types
- **sample** (sample=1): Product sample/swatch image
- **ambiente** (ambiente=1): Room/environment photo showing wallpaper in use
- Images displayed at 1:1 aspect ratio in catalog

## Site Pages

| Page | Description | Mockup |
|------|-------------|--------|
| **index** | Homepage with hero slider, collection showcases by line, FAQ | `index.html` exists |
| **catálogo** | SKU grid with filters (color, patrón), pagination (20/page), breadcrumbs | `catalogo.html` exists |
| **colección** | Collection landing page with description, ambiente images, CTA to catalog | Pending |
| **puntos de venta** | Store locations with cards and Google Maps | Pending (adapt from /about) |
| **blog** | Use existing nextspace-astro blog | Existing |

### Catalog Page Behavior
- Opens filtered to a specific collection by default
- User can clear filter to see multiple collections
- Card shows ambiente image by default, sample on hover
- "Nuevo" badge when `nueva=1` in SKU data
- Filters work as AND (intersection)
- Pagination: 20 SKU per page

## Data Source (CMS)

**Primary source:** `data.xlsx` Excel file with sheets:
- `site` - Global settings (announcement banner text)
- `coleccion` - Collection metadata, hero slider config, folder paths
- `sku` - All SKU data with images
- `IndexheroSlides` - Homepage hero slider parameters
- `CollectionShowcase` - Homepage collection cards by line
- `catalogohero` - Catalog page hero text

### SKU Sheet Columns
```
linea, coleccion, color, patron, habitacion, filename,
sample, ambiente, disponible, código, nueva, error
```

### Collection Sheet Columns
```
Linea, Coleccion, HeroSlider, HeroSliderEyebrow, HeroSliderTitle,
HeroSliderDescription, HeroSliderCTA, folder
```

## Architecture

### Tech Stack
- **Framework**: Astro 5.x with React integration
- **Styling**: Tailwind CSS 4.x (via Vite plugin)
- **Content**: Markdown/MDX with Astro Content Collections
- **Animations**: AOS (Animate On Scroll)
- **Carousels**: Swiper

### Directory Structure (nextspace-astro/src/)

```
config/           # JSON configuration files
  config.json     # Site settings, metadata, GTM
  menu.json       # Navigation structure (manual config for nav bar)
  theme.json      # Font configuration
  social.json     # Social media links

content/          # Markdown content collections
  homepage/       # Homepage sections (-index.md)
  blog/           # Blog posts (use existing template)
  wallpapers/     # SKU content files (to be created)
  collections/    # Collection content files (to be created)

layouts/
  Base.astro      # HTML document wrapper
  components/     # Reusable UI components
  partials/       # Page section components

pages/            # Route pages
  index.astro     # Homepage (follow index.html mockup strictly)
  catalogo/       # Catalog pages with filtering
  coleccion/      # Collection landing pages
  blog/           # Blog (existing)

lib/
  contentParser.astro  # getSinglePage(), getListPage() helpers
  utils/          # Date formatting, text conversion, sorting

styles/           # CSS files (imported via main.css)
```

### Path Aliases (tsconfig.json)
- `@/*` → `./src/*`
- `@/components/*` → `./src/layouts/components/*`
- `@/partials/*` → `./src/layouts/partials/*`
- `@/shortcodes/*` → `./src/layouts/shortcodes/*`
- `@/helpers/*` → `./src/layouts/helpers/*`

## Navigation (Nav Bar)

**Menu Items:**
- Diseños → Mega menu with collections, colors, patterns for this line
- Personalizados → Mega menu with collections, colors, patterns
- Infantiles → Mega menu with collections, colors, patterns
- Vinílicos → Mega menu with collections, colors, patterns
- Cortinas y Persianas → External URL link
- Blog → /blog
- Puntos de Venta → Store locations page

**Mega Menu Context:**
- Each line shows: collections list, color filters, pattern filters
- Colors/patterns derived from SKUs in that line
- Mobile: Must have mobile-compatible dropdown menu
- Auto-contextualize when user arrives from Google to a collection page

## SEO Requirements

- Meta tags configured per page (not per SKU)
- Single sitemap for entire site
- Alt text auto-generated: `{collection} - SKU {código}`
- Spanish language only (no i18n needed)
- 301 redirects if collection URLs change

## Image Handling

### Naming Convention (for complementary script)
- `{código}.webp` → sample=1, ambiente=0
- `{código}_{number}.webp` or `{código}-{number}.webp` → sample=1, ambiente=1
- `{código}_{WxH}.webp` (contains dimensions) → sample=0, ambiente=1
- Register `error=1` if naming rules can't be clearly applied

### Recommendations
- Use lazy-loading for catalog images
- Optimize images offline before uploading
- Astro will generate responsive variants during build
- Accept .webp, .png, .jpg formats

## Content Files (Outside nextspace-astro/)

- `requerimientos_decomural.txt` - Full project requirements
- `index_content.md` - Content registry for index.html mockup
- `catalogo_content.md` - Content registry for catalogo.html mockup
- `data.xlsx` - CMS data source
- `index.html` - Homepage mockup (must follow strictly)
- `catalogo.html` - Catalog page mockup (must follow strictly)
- `styles.css` - Mockup styles reference

## Image Folders Inventory (Testing Assets)

| Folder | Files |
|--------|-------|
| `antique/` | 49 |
| `Elements II/` | 36 |
| `elementsII/` | 36 |
| `miapaul/` | 50 |
| `rafias/` | 15 |
| `Stories of Life/` | 70 |
| `storiesoflife/` | 70 |
| `textum/` | 78 |
| `vangoghII/` | 74 |

**Total: ~478 images available for testing**

**Important:** These folders are reused across multiple collections for development/testing purposes. The actual image-to-collection mapping is defined in `data.xlsx` sheet `sku` - always use the Excel as the source of truth for which images belong to which collection.

## Deliverables

1. Operating website
2. Updated CMS Excel (`data.xlsx`)
3. Scripts to read Excel and create Astro content files
4. Development documentation
5. Netlify deployment instructions
6. Process documentation for adding collections/SKUs

## Key Constraints

- **Strictly follow mockups** where they exist (index.html, catalogo.html)
- **No "Comprar" (Buy) CTAs** - this is a catalog, not e-commerce
- **Spanish only** - all content in Spanish, save files as UTF-8
- **Manual nav bar config** - adding new lines requires code changes
- **Static site** - 100% static build, client-side filtering acceptable
- **~1000 SKUs** across ~15 collections expected

### Content Update Workflow (Low Frequency)

**IMPORTANT**: The Excel file is **NOT read during Astro builds**. Content updates follow this workflow:

1. **Edit Excel** - Update `data.xlsx` with new collections/SKUs/content
2. **Run Script** - Execute `yarn generate-content` (manual, on-demand only)
3. **Review Changes** - Check generated markdown files in `src/content/`
4. **Commit to Git** - Commit the generated content files
5. **Deploy** - Push to trigger production build

**Key Points:**
- Excel is only read when running the content generation script manually
- Generated markdown files are version-controlled in Git
- Astro reads committed markdown files, NOT Excel
- Script is run infrequently (when adding collections, updating product data)
- Production builds are fast - no Excel parsing overhead
