# Decomural - Papeles Murales Chile

Primera fábrica de papeles murales de Chile. Sitio web de catálogo con diseños exclusivos, personalizados, infantiles y vinílicos.

## 🚀 Deployment

**Live Site**: https://decomural.netlify.app
**GitHub Repo**: https://github.com/osvaldovegacasanova/decomuraldev

### Repository Structure

This repository contains ONLY the files needed for deployment:

```
decomuraldev/
├── .gitignore              # Git configuration
├── README.md               # This file
├── CLAUDE.md               # Project documentation
├── netlify.toml            # Netlify deployment config
└── nextspace-astro/        # Complete Astro website
    ├── src/
    │   ├── content/        # Generated content (collections, wallpapers)
    │   ├── data/           # Generated JSON data
    │   ├── config/         # Site configuration
    │   ├── layouts/        # Page layouts
    │   └── pages/          # Route pages
    ├── public/
    │   └── images/         # Optimized images
    ├── package.json        # Dependencies
    ├── yarn.lock           # Locked dependency versions
    └── astro.config.mjs    # Astro configuration
```

## 🛠️ Local Development Workflow

### Prerequisites
- Node.js 20+
- Yarn 1.22.22
- Excel file: `data.xlsx` (local only, not in Git)

### Local Directory Structure

```
C:\decomuralweb2/          # Local working directory
├── data.xlsx              # ❌ Excel CMS source (LOCAL ONLY, protected)
├── antique/               # ❌ Image source folders (LOCAL ONLY)
├── elementsII/            # ❌ (used by content generation script)
├── tienda/                # ❌ ...
├── scripts/               # ❌ Content generation tools (LOCAL ONLY)
│   └── excel-to-astro.js  # Script to generate content from Excel
└── nextspace-astro/       # ✅ Website (tracked in Git)
```

**IMPORTANT**: Only `nextspace-astro/` is in GitHub. Everything else stays local.

### Content Update Workflow

When adding or updating products:

1. **Edit Excel**: Update `data.xlsx` (local file)
2. **Add Images**: Place in appropriate source folder (e.g., `antique/`)
3. **Generate Content**:
   ```bash
   cd C:\decomuralweb2
   node scripts/excel-to-astro.js
   ```
4. **Test Locally**:
   ```bash
   cd nextspace-astro
   yarn dev
   # Visit http://localhost:4324
   ```
5. **Commit & Deploy**:
   ```bash
   cd ..
   git add nextspace-astro/src/content/
   git add nextspace-astro/src/data/
   git add nextspace-astro/public/images/
   git commit -m "Update products: [description]"
   git push
   ```
   Netlify auto-deploys on push (3-5 minutes)

## 📦 Tech Stack

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS 4.x
- **Package Manager**: Yarn 1.22.22
- **Node Version**: 20.x
- **Hosting**: Netlify
- **CMS**: Excel (local, offline)

## 🏗️ Build & Deployment

### Netlify Configuration

Located at repository root: `netlify.toml`

```toml
[build]
  base = "nextspace-astro"      # Run commands from this directory
  publish = "dist"               # Publish this folder
  command = "yarn build"         # Build command

[build.environment]
  NODE_VERSION = "20"            # Node.js version
```

### Build Process

1. Netlify detects push to `main` branch
2. Runs `yarn install` in `nextspace-astro/`
3. Runs `yarn build` to generate static site
4. Publishes `nextspace-astro/dist/` folder
5. Site live at https://decomural.netlify.app

**Build Time**: 3-7 minutes (includes image optimization)

## 📁 Content Collections

| Collection Type | Count | Location |
|----------------|-------|----------|
| Collections | 19 | `nextspace-astro/src/content/collections/` |
| Wallpapers (SKUs) | 323 | `nextspace-astro/src/content/wallpapers/` |
| Product Images | 375 | `nextspace-astro/public/images/wallpapers/` |

## 🔒 Protected Local Files

These files NEVER get committed to Git:

- `data.xlsx` - Master Excel file (backup to cloud storage!)
- Image source folders (`antique/`, `elementsII/`, etc.)
- `scripts/` - Content generation tools
- Documentation `.md` files (except README.md, CLAUDE.md)

## 📚 Documentation

- **CLAUDE.md** - Detailed project architecture and development guide
- **Local docs** - Additional documentation in local working directory (not in Git)

## ⚠️ Important Notes

1. **Excel File**: `data.xlsx` is the ONLY source not version-controlled. Create regular backups!
2. **Image Sources**: Root-level image folders are needed locally for content generation
3. **Generated Content**: Always commit generated files after running `excel-to-astro.js`
4. **Deployment**: Automatic on push to `main` branch

## 🆘 Support

For questions about the codebase, refer to `CLAUDE.md` in this repository.

---

**Built with ❤️ in Chile**
