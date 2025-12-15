# Implementation Plan: Script-Based JSON Workflow

**Date:** 2025-12-12
**Objective:** Convert all Excel-reading components to use script-generated JSON files

---

## Current State

✅ **Script Exists:** `scripts/excel-to-astro.js`
✅ **Currently Generates:**
- Collection markdown files (`src/content/collections/*.md`)
- Wallpaper markdown files (`src/content/wallpapers/*.md`)

❌ **Does NOT Generate:**
- JSON files for site settings
- JSON files for hero slides
- JSON files for collection showcase
- JSON files for catalog hero

❌ **Components Still Read Excel:**
- `Base.astro` → reads `site` sheet
- `AnnouncementBanner.astro` → reads `site` sheet
- `DecomuralHeroSlider.astro` → reads `IndexheroSlides` sheet
- `CollectionShowcaseSection.astro` → reads `CollectionShowcase` sheet

---

## Implementation Steps

### Phase 1: Extend Script to Generate JSON Files

#### Step 1.1: Create JSON Generator Module

**File:** `scripts/lib/json-generator.js`

**Purpose:** Generate JSON files from Excel sheets

**Methods:**
- `generateSiteSettings(siteSheet)` → `src/data/site.json`
- `generateHeroSlides(slidesSheet)` → `src/data/heroSlides.json`
- `generateCollectionShowcase(showcaseSheet)` → `src/data/collectionShowcase.json`
- `generateCatalogoHero(catalogoSheet)` → `src/data/catalogoHero.json`

**Output Directory:** `nextspace-astro/src/data/`

---

#### Step 1.2: Update excel-parser.js

**Add new sheets to parse:**
```javascript
validateAll() {
  this.validateSheet('coleccion', REQUIRED_COLUMNS.COLECCION);
  this.validateSheet('sku', REQUIRED_COLUMNS.SKU);
  this.validateSheet('site', REQUIRED_COLUMNS.SITE);              // ← Add
  this.validateSheet('IndexheroSlides', REQUIRED_COLUMNS.HERO);  // ← Add
  this.validateSheet('CollectionShowcase', REQUIRED_COLUMNS.SHOWCASE); // ← Add
}

getSheets() {
  return {
    coleccion: this.getSheet('coleccion'),
    sku: this.getSheet('sku'),
    site: this.getSheet('site'),                              // ← Add
    heroSlides: this.getSheet('IndexheroSlides'),             // ← Add
    collectionShowcase: this.getSheet('CollectionShowcase'),  // ← Add
    catalogoHero: this.getSheet('catalogohero')               // ← Add (optional)
  };
}
```

---

#### Step 1.3: Update Main Script

**File:** `scripts/excel-to-astro.js`

**Add JSON generation step:**
```javascript
import { JsonGenerator } from './lib/json-generator.js';

async function main() {
  // ... existing code ...

  const sheets = parser.getSheets();
  const { coleccion, sku, site, heroSlides, collectionShowcase, catalogoHero } = sheets;

  // NEW STEP: Generate JSON files
  const jsonGenerator = new JsonGenerator(
    path.join(__dirname, '..', 'nextspace-astro', 'src', 'data'),
    logger
  );

  logger.info('\nGenerating JSON data files:');
  await jsonGenerator.generateSiteSettings(site, options.dryRun);
  await jsonGenerator.generateHeroSlides(heroSlides, options.dryRun);
  await jsonGenerator.generateCollectionShowcase(collectionShowcase, options.dryRun);
  if (catalogoHero && catalogoHero.length > 0) {
    await jsonGenerator.generateCatalogoHero(catalogoHero, options.dryRun);
  }

  // ... existing markdown generation ...
}
```

---

### Phase 2: Update Astro Components to Read JSON

#### Step 2.1: Create src/data/ Directory

```bash
mkdir -p nextspace-astro/src/data
```

Add `.gitkeep` to ensure directory is tracked:
```bash
touch nextspace-astro/src/data/.gitkeep
```

---

#### Step 2.2: Update Base.astro

**File:** `nextspace-astro/src/layouts/Base.astro`

**Remove:**
```astro
import XLSX from 'xlsx';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let siteTitle = config.site.title;
try {
  const excelPath = join(__dirname, '..', '..', '..', 'data.xlsx');
  const workbook = XLSX.readFile(excelPath);
  const siteSheet = workbook.Sheets['site'];
  if (siteSheet) {
    const siteData = XLSX.utils.sheet_to_json(siteSheet);
    if (siteData.length > 0 && siteData[0].page_tittle) {
      siteTitle = siteData[0].page_tittle;
    }
  }
} catch (error) {
  console.warn('Could not read site title from Excel');
}
```

**Replace with:**
```astro
import siteData from '@/data/site.json';

const siteTitle = siteData?.pageTitle || config.site.title;
```

---

#### Step 2.3: Update AnnouncementBanner.astro

**File:** `nextspace-astro/src/layouts/partials/AnnouncementBanner.astro`

**Remove:**
```astro
import * as XLSX from 'xlsx';
import { readFileSync } from 'fs';
import { join } from 'path';

let announcementText = 'Disfruta de descuentos...';
try {
  const excelPath = join(process.cwd(), '..', 'data.xlsx');
  const workbook = XLSX.readFile(excelPath);
  const siteSheet = workbook.Sheets['site'];
  if (siteSheet) {
    const siteData = XLSX.utils.sheet_to_json(siteSheet);
    if (siteData.length > 0 && siteData[0].Announcement_label) {
      announcementText = siteData[0].Announcement_label;
    }
  }
} catch (error) {
  console.warn('Could not read announcement from Excel');
}
```

**Replace with:**
```astro
import siteData from '@/data/site.json';

const announcementText = siteData?.announcementLabel || 'Disfruta de descuentos exclusivos de hasta el 30%';
```

---

#### Step 2.4: Update DecomuralHeroSlider.astro

**File:** `nextspace-astro/src/layouts/partials/DecomuralHeroSlider.astro`

**Remove:**
```astro
import XLSX from 'xlsx';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const excelPath = join(__dirname, '..', '..', '..', '..', 'data.xlsx');
const workbook = XLSX.readFile(excelPath);
const slidesData = XLSX.utils.sheet_to_json(workbook.Sheets['IndexheroSlides']);
const slides = slidesData.sort((a, b) => a.indexorder - b.indexorder);
```

**Replace with:**
```astro
import slidesData from '@/data/heroSlides.json';

const slides = slidesData.sort((a, b) => a.indexorder - b.indexorder);
```

**Keep the `getImagePath` and `folderMap` logic** (lines 19-28) as-is.

---

#### Step 2.5: Update CollectionShowcaseSection.astro

**File:** `nextspace-astro/src/layouts/partials/CollectionShowcaseSection.astro`

**Remove:**
```astro
import XLSX from 'xlsx';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const excelPath = join(__dirname, '..', '..', '..', '..', 'data.xlsx');
const workbook = XLSX.readFile(excelPath);
const showcaseData = XLSX.utils.sheet_to_json(workbook.Sheets['CollectionShowcase']);
```

**Replace with:**
```astro
import showcaseData from '@/data/collectionShowcase.json';
```

---

### Phase 3: Update Configuration Files

#### Step 3.1: Update .gitignore

**File:** `nextspace-astro/.gitignore`

**Add:**
```gitignore
# Excel master file (local only, never commit)
../data.xlsx

# BUT ensure generated JSON is committed
!src/data/*.json
```

Or at project root `.gitignore`:
```gitignore
# Excel master file (local only)
data.xlsx
*.xlsx

# Generated content (MUST be committed)
!nextspace-astro/src/data/*.json
!nextspace-astro/src/content/**/*.md
```

---

#### Step 3.2: Update tsconfig.json (if needed)

**File:** `nextspace-astro/tsconfig.json`

Verify `@/data/*` path is included:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/layouts/components/*"],
      "@/partials/*": ["./src/layouts/partials/*"],
      "@/data/*": ["./src/data/*"]
    }
  }
}
```

---

### Phase 4: Testing

#### Step 4.1: Generate Initial JSON Files

```bash
cd nextspace-astro
yarn generate-content
```

**Verify files created:**
```
src/data/site.json
src/data/heroSlides.json
src/data/collectionShowcase.json
src/data/catalogoHero.json (optional)
```

---

#### Step 4.2: Test Local Development

```bash
yarn dev
```

**Check:**
- [ ] Server starts without errors
- [ ] Homepage loads
- [ ] Hero slider displays correctly
- [ ] Announcement banner shows
- [ ] Collection showcases display
- [ ] Browser tab title is correct
- [ ] No console errors (F12 → Console)

---

#### Step 4.3: Test Production Build

```bash
yarn build
```

**Verify:**
- [ ] Build succeeds
- [ ] No TypeScript errors
- [ ] No missing module errors
- [ ] Output directory created

```bash
yarn preview
```

**Check production preview:**
- [ ] All pages load correctly
- [ ] All content displays as expected

---

### Phase 5: Deployment

#### Step 5.1: Remove Excel from Git (Optional)

**If Excel is already in git:**
```bash
git rm --cached data.xlsx
git commit -m "Remove Excel file from version control"
```

**Keep local copy:**
The Excel file should stay on your local machine but not be tracked by git.

---

#### Step 5.2: Commit Generated Files

```bash
git add nextspace-astro/src/data/*.json
git add nextspace-astro/src/content/**/*.md
git add nextspace-astro/src/layouts/**/*.astro
git add scripts/
git commit -m "Implement script-based JSON workflow for all content"
```

---

#### Step 5.3: Deploy

```bash
git push
```

Monitor deployment logs for any errors.

---

## File Changes Summary

### New Files

- [ ] `scripts/lib/json-generator.js` - JSON generation module
- [ ] `nextspace-astro/src/data/site.json` - Generated site settings
- [ ] `nextspace-astro/src/data/heroSlides.json` - Generated hero slides
- [ ] `nextspace-astro/src/data/collectionShowcase.json` - Generated showcases
- [ ] `nextspace-astro/src/data/.gitkeep` - Ensure directory tracked

### Modified Files

- [ ] `scripts/excel-to-astro.js` - Add JSON generation step
- [ ] `scripts/lib/excel-parser.js` - Parse additional sheets
- [ ] `nextspace-astro/src/layouts/Base.astro` - Read JSON instead of Excel
- [ ] `nextspace-astro/src/layouts/partials/AnnouncementBanner.astro` - Read JSON
- [ ] `nextspace-astro/src/layouts/partials/DecomuralHeroSlider.astro` - Read JSON
- [ ] `nextspace-astro/src/layouts/partials/CollectionShowcaseSection.astro` - Read JSON
- [ ] `nextspace-astro/.gitignore` - Add data.xlsx, ensure JSON committed
- [ ] `nextspace-astro/tsconfig.json` - Verify @/data/* path alias

### Deleted Files (from git)

- [ ] `data.xlsx` - Remove from git tracking (keep local)

---

## JSON File Formats

### site.json
```json
{
  "pageTitle": "Decomural - La primera fábrica de papeles murales de Chile.",
  "announcementLabel": "Disfruta de descuentos exclusivos de hasta el 30%"
}
```

### heroSlides.json
```json
[
  {
    "indexorder": 1,
    "eyebrow": "Colección 2025",
    "title": "Stories of Life",
    "description": "Murales envolventes con nubes etéreas y fauna ilustrada.",
    "sampleImage": "369223.webp",
    "ambientImage": "369223_3-768x512.webp",
    "background": "#3d1c1f",
    "textColor": "#ffffff",
    "link": "catalogo.html",
    "linkLabel": "Explorar Stories of Life"
  },
  {
    "indexorder": 2,
    "eyebrow": "Texturas naturales",
    "title": "Elements II",
    "description": "Elementos naturales para un living contemporáneo.",
    "sampleImage": "300434.webp",
    "ambientImage": "300434_4-768x1024.webp",
    "background": "#10261d",
    "textColor": "#ffffff",
    "link": "catalogo.html",
    "linkLabel": "Explorar Elements II"
  }
]
```

### collectionShowcase.json
```json
[
  {
    "linea": "Diseños",
    "coleccion": "Elements II",
    "showcaseOrder": 1,
    "showcaseImage": "300434.webp",
    "showcaseTitle": "Elements II",
    "showcaseDescription": "Elementos naturales para un living contemporáneo"
  },
  {
    "linea": "Diseños",
    "coleccion": "Stories of Life",
    "showcaseOrder": 2,
    "showcaseImage": "369223.webp",
    "showcaseTitle": "Stories of Life",
    "showcaseDescription": "Murales envolventes con nubes etéreas"
  }
]
```

---

## Updated Admin Workflow

### Before (WRONG)
```
1. Edit data.xlsx
2. Commit data.xlsx to git ❌
3. Push
4. Astro reads Excel at build ❌
```

### After (CORRECT)
```
1. Edit data.xlsx (local file, not in git)
2. Run: cd nextspace-astro && yarn generate-content
3. Review generated files:
   - src/data/*.json
   - src/content/**/*.md
4. Commit ONLY generated files:
   git add src/data/ src/content/
   git commit -m "Update content from Excel"
5. Push to deploy
6. Astro reads JSON at build ✅
```

---

## Rollback Plan

If issues occur after deployment:

1. **Revert commits:**
   ```bash
   git revert HEAD
   git push
   ```

2. **Quick fix:**
   - Restore old component files from git history
   - Re-deploy

3. **Full rollback:**
   ```bash
   git reset --hard <commit-before-changes>
   git push --force
   ```

---

## Success Criteria

✅ Excel file NOT in git repository
✅ All content updates require running script
✅ JSON files generated correctly
✅ All Astro components read from JSON
✅ No build errors
✅ Site functions correctly in production
✅ No console errors in browser
✅ All pages load with correct content

---

**Status:** 🟡 Ready to Implement
**Next Action:** Create `json-generator.js` module
