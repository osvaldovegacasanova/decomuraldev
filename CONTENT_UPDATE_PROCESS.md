# Content Update Process for Decomural Website

## Architecture Overview

The Decomural website uses a **static content generation model** where Excel data is converted to Astro-compatible markdown files **on-demand only**.

```
┌─────────────┐
│ data.xlsx   │ ◄── Edit product data (low frequency)
└──────┬──────┘
       │
       │ (1) Manual trigger
       ▼
┌─────────────────────────┐
│ excel-to-astro.js       │ ◄── Run script on-demand
│ (Node.js script)        │
└──────┬──────────────────┘
       │
       │ (2) Generates files
       ▼
┌─────────────────────────┐
│ src/content/            │
│ ├── collections/*.md    │ ◄── Version controlled in Git
│ └── wallpapers/*/*.md   │
└──────┬──────────────────┘
       │
       │ (3) Git commit + push
       ▼
┌─────────────────────────┐
│ Astro Build Process     │ ◄── Reads committed markdown files
│ (yarn build)            │     (NOT Excel!)
└──────┬──────────────────┘
       │
       │ (4) Deploy
       ▼
┌─────────────────────────┐
│ Production Website      │
└─────────────────────────┘
```

---

## Key Principles

### ✅ What This Is:
- **On-demand content generator** - Run manually when content changes
- **Low frequency updates** - Triggered when adding collections, updating SKU data
- **Git-versioned content** - Markdown files are committed and tracked
- **Fast builds** - Astro never reads Excel, only static markdown files

### ❌ What This Is NOT:
- NOT a build-time script (doesn't run during `yarn build`)
- NOT a runtime data source (Excel is not queried by the website)
- NOT automatic/continuous (requires manual execution)
- NOT part of CI/CD (content is pre-generated before deployment)

---

## When to Run the Script

Run `yarn generate-content` when:
- ✅ Adding a new collection
- ✅ Adding new SKU products
- ✅ Updating product descriptions, colors, patterns
- ✅ Changing collection metadata (hero slider text, etc.)
- ✅ Updating homepage content (announcement banner, showcase sections)

Do NOT run for:
- ❌ Code changes (styling, components, layouts)
- ❌ Configuration changes (theme.json, menu.json)
- ❌ Regular Astro development work

---

## Content Update Workflow

### Step 1: Edit Excel Data
```bash
# Open and edit data.xlsx
# Update collections, SKUs, or content in relevant sheets
```

**Excel Sheets:**
- `site` - Global settings (announcement banner)
- `coleccion` - Collection metadata
- `sku` - Product data (código, color, patrón, images)
- `IndexheroSlides` - Homepage hero slider
- `CollectionShowcase` - Homepage collection cards
- `catalogohero` - Catalog page hero text

### Step 2: Run Content Generator
```bash
cd nextspace-astro
yarn generate-content          # Full regeneration
yarn generate-content:dry      # Preview changes without writing
yarn generate-content --clean  # Remove old content first
```

**Script does:**
1. Reads `data.xlsx`
2. Validates data structure
3. Copies images from collection folders to `public/images/wallpapers/`
4. Generates markdown files with YAML frontmatter
5. Writes to `src/content/collections/` and `src/content/wallpapers/`
6. Reports success/errors

### Step 3: Review Generated Files
```bash
# Check what changed
git status
git diff src/content/

# Review new files
ls src/content/collections/
ls src/content/wallpapers/
```

**Verify:**
- ✅ Frontmatter YAML is valid
- ✅ Spanish characters preserved (ñ, á, é, etc.)
- ✅ Image paths are correct
- ✅ Slugs are URL-safe
- ✅ No duplicate files

### Step 4: Test Locally
```bash
yarn dev         # Test in development
yarn build       # Verify production build succeeds
yarn preview     # Preview production build
```

**Check:**
- ✅ Catalog page displays new products
- ✅ Collection pages render correctly
- ✅ Filters work with new data
- ✅ Images load properly
- ✅ No build errors

### Step 5: Commit Changes
```bash
git add src/content/
git add public/images/wallpapers/
git commit -m "Add new collection: [Collection Name]"
git push
```

### Step 6: Deploy
- Push triggers deployment (Netlify/Vercel)
- Production build uses committed content files
- Excel is NOT deployed (stays local)

---

## Script Options

### Basic Commands
```bash
# Generate all content (collections + wallpapers + images)
yarn generate-content

# Dry run (preview only, no file writes)
yarn generate-content:dry

# Generate collections only
node ../scripts/excel-to-astro.js --collections-only

# Generate wallpapers only
node ../scripts/excel-to-astro.js --wallpapers-only

# Skip image copying (faster, use if images already copied)
node ../scripts/excel-to-astro.js --no-copy

# Remove old content before generating
node ../scripts/excel-to-astro.js --clean

# Verbose logging
node ../scripts/excel-to-astro.js --verbose
```

### Advanced Options
```bash
# Custom Excel path
node ../scripts/excel-to-astro.js --excel-path /path/to/data.xlsx

# Custom output directory
node ../scripts/excel-to-astro.js --output-dir ./src/content

# Custom images directory
node ../scripts/excel-to-astro.js --images-dir ./public/images/wallpapers

# Overwrite existing images
node ../scripts/excel-to-astro.js --overwrite
```

---

## Error Handling

### Critical Errors (Stop Execution)
- Excel file not found
- Required sheets missing (site, coleccion, sku)
- Invalid Excel format
- Output directory not writable

### Non-Critical Errors (Log + Continue)
- Missing optional columns
- Invalid data types (converts with warnings)
- Missing images (sets `error: true` flag)
- Duplicate SKU codes (uses first, warns)
- Empty collections (creates file, warns)

**Review error log after script completes to fix data issues**

---

## Best Practices

### 1. Always Review Before Committing
```bash
# Check what files will be added/modified
git status
git diff src/content/

# Verify no unintended changes
```

### 2. Test Before Deploying
```bash
# Full build test
yarn build

# Check for errors
yarn check
```

### 3. Keep Excel as Source of Truth
- ✅ Excel is the master data source
- ✅ Never edit generated markdown files directly
- ✅ Changes must go through Excel → Script → Git workflow

### 4. Version Control Excel (Optional)
```bash
# Commit Excel file for history tracking
git add data.xlsx
git commit -m "Update product data"
```

### 5. Document Changes
```bash
# Use descriptive commit messages
git commit -m "Add new collection: Textum with 78 SKUs"
git commit -m "Update Van Gogh II colors and patterns"
```

---

## Deployment Architecture

### Local Development
```
Developer machine:
├── data.xlsx (master data)
├── scripts/excel-to-astro.js (generator)
├── src/content/ (generated, committed)
└── nextspace-astro/ (Astro project)
```

### Git Repository
```
GitHub/GitLab:
├── src/content/ (committed markdown files)
├── public/images/wallpapers/ (committed images)
├── scripts/excel-to-astro.js (generator script)
└── nextspace-astro/ (Astro project)

Note: data.xlsx can be committed or ignored (.gitignore)
```

### Production (Netlify/Vercel)
```
Production build:
├── Reads src/content/ (committed files)
├── Builds static site (yarn build)
└── Deploys to CDN

Note: Excel is NEVER deployed or read in production
```

---

## Troubleshooting

### Problem: Script fails with "Excel file not found"
**Solution:** Verify `data.xlsx` is in project root (C:/decomuralweb2/)

### Problem: Images not displaying
**Solution:**
- Check image paths in Excel `folder` column
- Verify images exist in source folders
- Run with `--overwrite` if images were updated

### Problem: Spanish characters broken
**Solution:**
- Ensure Excel is saved as UTF-8
- Check generated markdown files have `# -*- coding: utf-8 -*-` if needed

### Problem: Build fails after generating content
**Solution:**
- Run `yarn check` to see TypeScript errors
- Verify content.config.ts schema matches generated frontmatter
- Check for invalid YAML syntax in generated files

### Problem: Duplicate SKU codes
**Solution:**
- Script uses first occurrence, logs warning
- Fix duplicates in Excel before regenerating

---

## Future Enhancements

### Phase 2 Features
- **Incremental updates** - Only regenerate changed content
- **Reverse script** - Export content back to Excel
- **Image optimization** - Integrate Sharp for automatic resizing
- **SEO automation** - Auto-generate meta descriptions from content
- **Validation dashboard** - Web UI to review data before generating

---

## Summary

**Remember:** This is a **content authoring tool**, not a CMS. Excel → Script → Markdown → Git → Production.

Run the script **manually** when content changes, commit the results, and deploy. Astro builds remain fast because they only read static markdown files.
