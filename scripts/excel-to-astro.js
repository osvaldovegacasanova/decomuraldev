#!/usr/bin/env node

import { program } from 'commander';
import path from 'path';
import { fileURLToPath } from 'url';
import { Logger } from './lib/logger.js';
import { ExcelParser } from './lib/excel-parser.js';
import { MarkdownGenerator } from './lib/markdown-generator.js';
import { ImageCopier } from './lib/image-copier.js';
import { JsonGenerator } from './lib/json-generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CLI Configuration
program
  .name('excel-to-astro')
  .description('Generate Astro content collections from Excel data')
  .version('1.0.0')
  .option('-e, --excel-path <path>', 'Path to Excel file', path.join(__dirname, '..', 'data.xlsx'))
  .option('-o, --output-dir <path>', 'Output directory', path.join(__dirname, '..', 'nextspace-astro', 'src', 'content'))
  .option('-i, --images-dir <path>', 'Images output directory', path.join(__dirname, '..', 'nextspace-astro', 'public', 'images', 'wallpapers'))
  .option('-d, --dry-run', 'Preview changes without writing files', false)
  .option('--no-copy', 'Skip image copying')
  .option('--overwrite', 'Overwrite existing images', false)
  .option('--collections-only', 'Generate only collection files', false)
  .option('--wallpapers-only', 'Generate only wallpaper files', false)
  .option('-v, --verbose', 'Verbose logging', false)
  .option('--clean', 'Remove existing generated files before creating new ones', false)
  .parse();

const options = program.opts();

// Initialize logger
const logger = new Logger(options.verbose);

// Helper functions
function mapImagePath(row, baseFolder) {
  // Normalize folder path to use forward slashes
  const normalizedFolder = baseFolder.replace(/\\/g, '/').replace(/^\//, '');
  const folder = `/images/wallpapers/${normalizedFolder}`;

  if (!row.filename) {
    return { sample: null, ambiente: [] };
  }

  if (row.sample === 1 && row.ambiente === 0) {
    return { sample: `${folder}/${row.filename}`, ambiente: [] };
  }

  if (row.sample === 1 && row.ambiente === 1) {
    return {
      sample: `${folder}/${row.codigo}.webp`,
      ambiente: [`${folder}/${row.filename}`]
    };
  }

  if (row.sample === 0 && row.ambiente === 1) {
    return { sample: null, ambiente: [`${folder}/${row.filename}`] };
  }

  return { sample: null, ambiente: [] };
}

function aggregateSkuImages(skuRows, baseFolder) {
  const images = { sample: null, ambiente: [] };

  skuRows.forEach(row => {
    const mapped = mapImagePath(row, baseFolder);
    if (mapped.sample && !images.sample) {
      images.sample = mapped.sample;
    }
    if (mapped.ambiente.length) {
      images.ambiente.push(...mapped.ambiente);
    }
  });

  return images;
}

function groupBySku(skuSheet) {
  const grouped = {};

  skuSheet.forEach(row => {
    const codigo = row.codigo?.toString().trim();
    if (!codigo) return;

    if (!grouped[codigo]) {
      grouped[codigo] = [];
    }
    grouped[codigo].push(row);
  });

  return grouped;
}

// Main execution
async function main() {
  const startTime = Date.now();

  try {
    logger.info('Excel to Astro Content Generator');
    logger.info('=================================\n');
    logger.info(`Reading from Excel: ${options.excelPath}\n`);

    // Step 1: Parse Excel
    const parser = new ExcelParser(options.excelPath, logger);
    await parser.load();
    parser.validateAll();

    const sheets = parser.getSheets();
    const { coleccion, sku, site, IndexheroSlides, CollectionShowcase, catalogohero, navmenu, faq, img } = sheets;

    // Step 2: Generate JSON Data Files
    const jsonOutputDir = path.join(__dirname, '..', 'nextspace-astro', 'src', 'data');
    const jsonGenerator = new JsonGenerator(jsonOutputDir, logger);
    await jsonGenerator.generateAll({
      site,
      heroSlides: IndexheroSlides,
      collectionShowcase: CollectionShowcase,
      catalogoHero: catalogohero,
      coleccion,
      navmenu,
      faq
    }, options.dryRun);

    // Step 3: Copy Images (if enabled)
    if (options.copy && !options.wallpapersOnly) {
      const sourceBaseDir = path.join(__dirname, '..');
      const copier = new ImageCopier(sourceBaseDir, options.imagesDir, logger);
      await copier.copyAllImages(coleccion, img || [], options.overwrite, options.dryRun);
    }

    // Step 4: Initialize markdown generator
    const generator = new MarkdownGenerator(options.outputDir, logger);

    // Step 5: Clean directories if requested
    if (options.clean && !options.dryRun) {
      if (!options.wallpapersOnly) {
        await generator.cleanDirectory(path.join(options.outputDir, 'collections'));
      }
      if (!options.collectionsOnly) {
        await generator.cleanDirectory(path.join(options.outputDir, 'wallpapers'));
      }
    }

    // Step 6: Generate Collections
    let collectionsCount = 0;
    if (!options.wallpapersOnly) {
      logger.info('\nProcessing Collections:');

      for (const collection of coleccion) {
        await generator.generateCollectionFile(collection, sku, options.dryRun);
        collectionsCount++;
      }

      logger.success(`Generated ${collectionsCount} collection files`);
    }

    // Step 7: Generate Wallpapers
    let wallpapersCount = 0;
    if (!options.collectionsOnly) {
      logger.info('\nProcessing Wallpapers:');

      const groupedSkus = groupBySku(sku);

      for (const [codigo, skuRows] of Object.entries(groupedSkus)) {
        const firstRow = skuRows[0];
        const collectionData = coleccion.find(c => c.Coleccion === firstRow.coleccion);
        const baseFolder = collectionData?.imgfolder || firstRow.folder || firstRow.coleccion;

        const images = aggregateSkuImages(skuRows, baseFolder);

        await generator.generateWallpaperFile(firstRow, images, options.dryRun);
        wallpapersCount++;
      }

      logger.success(`Generated ${wallpapersCount} wallpaper files`);
    }

    // Step 8: Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    const summary = logger.summary();

    logger.info('\n' + '='.repeat(50));
    logger.info('Summary:');
    logger.info(`  Collections: ${collectionsCount} created`);
    logger.info(`  Wallpapers: ${wallpapersCount} created`);
    logger.info(`  Warnings: ${summary.totalWarnings}`);
    logger.info(`  Errors: ${summary.totalErrors}`);
    logger.info(`  Duration: ${duration}s`);

    if (options.dryRun) {
      logger.info('\n[DRY RUN] No files were actually created');
    } else {
      logger.success('\n✓ Content generation complete!');
    }

    process.exit(0);

  } catch (error) {
    logger.error(`\nFatal error: ${error.message}`);
    if (options.verbose) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
