import fs from 'fs/promises';
import path from 'path';
import { Logger } from './logger.js';

export class ImageCopier {
  constructor(sourceBaseDir, destBaseDir, logger = new Logger()) {
    this.sourceBaseDir = sourceBaseDir;
    this.destBaseDir = destBaseDir;
    this.logger = logger;
    this.stats = {
      copied: 0,
      skipped: 0,
      missing: 0,
      failed: 0
    };
  }

  async copyImage(sourcePath, destPath, overwrite = false) {
    try {
      // Check if source exists
      try {
        await fs.access(sourcePath);
      } catch {
        this.stats.missing++;
        this.logger.warning(`Source image not found: ${sourcePath}`);
        return false;
      }

      // Create destination directory
      await fs.mkdir(path.dirname(destPath), { recursive: true });

      // Check if destination exists
      if (!overwrite) {
        try {
          await fs.access(destPath);
          this.stats.skipped++;
          this.logger.debug(`Skipped (already exists): ${path.basename(destPath)}`);
          return true;
        } catch {
          // Destination doesn't exist, proceed with copy
        }
      }

      // Copy file
      await fs.copyFile(sourcePath, destPath);
      this.stats.copied++;
      this.logger.debug(`Copied: ${path.basename(sourcePath)}`);
      return true;

    } catch (error) {
      this.stats.failed++;
      this.logger.error(`Failed to copy ${sourcePath}: ${error.message}`);
      return false;
    }
  }

  async copyCollectionImages(collectionFolder, overwrite = false, dryRun = false) {
    const sourceDir = path.join(this.sourceBaseDir, collectionFolder);
    const destDir = path.join(this.destBaseDir, collectionFolder);

    try {
      // Check if source directory exists
      try {
        await fs.access(sourceDir);
      } catch {
        this.logger.warning(`Source folder not found: ${sourceDir}`);
        return [];
      }

      // Read all files in source directory
      const files = await fs.readdir(sourceDir);

      // Filter for image files
      const imageExtensions = ['.webp', '.png', '.jpg', '.jpeg'];
      const imageFiles = files.filter(file =>
        imageExtensions.includes(path.extname(file).toLowerCase())
      );

      if (dryRun) {
        this.logger.info(`[DRY RUN] Would copy ${imageFiles.length} images from ${collectionFolder}/`);
        return imageFiles.map(file => path.join(destDir, file));
      }

      this.logger.info(`Copying ${imageFiles.length} images from ${collectionFolder}/`);

      const copiedPaths = [];
      for (const file of imageFiles) {
        const sourcePath = path.join(sourceDir, file);
        const destPath = path.join(destDir, file);

        const success = await this.copyImage(sourcePath, destPath, overwrite);
        if (success) {
          copiedPaths.push(destPath);
        }
      }

      return copiedPaths;

    } catch (error) {
      this.logger.error(`Failed to process folder ${collectionFolder}: ${error.message}`);
      return [];
    }
  }

  async copyGeneralPurposeImages(imgSheet, overwrite = false, dryRun = false) {
    if (!imgSheet || imgSheet.length === 0) {
      this.logger.info('No general purpose images to copy');
      return [];
    }

    this.logger.info(`\nCopying general purpose images:`);
    const copiedPaths = [];

    for (const row of imgSheet) {
      if (!row.imgfolder || !row.filename) {
        this.logger.warning(`Skipping row with missing imgfolder or filename`);
        continue;
      }

      const normalizedFolder = row.imgfolder.replace(/\\/g, '/').replace(/^\/+/, '');
      const sourcePath = path.join(this.sourceBaseDir, normalizedFolder, row.filename);
      const destPath = path.join(this.destBaseDir, normalizedFolder, row.filename);

      if (dryRun) {
        this.logger.info(`[DRY RUN] Would copy: ${normalizedFolder}/${row.filename}`);
        copiedPaths.push(destPath);
      } else {
        const success = await this.copyImage(sourcePath, destPath, overwrite);
        if (success) copiedPaths.push(destPath);
      }
    }

    return copiedPaths;
  }

  async copyAllImages(collections, imgSheet = [], overwrite = false, dryRun = false) {
    this.logger.info('Starting image copy process...');

    // Copy collection images
    const uniqueFolders = [...new Set(collections.map(c => c.imgfolder).filter(Boolean))];
    for (const folder of uniqueFolders) {
      await this.copyCollectionImages(folder, overwrite, dryRun);
    }

    // Copy general purpose images
    await this.copyGeneralPurposeImages(imgSheet, overwrite, dryRun);

    if (!dryRun) {
      this.logger.success(`Image copy complete: ${this.stats.copied} copied, ${this.stats.skipped} skipped`);
      if (this.stats.missing > 0) {
        this.logger.warning(`${this.stats.missing} images not found`);
      }
      if (this.stats.failed > 0) {
        this.logger.error(`${this.stats.failed} images failed`);
      }
    }

    return this.stats;
  }

  getStats() {
    return this.stats;
  }
}
