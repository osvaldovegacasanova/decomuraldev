# Decomural Website - Admin Guide
## Content Management with Excel Master File

**Last Updated:** 2025-12-12
**For:** Web Administrators and Content Managers
**Excel Master File:** `data.xlsx` (local file, NOT in git repository)

---

## Table of Contents

1. [Overview](#overview)
2. [Excel File Structure](#excel-file-structure)
3. [Content Update Workflow](#content-update-workflow)
4. [Sheet Reference Guide](#sheet-reference-guide)
5. [Common Tasks](#common-tasks)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

---

## Overview

### What is the Excel Master File?

The `data.xlsx` file is the **central content management system** for the Decomural website. It controls:

- Site-wide settings (title, announcement banner)
- Homepage hero slider content
- Homepage collection showcases
- Catalog page hero section
- Collection metadata
- Product (SKU) inventory

**⚠️ IMPORTANT:** The Excel file is **LOCAL ONLY** and **NEVER committed to git**. All content updates require running a script to generate files that are committed instead.

### How Updates Work

**ALL content** updates follow the same workflow:

1. **Edit Excel** (local file only)
2. **Run Script** (`yarn generate-content`)
3. **Review Generated Files** (JSON and Markdown)
4. **Commit Generated Files** (NOT Excel)
5. **Deploy**

The script generates:
- **JSON files** for site settings, hero slider, showcases
- **Markdown files** for collections and products

---

## Excel File Structure

### File Location
```
decomuralweb2/
├── data.xlsx          ← Excel master file (ROOT LEVEL)
└── nextspace-astro/   ← Astro project folder
```

### Sheets Overview

| Sheet Name | Purpose | Generates |
|------------|---------|-----------|
| **site** | Global site settings | `src/data/site.json` |
| **IndexheroSlides** | Homepage hero carousel | `src/data/heroSlides.json` |
| **CollectionShowcase** | Homepage collection cards | `src/data/collectionShowcase.json` |
| **catalogohero** | Catalog page header | `src/data/catalogoHero.json` |
| **coleccion** | Collection metadata | `src/content/collections/*.md` |
| **sku** | Product inventory | `src/content/wallpapers/*.md` |

**⚠️ ALL sheets require running the script** - there is no instant update option.

---

## Content Update Workflow

### Standard Workflow (ALL Content)

```
┌─────────────────────────────┐
│  1. Edit Excel (Local)      │ Open data.xlsx, make changes, save
│     ⚠️ DO NOT COMMIT EXCEL  │
└──────────────┬──────────────┘
               │
┌──────────────▼────────────────┐
│  2. Run Script                │ cd nextspace-astro
│                               │ yarn generate-content
└──────────────┬────────────────┘
               │
┌──────────────▼────────────────────┐
│  3. Review Generated Files        │ Check src/data/*.json
│                                   │ Check src/content/**/*.md
└──────────────┬────────────────────┘
               │
┌──────────────▼────────────────────┐
│  4. Commit Generated Files ONLY   │ git add src/data/ src/content/
│     ⚠️ NEVER COMMIT EXCEL         │ git commit -m "Update content"
└──────────────┬────────────────────┘
               │
┌──────────────▼───────────┐
│   5. Deploy              │ git push
└──────────────┬───────────┘
               │
┌──────────────▼───────────┐
│  ✅ Live Update          │ Changes appear on website
└──────────────────────────┘
```

**Key Points:**
- ⚠️ **Excel file stays local** - NEVER commit `data.xlsx` to git
- ✅ **Only generated files** are committed (JSON and Markdown)
- ✅ **Script must run** for ALL updates, no exceptions

---

## Sheet Reference Guide

### Sheet 1: `site` - Global Site Settings

**Purpose:** Controls site-wide configuration
**Update Type:** Type A (Direct-read)
**Script Required:** ❌ No

#### Columns

| Column Name | Description | Example | Required |
|-------------|-------------|---------|----------|
| **page_tittle** | Browser tab title, SEO title | "Decomural - La primera fábrica de papeles murales de Chile." | ✅ Yes |
| **Announcement_label** | Top banner announcement text | "Disfruta de descuentos exclusivos de hasta el 30%" | ✅ Yes |

#### How to Update

1. Open `data.xlsx`
2. Go to `site` sheet
3. Edit **Row 2** (first data row below header)
4. Save the file

#### Example

```
| page_tittle                                                    | Announcement_label                                    |
|---------------------------------------------------------------|-------------------------------------------------------|
| Decomural - La primera fábrica de papeles murales de Chile.  | Disfruta de descuentos exclusivos de hasta el 30%   |
```

#### Where It Appears

- **page_tittle** → Browser tab, SEO meta tags, social media previews
- **Announcement_label** → Top banner across entire site

---

### Sheet 2: `IndexheroSlides` - Homepage Hero Slider

**Purpose:** Homepage carousel slides
**Update Type:** Type A (Direct-read)
**Script Required:** ❌ No

#### Columns

| Column | Description | Example | Required |
|--------|-------------|---------|----------|
| **indexorder** | Display order (1, 2, 3...) | 1 | ✅ Yes |
| **eyebrow** | Small label above title | "Colección 2025" | ❌ No |
| **title** | Main heading | "Stories of Life" | ✅ Yes |
| **description** | Body text | "Murales envolventes con nubes etéreas..." | ❌ No |
| **sampleImage** | Left panel image filename | "369223.webp" | ❌ No |
| **ambientImage** | Right panel image filename | "369223_3-768x512.webp" | ❌ No |
| **background** | Slide background color | "#3d1c1f" | ❌ No |
| **textColor** | Text color | "#ffffff" | ❌ No |
| **link** | CTA destination URL | "catalogo.html" | ❌ No |
| **linkLabel** | CTA button text | "Explorar Stories of Life" | ❌ No |

#### Image Path Logic

Images must be placed in: `/public/images/wallpapers/{collection-folder}/`

The component automatically maps collection names to folders:
- "Stories of Life" → `/images/wallpapers/storiesoflife/`
- "Elements II" → `/images/wallpapers/elementsII/`

**⚠️ Important:** If adding a new collection, update the `folderMap` in `DecomuralHeroSlider.astro` (lines 19-27)

#### How to Add a New Slide

1. Open `data.xlsx` → `IndexheroSlides` sheet
2. Add a new row at the bottom
3. Set `indexorder` to next number (e.g., if you have 2 slides, use 3)
4. Fill in all required fields
5. Upload images to `/public/images/wallpapers/{folder}/`
6. Save and deploy

#### Example Row

```
indexorder: 1
eyebrow: Colección 2025
title: Stories of Life
description: Murales envolventes con nubes etéreas y fauna ilustrada.
sampleImage: 369223.webp
ambientImage: 369223_3-768x512.webp
background: #3d1c1f
textColor: #ffffff
link: catalogo.html
linkLabel: Explorar Stories of Life
```

---

### Sheet 3: `CollectionShowcase` - Homepage Collection Cards

**Purpose:** Collection cards displayed on homepage by line
**Update Type:** Type A (Direct-read)
**Script Required:** ❌ No

#### Columns

| Column | Description | Example | Required |
|--------|-------------|---------|----------|
| **Linea** | Line name (Diseños, Personalizados, etc.) | "Diseños" | ✅ Yes |
| **Coleccion** | Collection name | "Elements II" | ✅ Yes |
| **showcaseOrder** | Display order within line | 1 | ✅ Yes |
| **showcaseImage** | Card image filename | "300434.webp" | ✅ Yes |
| **showcaseTitle** | Card heading | "Elements II" | ❌ No |
| **showcaseDescription** | Card body text | "Elementos naturales para un living contemporáneo" | ❌ No |

#### How to Update Showcase Order

1. Open `data.xlsx` → `CollectionShowcase` sheet
2. Change `showcaseOrder` values (1 = first, 2 = second, etc.)
3. Cards are grouped by `Linea` and sorted by `showcaseOrder`
4. Save and deploy

---

### Sheet 4: `catalogohero` - Catalog Page Hero

**Purpose:** Hero section text on catalog page
**Update Type:** Type A (Direct-read)
**Script Required:** ❌ No

#### Columns

| Column | Description | Example | Required |
|--------|-------------|---------|----------|
| **heading** | Main heading | "Nuestro Catálogo" | ✅ Yes |
| **subheading** | Subtitle | "Descubre nuestra colección completa" | ❌ No |

#### How to Update

1. Open `data.xlsx` → `catalogohero` sheet
2. Edit Row 2 (first data row)
3. Save and deploy

---

### Sheet 5: `coleccion` - Collection Metadata

**Purpose:** Collection landing page content
**Update Type:** Type B (Generated content)
**Script Required:** ✅ Yes - `yarn generate-content`

#### Columns

| Column | Description | Example | Required |
|--------|-------------|---------|----------|
| **Linea** | Parent line | "Diseños" | ✅ Yes |
| **Coleccion** | Collection name | "Elements II" | ✅ Yes |
| **HeroSlider** | Show in hero slider? (1=yes, 0=no) | 1 | ❌ No |
| **HeroSliderEyebrow** | Hero slider eyebrow text | "Texturas naturales" | ❌ No |
| **HeroSliderTitle** | Hero slider main title | "Elements II" | ❌ No |
| **HeroSliderDescription** | Hero slider description | "Elementos naturales..." | ❌ No |
| **HeroSliderCTA** | Hero slider button text | "Explorar Elements II" | ❌ No |
| **folder** | Image folder name | "elementsII" | ✅ Yes |

#### How to Add a New Collection

1. Open `data.xlsx` → `coleccion` sheet
2. Add new row with collection data
3. **Run script:** `cd nextspace-astro && yarn generate-content`
4. Review generated file in `src/content/collections/{slug}.md`
5. Commit both Excel and generated markdown files
6. Deploy

---

### Sheet 6: `sku` - Product Inventory

**Purpose:** Individual wallpaper/product data
**Update Type:** Type B (Generated content)
**Script Required:** ✅ Yes - `yarn generate-content`

#### Columns

| Column | Description | Example | Required |
|--------|-------------|---------|----------|
| **linea** | Parent line | "Diseños" | ✅ Yes |
| **coleccion** | Parent collection | "Elements II" | ✅ Yes |
| **color** | Product color | "Azul" | ✅ Yes |
| **patron** | Pattern type | "Texturas" | ✅ Yes |
| **habitacion** | Room type | "Living" | ❌ No |
| **filename** | Image filename | "300434.webp" | ✅ Yes |
| **sample** | Is sample image? (1=yes, 0=no) | 1 | ✅ Yes |
| **ambiente** | Is ambient image? (1=yes, 0=no) | 0 | ✅ Yes |
| **disponible** | Available? (1=yes, 0=no) | 1 | ✅ Yes |
| **código** | SKU code (unique) | "300434" | ✅ Yes |
| **nueva** | New product? (1=yes, 0=no) | 1 | ❌ No |
| **error** | Data error flag | 0 | ❌ No |

#### Valid Values

**color:** Negro, Azul, Marrón, Verde, Amarillo, Rojo, Rosa, Blanco, Gris, Multicolor, Naranja, Morado

**patron:** Abstracto, Floral, Animales, Texturas, Plano, Geométrico

#### How to Add New Products

1. Open `data.xlsx` → `sku` sheet
2. Add new rows with product data
3. Upload images to `/public/images/wallpapers/{folder}/`
4. **Run script:** `cd nextspace-astro && yarn generate-content`
5. Review generated files in `src/content/wallpapers/`
6. Commit Excel + generated files
7. Deploy

#### Image Naming Convention

- **Sample images:** `{código}.webp` (e.g., "300434.webp")
- **Ambient images:** `{código}_{number}.webp` or `{código}-{number}.webp`
- **Dimension-tagged:** `{código}_{WxH}.webp` (e.g., "300434_768x512.webp")

---

## Common Tasks

### Task 1: Update Site Title

**Frequency:** Rarely
**Complexity:** ⭐ Easy

**Steps:**
1. Open `data.xlsx`
2. Go to `site` sheet
3. Edit `page_tittle` column, Row 2
4. Save file
5. Run script:
   ```bash
   cd nextspace-astro
   yarn generate-content
   ```
6. Verify `src/data/site.json` was updated
7. Commit generated files:
   ```bash
   git add src/data/site.json
   git commit -m "Update site title"
   git push
   ```

**Result:** Browser tab title updates across entire site

---

### Task 2: Update Announcement Banner

**Frequency:** Weekly/Monthly
**Complexity:** ⭐ Easy

**Steps:**
1. Open `data.xlsx`
2. Go to `site` sheet
3. Edit `Announcement_label` column, Row 2
4. Save file
5. Run script: `yarn generate-content`
6. Commit `src/data/site.json`
7. Deploy

**Result:** Top banner text updates on all pages

---

### Task 3: Change Hero Slider Content

**Frequency:** Seasonal
**Complexity:** ⭐⭐ Medium

**Steps:**
1. Open `data.xlsx` → `IndexheroSlides`
2. Edit existing slide rows OR add new slide
3. Update `indexorder` to control display sequence
4. Change text fields: `title`, `description`, `linkLabel`
5. Update image filenames if needed: `sampleImage`, `ambientImage`
6. Save file
7. Verify images exist in `/public/images/wallpapers/{folder}/`
8. Run script: `yarn generate-content`
9. Verify `src/data/heroSlides.json` was updated
10. Commit and deploy

**Result:** Homepage hero slider updates

---

### Task 4: Add a New Collection

**Frequency:** Quarterly
**Complexity:** ⭐⭐⭐ Advanced

**Steps:**

1. **Prepare Images**
   - Create folder: `/public/images/wallpapers/{collection-slug}/`
   - Upload all collection images

2. **Update Excel - `coleccion` Sheet**
   - Open `data.xlsx` → `coleccion` sheet
   - Add new row:
     ```
     Linea: Diseños
     Coleccion: My New Collection
     folder: mynewcollection
     HeroSlider: 1 (if you want it in slider)
     ```

3. **Update Excel - `sku` Sheet**
   - Go to `sku` sheet
   - Add rows for each product/SKU in the collection
   - Fill all required fields

4. **Generate Content Files**
   ```bash
   cd nextspace-astro
   yarn generate-content
   ```

5. **Review Generated Files**
   - Check `src/content/collections/my-new-collection.md`
   - Check `src/content/wallpapers/{sku-files}.md`

6. **Update Mega Menu (Code Change Required)**
   - Edit `src/layouts/partials/DecomuralHeader.astro`
   - Add collection to appropriate line's mega menu

7. **Commit All Changes**
   ```bash
   git add data.xlsx src/content/
   git commit -m "Add new collection: My New Collection"
   ```

8. **Deploy**
   ```bash
   git push
   ```

**Result:** New collection appears in catalog, mega menu, and homepage

---

### Task 5: Mark Products as "Nuevo" (New)

**Frequency:** Monthly
**Complexity:** ⭐⭐ Medium

**Steps:**
1. Open `data.xlsx` → `sku` sheet
2. Find products to mark as new
3. Set `nueva` column to `1` (yes) or `0` (no)
4. Save file
5. Run: `cd nextspace-astro && yarn generate-content`
6. Review generated files
7. Commit and deploy

**Result:** "Nuevo" badge appears on catalog cards

---

### Task 6: Disable Unavailable Products

**Frequency:** As needed
**Complexity:** ⭐⭐ Medium

**Steps:**
1. Open `data.xlsx` → `sku` sheet
2. Find products to disable
3. Set `disponible` column to `0` (not available)
4. Save file
5. Run: `cd nextspace-astro && yarn generate-content`
6. Commit and deploy

**Result:** Products removed from catalog display

---

### Task 7: Reorder Homepage Collection Showcases

**Frequency:** Seasonal
**Complexity:** ⭐ Easy

**Steps:**
1. Open `data.xlsx` → `CollectionShowcase` sheet
2. Change `showcaseOrder` values
   - 1 = first card
   - 2 = second card
   - etc.
3. Cards are grouped by `Linea` automatically
4. Save file
5. Run script: `yarn generate-content`
6. Verify `src/data/collectionShowcase.json` was updated
7. Commit and deploy

**Result:** Collection cards reorder on homepage

---

## Troubleshooting

### Problem: Excel Changes Don't Appear on Website

**Diagnosis Questions:**
1. Did you save the Excel file? ✅
2. Did you run `yarn generate-content`? ✅ **REQUIRED**
3. Did you commit the generated files (JSON/Markdown)? ✅
4. Did you push to the repository? ✅

**Solution:**
- ⚠️ You MUST run `yarn generate-content` after EVERY Excel change
- ⚠️ You MUST commit generated files (NOT the Excel file)
- Generated files are in:
  - `src/data/*.json` (site settings, hero, showcase)
  - `src/content/**/*.md` (collections, products)
- Excel file should NEVER be committed to git
- Wait 2-5 minutes for build to complete after deployment
- Clear browser cache (Ctrl+Shift+R) if needed

---

### Problem: Script Error "Sheet not found"

**Error Message:**
```
Error: Sheet 'sku' not found in workbook
```

**Solution:**
1. Open `data.xlsx` in Excel
2. Check sheet tabs at bottom
3. Ensure sheet names match exactly:
   - `site` (lowercase)
   - `IndexheroSlides` (exact capitalization)
   - `CollectionShowcase` (exact capitalization)
   - `coleccion` (lowercase)
   - `sku` (lowercase)
   - `catalogohero` (lowercase)
4. Rename if needed
5. Save and try again

---

### Problem: Images Not Showing

**Diagnosis:**

1. **Check Image Path**
   - Images must be in `/public/images/wallpapers/{folder}/`
   - Folder name must match `folder` field in `coleccion` sheet

2. **Check Filename**
   - Must match exactly (case-sensitive)
   - Include file extension (`.webp`, `.jpg`, `.png`)

3. **Check File Exists**
   ```bash
   ls public/images/wallpapers/mynewcollection/
   ```

**Solution:**
- Upload missing images
- Fix filename typos in Excel
- Regenerate content: `yarn generate-content`
- Commit and deploy

---

### Problem: Hero Slider Shows Wrong Collection Images

**Cause:** Collection folder mapping is hardcoded

**Solution:**

1. Open `src/layouts/partials/DecomuralHeroSlider.astro`
2. Find `folderMap` (around line 19-27):
   ```javascript
   const folderMap = {
     'Stories of Life': 'storiesoflife',
     'Elements II': 'elementsII'
   };
   ```
3. Add your collection:
   ```javascript
   const folderMap = {
     'Stories of Life': 'storiesoflife',
     'Elements II': 'elementsII',
     'My New Collection': 'mynewcollection'  // ← Add this
   };
   ```
4. Commit and deploy

**Future Fix:** This should read from `coleccion` sheet `folder` field automatically

---

### Problem: Generated Content Files Not Created

**Diagnosis:**
```bash
cd nextspace-astro
yarn generate-content
```

**If command not found:**
- Script doesn't exist yet
- Check `package.json` for `generate-content` script
- You may need to create the script (see developer documentation)

**If script runs but no files created:**
- Check console output for errors
- Verify Excel sheet names are correct
- Verify required columns exist

---

### Problem: Accidental Excel Corruption

**Symptoms:**
- Excel won't open
- Cells show `#REF!` or `#VALUE!` errors
- Missing sheets

**Solution:**

1. **Restore from Git**
   ```bash
   git checkout data.xlsx
   ```

2. **Restore from Backup**
   - Check `backups/` folder (if configured)
   - Or restore from your backup system

3. **Prevention:**
   - **Always make a backup before major edits**
   ```bash
   cp data.xlsx data_backup_$(date +%Y%m%d).xlsx
   ```
   - Use Excel's "Save As" to create dated copies

---

## Best Practices

### ✅ DO

1. **Always backup before major changes**
   ```bash
   cp data.xlsx data_backup_$(date +%Y%m%d).xlsx
   ```

2. **Use descriptive commit messages**
   - ✅ Good: "Add 3 new products to Elements II collection"
   - ❌ Bad: "update"

3. **Test on staging before production**
   - If you have a staging environment, deploy there first
   - Verify changes look correct
   - Then deploy to production

4. **Keep Excel file under 10MB**
   - Optimize images before uploading
   - Don't embed images in Excel cells
   - Store images in `/public/images/` folder

5. **Use consistent naming**
   - SKU codes: Always numeric (e.g., "300434")
   - Image files: Lowercase, no spaces (e.g., "my-image.webp")
   - Folders: Lowercase, no spaces (e.g., "mynewcollection")

6. **Validate data before running script**
   - Check for typos in collection names
   - Verify all required fields are filled
   - Ensure `indexorder` / `showcaseOrder` are unique

7. **Run script after SKU/Collection changes**
   - Type B content (collections, SKUs) **always** requires script
   - Don't forget this step!

---

### ❌ DON'T

1. **Don't edit Excel while script is running**
   - Wait for `yarn generate-content` to complete
   - Then make additional changes

2. **Don't delete sheets**
   - The system expects all 6 sheets to exist
   - Deleting will break the site

3. **Don't rename columns**
   - Column names are hardcoded in scripts
   - Renaming will break content generation

4. **Don't use special characters in filenames**
   - ❌ Bad: "my image (1).webp"
   - ✅ Good: "my-image-1.webp"

5. **Don't commit without testing**
   - Always run `yarn dev` locally to test changes
   - Check that images load correctly
   - Verify text displays as expected

6. **Don't skip the script for Type B content**
   - Updating Excel alone won't update the website
   - You **must** run `yarn generate-content` first

7. **Don't use Excel formulas in data cells**
   - Scripts read cell values, not formulas
   - Use plain text only

---

## Quick Reference Cheat Sheet

### When Do I Need to Run the Script?

**Answer: ALWAYS**

After making ANY change to the Excel file, you must:

```bash
cd nextspace-astro
yarn generate-content
```

Then commit the generated files (NOT the Excel file):

```bash
git add src/data/ src/content/
git commit -m "Update content"
git push
```

### What Files to Commit

✅ **COMMIT these:**
- `src/data/*.json` - Generated from Excel
- `src/content/**/*.md` - Generated from Excel

❌ **NEVER commit:**
- `data.xlsx` - Excel master file (local only)

---

### Git Commands Quick Reference

```bash
# Check what files changed
git status

# Add Excel file to commit
git add data.xlsx

# Add generated content files
git add src/content/

# Create commit with message
git commit -m "Your message here"

# Push to production
git push

# Undo changes to Excel (restore from git)
git checkout data.xlsx

# Create backup branch before major changes
git checkout -b backup-before-update
git checkout main
```

---

### Deployment Checklist

Before deploying major changes:

- [ ] Excel file saved
- [ ] Backup created (`cp data.xlsx data_backup_YYYYMMDD.xlsx`)
- [ ] Script run (if Type B content): `yarn generate-content`
- [ ] Generated files reviewed in `src/content/`
- [ ] Local dev server tested: `yarn dev`
- [ ] Images verified to load correctly
- [ ] No console errors in browser
- [ ] Git changes staged: `git add data.xlsx src/content/`
- [ ] Commit created with clear message
- [ ] Pushed to repository: `git push`
- [ ] Deployment build successful (check hosting dashboard)
- [ ] Live site verified

---

## Support and Contact

If you encounter issues not covered in this guide:

1. **Check the logs**
   - Build logs on hosting platform (Netlify/Vercel)
   - Browser console (F12 → Console tab)

2. **Review recent changes**
   - Use `git log` to see what changed
   - Use `git diff data.xlsx` to see Excel changes

3. **Contact Developer**
   - Provide error messages
   - Describe what you were trying to do
   - Share screenshots if helpful

---

**Document Version:** 1.0
**Last Updated:** 2025-12-12
**Maintained By:** Development Team

---

## Appendix: File Paths Reference

```
decomuralweb2/
├── data.xlsx                          ← Excel master file
├── ADMIN_GUIDE_EXCEL_CONTENT.md       ← This document
│
└── nextspace-astro/
    ├── public/
    │   └── images/
    │       └── wallpapers/
    │           ├── storiesoflife/     ← Collection images
    │           ├── elementsII/
    │           └── {your-collection}/
    │
    ├── src/
    │   ├── content/
    │   │   ├── collections/           ← Generated collection pages
    │   │   └── wallpapers/            ← Generated SKU pages
    │   │
    │   ├── layouts/
    │   │   └── partials/
    │   │       ├── DecomuralHeroSlider.astro       ← Reads IndexheroSlides
    │   │       ├── CollectionShowcaseSection.astro ← Reads CollectionShowcase
    │   │       └── AnnouncementBanner.astro        ← Reads site sheet
    │   │
    │   └── pages/
    │       └── index.astro            ← Homepage
    │
    └── package.json                   ← Contains scripts
```

---

**End of Admin Guide**
