# SAFETY PROTOCOLS - DECOMURAL PROJECT

**CRITICAL**: This document describes mandatory safety procedures to prevent data loss.

---

## 🚨 INCIDENT REPORT: December 15, 2024

### What Happened
During repository cleanup, the command `git rm -rf` was used which:
- ❌ Removed files from Git tracking
- ❌ **DELETED files from local filesystem**
- ⚠️ Required recovery from Git history

### Folders Affected (Now Restored)
- `/antique/` (49 files)
- `/elementsII/` (36 files)
- `/Elements II/` (36 files)
- `/miapaul/` (50 files)
- `/rafias/` (15 files)
- `/storiesoflife/` (70 files)
- `/Stories of Life/` (70 files)
- `/textum/` (78 files)
- `/vangoghII/` (74 files)

### Recovery Method
```bash
git checkout <commit-before-deletion> -- <folders>
```

---

## 📋 PROTECTED LOCAL FILES (NEVER DELETE)

### 1. Excel Source File
```
C:\decomuralweb2\data.xlsx
```
- **Purpose**: Master CMS data source
- **Status**: Protected by `.gitignore`
- **Backup**: Create manual backups to cloud storage
- **NEVER**: Commit to Git, delete, or overwrite without backup

### 2. Image Source Folders (Root Level)
```
C:\decomuralweb2\antique/
C:\decomuralweb2\elementsII/
C:\decomuralweb2\Elements II/
C:\decomuralweb2\miapaul/
C:\decomuralweb2\rafias/
C:\decomuralweb2\storiesoflife/
C:\decomuralweb2\Stories of Life/
C:\decomuralweb2\textum/
C:\decomuralweb2\vangoghII/
```
- **Purpose**: SOURCE folders for `excel-to-astro.js` image copying
- **Status**: Protected by `.gitignore` (as of Dec 15, 2024)
- **Used by**: `scripts/lib/image-copier.js`
- **NEVER**: Delete these folders - the script needs them as source

### 3. Generated Content (MUST COMMIT)
```
nextspace-astro/src/data/*.json
nextspace-astro/src/content/**/*.md
nextspace-astro/public/images/wallpapers/
```
- **Purpose**: Generated from Excel, used by website
- **Status**: Tracked by Git (exception in `.gitignore`)
- **MUST**: Always commit after running `excel-to-astro.js`

---

## ⛔ FORBIDDEN GIT COMMANDS

### NEVER USE THESE COMMANDS:

```bash
# DANGEROUS: Deletes local files
git rm <file>
git rm -r <folder>
git rm -rf <folder>

# DANGEROUS: Hard reset loses changes
git reset --hard <commit>
git reset --hard HEAD~1

# DANGEROUS: Force operations
git push --force
git push -f
git clean -fd

# DANGEROUS: Checkout can overwrite
git checkout -- .  # (overwrites all local changes)
```

---

## ✅ SAFE GIT COMMANDS

### To Remove from Git BUT Keep Local Files:

```bash
# Safe: Remove from Git tracking only
git rm --cached <file>
git rm --cached -r <folder>
```

### To Undo Staged Changes:

```bash
# Safe: Unstage without deleting
git reset HEAD <file>
git restore --staged <file>
```

### To Restore Deleted Files:

```bash
# Safe: Restore from previous commit
git checkout <commit-hash> -- <file>
git restore --source=<commit-hash> <file>
```

---

## 🔒 MANDATORY CHECKS BEFORE GIT OPERATIONS

### Before Running ANY git rm Command:

1. **Verify what will be affected**:
   ```bash
   git rm --dry-run -r <folder>
   ```

2. **Check if file exists locally**:
   ```bash
   ls -la <file-or-folder>
   ```

3. **Create backup if unsure**:
   ```bash
   cp -r <folder> <folder-backup-$(date +%Y%m%d)>
   ```

4. **Ask yourself**:
   - ❓ Do I need these files locally?
   - ❓ Are these the only copies?
   - ❓ What scripts/tools depend on these files?
   - ❓ Should I use `--cached` instead?

---

## 📦 BACKUP STRATEGY

### Daily Operations
- **data.xlsx**: Backup to Google Drive/Dropbox after each edit
- **Image sources**: Already backed up, but verify before any deletion
- **Generated content**: Safe (in Git)

### Before Major Changes
1. Create timestamped backup:
   ```bash
   cd /c
   tar -czf decomuralweb2_backup_$(date +%Y%m%d_%H%M%S).tar.gz \
     --exclude=node_modules \
     --exclude=.git \
     --exclude=dist \
     decomuralweb2/
   ```

2. Store in `/c/decomuralweb2_backups/`

3. Verify backup:
   ```bash
   tar -tzf <backup-file>.tar.gz | grep "data.xlsx"
   ```

---

## 🔧 EXCEL-TO-ASTRO.JS SCRIPT DEPENDENCIES

### Script Expects This Structure:
```
C:\decomuralweb2\
├── data.xlsx                    ← Excel source (CRITICAL)
├── antique/                     ← Image sources (CRITICAL)
├── elementsII/                  ← Image sources (CRITICAL)
├── [other image folders]        ← Image sources (CRITICAL)
└── scripts/
    └── excel-to-astro.js        → Reads Excel, copies images
```

### What Happens if Source Folders Missing:
```
✅ Script won't crash (handles gracefully)
⚠️ Logs warnings: "Source folder not found"
❌ Can't copy new images from Excel
❌ Stats show high "missing" count
```

### Script Behavior (image-copier.js):
- Lines 64-67: If source directory missing → logs warning, continues
- Lines 21-26: If source file missing → logs warning, increments `stats.missing`
- **Never crashes**, but silently fails to copy images

---

## 🎯 WORKFLOW: Adding New Products

### Safe Workflow:
1. **Edit Excel**: Update `data.xlsx` with new products/images
2. **Add Images**: Place new images in appropriate root-level folder
   - Example: New "antique" images → `C:\decomuralweb2\antique/`
3. **Run Script**:
   ```bash
   cd C:\decomuralweb2
   node scripts/excel-to-astro.js
   ```
4. **Verify**: Check script output for warnings/errors
5. **Test Locally**:
   ```bash
   cd nextspace-astro
   yarn dev
   ```
6. **Commit Generated Content**:
   ```bash
   git add nextspace-astro/src/content/
   git add nextspace-astro/src/data/
   git add nextspace-astro/public/images/wallpapers/
   git commit -m "Add new products: [description]"
   git push
   ```

### What Gets Committed:
- ✅ `nextspace-astro/src/content/*.md` (generated wallpaper/collection files)
- ✅ `nextspace-astro/src/data/*.json` (generated JSON data)
- ✅ `nextspace-astro/public/images/wallpapers/*` (copied images for site)

### What Stays Local Only:
- ❌ `data.xlsx` (Excel source)
- ❌ Root-level image folders (`antique/`, `elementsII/`, etc.)

---

## 🛡️ SAFEGUARDS IN PLACE

### 1. `.gitignore` Protection (Root Level)
```gitignore
# Protects Excel source
data.xlsx
*.xlsx

# Protects image source folders
/antique/
/elementsII/
/Elements II/
/miapaul/
/rafias/
/storiesoflife/
/Stories of Life/
/textum/
/vangoghII/
```

### 2. Backup Location
```
/c/decomuralweb2_backups/
├── decomural_backup_20251215_124441.tar.gz (119 MB)
└── BACKUP_README.txt
```

### 3. Git History
- All committed files can be recovered from Git history
- Use `git log --all --full-history -- <file>` to find deleted files

---

## 🚨 EMERGENCY RECOVERY

### If Image Source Folders Deleted:

```bash
# Method 1: Restore from Git history
cd /c/decomuralweb2
git checkout 199dd62 -- antique elementsII miapaul rafias storiesoflife textum vangoghII "Elements II" "Stories of Life"

# Method 2: Restore from backup (if available)
cd /c
tar -xzf decomuralweb2_backups/<backup-file>.tar.gz

# Method 3: Copy from website's public folder
# (Images already copied there, but won't have originals for future additions)
```

### If data.xlsx Deleted:

```bash
# Restore from backup
cp decomuralweb2_backups/<backup-file> /c/decomuralweb2/data.xlsx

# Or restore from cloud storage backup
```

---

## ✅ CHECKLIST: Before ANY File Deletion

- [ ] Verified file/folder is truly unnecessary
- [ ] Checked if any scripts depend on it
- [ ] Created backup if unsure
- [ ] Used `--cached` flag if removing from Git only
- [ ] Tested with `--dry-run` first
- [ ] Confirmed with user if uncertainty exists

---

## 📚 REFERENCES

### Git Documentation
- Safe file removal: https://git-scm.com/docs/git-rm
- Recovering deleted files: https://git-scm.com/book/en/v2/Git-Internals-Maintenance-and-Data-Recovery

### Project Documentation
- `CLAUDE.md` - Project overview and architecture
- `BACKUP_README.txt` - Backup instructions
- `.gitignore` - Protected files list

---

## 🔄 REVIEW AND UPDATE

**Last Updated**: December 15, 2024
**Next Review**: Before any major Git operations
**Maintainer**: Document must be reviewed before structural changes

---

**Remember**: When in doubt, DON'T DELETE. Ask first, backup always.
