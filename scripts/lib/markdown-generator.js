import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import slugify from 'slugify';
import { Logger } from './logger.js';

export class MarkdownGenerator {
  constructor(outputDir, logger = new Logger()) {
    this.outputDir = outputDir;
    this.logger = logger;
  }

  generateSlug(text) {
    return slugify(text, {
      lower: true,
      strict: true,
      locale: 'es'
    });
  }

  generateCollectionFrontmatter(collectionData, skus) {
    // Normalize linea value
    const normalizedLinea = collectionData.Linea === 'Vinilico' ? 'Vinilicos' : collectionData.Linea;

    // Filter SKUs for this collection
    const collectionSkus = skus.filter(sku =>
      sku.coleccion === collectionData.Coleccion &&
      (sku.linea === collectionData.Linea || (collectionData.Linea === 'Vinilico' && sku.linea === 'Vinilicos'))
    );

    // Aggregate unique values
    const colors = [...new Set(collectionSkus.map(s => s.color).filter(Boolean))];
    const patterns = [...new Set(collectionSkus.map(s => s.patron).filter(Boolean))];

    const slug = this.generateSlug(collectionData.Coleccion);
    const normalizedFolder = (collectionData.imgfolder || collectionData.Coleccion)
      .replace(/\\/g, '/')
      .replace(/^\//, '');

    const template = {
      title: collectionData.Coleccion,
      meta_title: `Papel Mural ${collectionData.Coleccion} - Colección ${normalizedLinea}`,
      description: `Colección ${collectionData.Coleccion} de papeles murales ${normalizedLinea}.`,
      draft: false,
      active: collectionData.Active === 1 || collectionData.Active === undefined || collectionData.Active === null,
      linea: normalizedLinea,
      slug: slug,
      folder: normalizedFolder,
      hero_slider: {
        enabled: collectionData.visible_HeroSlider === 1,
        eyebrow: normalizedLinea,
        title: collectionData.HeroSliderTitle || collectionData.Coleccion,
        description: '',
        cta_text: collectionData.HeroSliderCTA || 'Ver Catálogo',
        cta_link: `/catalogo?coleccion=${slug}`,
        image: null
      },
      showcase: {
        featured: false,
        featured_image: null,
        order: 0
      },
      sku_count: collectionSkus.length,
      available_colors: colors,
      available_patterns: patterns
    };

    return yaml.dump(template, { lineWidth: -1, quotingType: '"', forceQuotes: false });
  }

  generateWallpaperFrontmatter(skuData, images) {
    const collectionSlug = this.generateSlug(skuData.coleccion);
    // Normalize linea value
    const normalizedLinea = skuData.linea === 'Vinilico' ? 'Vinilicos' : skuData.linea;

    const template = {
      title: `${skuData.coleccion} - SKU ${skuData.codigo}`,
      description: `Papel mural ${skuData.coleccion}${skuData.color && skuData.color !== 'default' ? ` en ${skuData.color}` : ''}${skuData.patron ? ` con patrón ${skuData.patron}` : ''}.`,
      draft: skuData.disponible !== 1,
      codigo: skuData.codigo.toString(),
      linea: normalizedLinea,
      coleccion: skuData.coleccion,
      coleccion_slug: collectionSlug,
      color: skuData.color || 'default',
      patron: skuData.patron || null,
      habitacion: null,
      images: {
        sample: images.sample || null,
        ambiente: images.ambiente.length > 0 ? images.ambiente : null
      },
      nueva: skuData.nueva === 1,
      disponible: skuData.disponible === 1,
      error: skuData.error === 1 || !images.sample,
      image: images.sample || (images.ambiente[0] || null),
      date: new Date().toISOString().split('T')[0]
    };

    return yaml.dump(template, { lineWidth: -1, quotingType: '"', forceQuotes: false });
  }

  async writeMarkdownFile(filePath, frontmatter, content = '') {
    try {
      const markdown = `---\n${frontmatter}---\n\n${content}`;

      // Ensure directory exists
      await fs.mkdir(path.dirname(filePath), { recursive: true });

      // Write with UTF-8 encoding
      await fs.writeFile(filePath, markdown, { encoding: 'utf8' });

      this.logger.debug(`Created: ${path.relative(this.outputDir, filePath)}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to write ${filePath}: ${error.message}`);
      return false;
    }
  }

  async generateCollectionFile(collectionData, skus, dryRun = false) {
    const slug = this.generateSlug(collectionData.Coleccion);
    const filePath = path.join(this.outputDir, 'collections', `${slug}.md`);
    const frontmatter = this.generateCollectionFrontmatter(collectionData, skus);

    if (dryRun) {
      this.logger.info(`[DRY RUN] Would create: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }

    return await this.writeMarkdownFile(filePath, frontmatter);
  }

  async generateWallpaperFile(skuData, images, dryRun = false) {
    const collectionSlug = this.generateSlug(skuData.coleccion);
    const codigo = skuData.codigo.toString().replace(/[^a-zA-Z0-9-_]/g, '-');
    const filePath = path.join(this.outputDir, 'wallpapers', collectionSlug, `${codigo}.md`);
    const frontmatter = this.generateWallpaperFrontmatter(skuData, images);

    if (dryRun) {
      this.logger.debug(`[DRY RUN] Would create: ${path.relative(process.cwd(), filePath)}`);
      return true;
    }

    return await this.writeMarkdownFile(filePath, frontmatter);
  }

  async cleanDirectory(dir) {
    try {
      await fs.rm(dir, { recursive: true, force: true });
      this.logger.info(`Cleaned directory: ${dir}`);
    } catch (error) {
      this.logger.warning(`Failed to clean directory ${dir}: ${error.message}`);
    }
  }
}
