# Excel Workflow Audit - Script-Based Updates Only

**Date:** 2025-12-12
**Objective:** Ensure Excel file stays local, never pushed to git. All updates via script only.

---

## Current Problems

### ❌ Type A Content (Direct Excel Reads at Build Time)

Currently, **4 components** read Excel directly during Astro builds:

| File | What It Reads | Excel Sheet | Excel Field |
|------|---------------|-------------|-------------|
| `Base.astro` | Site title | `site` | `page_tittle` |
| `AnnouncementBanner.astro` | Banner text | `site` | `Announcement_label` |
| `DecomuralHeroSlider.astro` | Hero slides | `IndexheroSlides` | All fields |
| `CollectionShowcaseSection.astro` | Collection cards | `CollectionShowcase` | All fields |

**Problem:** This requires:
1. Excel file to be in the repository (`C:\decomuralweb2\data.xlsx`)
2. Excel file to be committed to git
3. Excel file to be deployed to production
4. Astro reads Excel at build time on server

**This breaks the requirement:** Excel should NOT be in git repo.

---

## Required Changes

### Strategy: Convert All to Generated JSON Files

**New Workflow:**
```
Excel (local only)
    ↓
Script reads Excel → Generates JSON files
    ↓
JSON files committed to git (NOT Excel)
    ↓
Astro components read JSON (NOT Excel)
    ↓
Deploy
```

---

## Implementation Plan

### Step 1: Create JSON Output Directory

```
nextspace-astro/
└── src/
    └── data/
        ├── site.json               ← Site settings
        ├── heroSlides.json         ← Hero slider data
        ├── collectionShowcase.json ← Homepage showcases
        └── catalogoHero.json       ← Catalog hero (future)
```

---

### Step 2: Update/Create Content Generation Script

**Script:** `scripts/generate-content.js` (or similar)

**Should generate:**

1. **`src/data/site.json`** from `site` sheet:
```json
{
  "pageTitle": "Decomural - La primera fábrica de papeles murales de Chile.",
  "announcementLabel": "Disfruta de descuentos exclusivos de hasta el 30%"
}
```

2. **`src/data/heroSlides.json`** from `IndexheroSlides` sheet:
```json
[
  {
    "indexorder": 1,
    "eyebrow": "Colección 2025",
    "title": "Stories of Life",
    "description": "Murales envolventes...",
    "sampleImage": "369223.webp",
    "ambientImage": "369223_3-768x512.webp",
    "background": "#3d1c1f",
    "textColor": "#ffffff",
    "link": "catalogo.html",
    "linkLabel": "Explorar Stories of Life"
  }
]
```

3. **`src/data/collectionShowcase.json`** from `CollectionShowcase` sheet:
```json
[
  {
    "linea": "Diseños",
    "coleccion": "Elements II",
    "showcaseOrder": 1,
    "showcaseImage": "300434.webp",
    "showcaseTitle": "Elements II",
    "showcaseDescription": "Elementos naturales..."
  }
]
```

---

### Step 3: Modify Astro Components to Read JSON

#### 3.1 Update `Base.astro`

**Current (reads Excel):**
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

**New (reads JSON):**
```astro
import siteData from '@/data/site.json';

const siteTitle = siteData.pageTitle || config.site.title;
```

---

#### 3.2 Update `AnnouncementBanner.astro`

**Current (reads Excel):**
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

**New (reads JSON):**
```astro
import siteData from '@/data/site.json';

const announcementText = siteData.announcementLabel || 'Disfruta de descuentos...';
```

---

#### 3.3 Update `DecomuralHeroSlider.astro`

**Current (reads Excel):**
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

**New (reads JSON):**
```astro
import slidesData from '@/data/heroSlides.json';

const slides = slidesData.sort((a, b) => a.indexorder - b.indexorder);
```

---

#### 3.4 Update `CollectionShowcaseSection.astro`

**Current (reads Excel):**
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

**New (reads JSON):**
```astro
import showcaseData from '@/data/collectionShowcase.json';
```

---

### Step 4: Update TypeScript Configuration

**File:** `nextspace-astro/tsconfig.json`

Add `@/data/*` to path aliases if not already present:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/data/*": ["./src/data/*"]
    }
  }
}
```

---

### Step 5: Update `.gitignore`

**Add Excel to gitignore:**
```
# Excel master file (local only, never commit)
data.xlsx
*.xlsx
```

**Ensure JSON files ARE committed:**
```
# Generated data files (MUST be committed)
!src/data/*.json
```

---

## Content Generation Script Requirements

### Script Location
```
nextspace-astro/
└── scripts/
    └── generate-content.js
```

### Script Should:

1. **Read Excel** from `../data.xlsx` (project root)
2. **Generate JSON files:**
   - `src/data/site.json`
   - `src/data/heroSlides.json`
   - `src/data/collectionShowcase.json`
   - `src/data/catalogoHero.json` (if needed)
3. **Generate Markdown files** (existing functionality):
   - `src/content/collections/*.md`
   - `src/content/wallpapers/*.md`
4. **Report summary:**
   - Files created/updated
   - Any errors or warnings

### package.json Script

```json
{
  "scripts": {
    "generate-content": "node scripts/generate-content.js"
  }
}
```

---

## Updated Admin Workflow

### Old Workflow (BROKEN - Excel in git)
```
1. Edit data.xlsx
2. Commit data.xlsx to git ❌
3. Push to deploy ❌
4. Astro reads Excel at build time ❌
```

### New Workflow (CORRECT - Excel local only)
```
1. Edit data.xlsx (local file, never committed)
2. Run: yarn generate-content
3. Review generated files:
   - src/data/*.json
   - src/content/**/*.md
4. Commit ONLY generated files:
   git add src/data/ src/content/
   git commit -m "Update content"
5. Push to deploy
6. Astro reads JSON files at build time ✅
```

---

## Benefits of This Approach

✅ **Excel file stays local** - Never in git repo, never deployed
✅ **Better security** - No sensitive data paths in production
✅ **Smaller repo** - No binary Excel files in version control
✅ **Faster builds** - JSON is faster to parse than Excel
✅ **Version control friendly** - JSON diffs are readable in git
✅ **Separation of concerns** - CMS (Excel) separate from codebase
✅ **Audit trail** - Git shows exactly what content changed

---

## Migration Steps

### Phase 1: Create Script (if doesn't exist)

1. Create `nextspace-astro/scripts/generate-content.js`
2. Implement Excel → JSON generation for all 4 sheets
3. Test script outputs correct JSON files

### Phase 2: Update Components

1. Modify `Base.astro` to read `site.json`
2. Modify `AnnouncementBanner.astro` to read `site.json`
3. Modify `DecomuralHeroSlider.astro` to read `heroSlides.json`
4. Modify `CollectionShowcaseSection.astro` to read `collectionShowcase.json`
5. Remove all XLSX imports from these files
6. Test locally with `yarn dev`

### Phase 3: Clean Up

1. Add `data.xlsx` to `.gitignore`
2. Remove `data.xlsx` from git history (if desired):
   ```bash
   git rm --cached data.xlsx
   git commit -m "Remove Excel file from git"
   ```
3. Update admin documentation
4. Test full workflow end-to-end

### Phase 4: Deploy

1. Run `yarn generate-content` to create initial JSON files
2. Commit generated JSON files
3. Push to production
4. Verify site works correctly

---

## File Checklist

### Files to Modify

- [ ] `nextspace-astro/scripts/generate-content.js` - Add JSON generation
- [ ] `nextspace-astro/src/layouts/Base.astro` - Read JSON instead of Excel
- [ ] `nextspace-astro/src/layouts/partials/AnnouncementBanner.astro` - Read JSON
- [ ] `nextspace-astro/src/layouts/partials/DecomuralHeroSlider.astro` - Read JSON
- [ ] `nextspace-astro/src/layouts/partials/CollectionShowcaseSection.astro` - Read JSON
- [ ] `nextspace-astro/.gitignore` - Add `data.xlsx`, ensure `src/data/*.json` committed
- [ ] `nextspace-astro/tsconfig.json` - Add `@/data/*` path alias (if needed)
- [ ] `ADMIN_GUIDE_EXCEL_CONTENT.md` - Update workflow documentation

### Files to Create

- [ ] `nextspace-astro/src/data/` - Directory for generated JSON files
- [ ] `nextspace-astro/src/data/site.json` - Generated from `site` sheet
- [ ] `nextspace-astro/src/data/heroSlides.json` - Generated from `IndexheroSlides`
- [ ] `nextspace-astro/src/data/collectionShowcase.json` - Generated from `CollectionShowcase`

### Files to Remove from Git (Optional)

- [ ] `data.xlsx` - Remove from git tracking (keep local copy)

---

## Testing Checklist

After implementing changes:

- [ ] Run `yarn generate-content` successfully
- [ ] JSON files created in `src/data/`
- [ ] `yarn dev` runs without errors
- [ ] Homepage loads correctly
- [ ] Hero slider displays with correct data
- [ ] Announcement banner shows correct text
- [ ] Collection showcases display correctly
- [ ] Browser tab title shows correct text
- [ ] No console errors
- [ ] `yarn build` succeeds
- [ ] Production build works

---

## Risk Assessment

### Low Risk
- JSON files are simpler than Excel parsing
- Same data, different format
- Easy to rollback if issues

### Medium Risk
- Need to ensure script generates correct JSON structure
- Components must handle missing/malformed JSON gracefully

### Mitigation
- Add JSON schema validation to script
- Add fallback values in components
- Test thoroughly in development before deploying

---

## Open Questions

1. **Does the content generation script already exist?**
   - If yes: Where is it? What does it currently generate?
   - If no: Need to create from scratch

2. **What should happen if JSON file is missing?**
   - Use hardcoded defaults?
   - Show error message?
   - Fail build?

3. **Should Excel file be backed up separately?**
   - Where? (Cloud storage, separate repo, etc.)

4. **Should generated JSON files be prettified for readability?**
   - Makes git diffs easier to read
   - Slightly larger file size

---

## Next Steps

**Immediate:**
1. ✅ Audit complete (this document)
2. Check if `generate-content` script exists
3. Review current script capabilities
4. Plan script modifications

**Short-term:**
1. Implement JSON generation in script
2. Update 4 Astro components to read JSON
3. Test locally

**Before Deploy:**
1. Run script to generate initial JSON files
2. Update `.gitignore`
3. Commit only generated files (not Excel)
4. Deploy and verify

---

**Document Version:** 1.0
**Status:** 🔴 Action Required
**Owner:** Development Team
