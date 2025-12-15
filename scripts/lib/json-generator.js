import fs from 'fs/promises';
import path from 'path';

export class JsonGenerator {
  constructor(outputDir, logger) {
    this.outputDir = outputDir;
    this.logger = logger;
  }

  /**
   * Ensure output directory exists
   */
  async ensureDirectory() {
    try {
      await fs.access(this.outputDir);
    } catch {
      await fs.mkdir(this.outputDir, { recursive: true });
      this.logger.info(`Created directory: ${this.outputDir}`);
    }
  }

  /**
   * Write JSON file with pretty formatting
   */
  async writeJson(filename, data, dryRun = false) {
    const filePath = path.join(this.outputDir, filename);
    const content = JSON.stringify(data, null, 2);

    if (dryRun) {
      this.logger.info(`[DRY RUN] Would write: ${filePath}`);
      return;
    }

    await this.ensureDirectory();
    await fs.writeFile(filePath, content, 'utf-8');
    this.logger.success(`Generated: ${filename}`);
  }

  /**
   * Generate site settings JSON from site sheet
   * Input: site sheet data (array with one row)
   * Output: src/data/site.json
   */
  async generateSiteSettings(siteSheet, dryRun = false) {
    if (!siteSheet || siteSheet.length === 0) {
      this.logger.warn('No site data found, skipping site.json');
      return;
    }

    const siteRow = siteSheet[0];
    const siteData = {
      pageTitle: siteRow.page_tittle || siteRow.page_title || '',
      announcementLabel: siteRow.Announcement_label || siteRow.announcement_label || ''
    };

    await this.writeJson('site.json', siteData, dryRun);
  }

  /**
   * Generate hero slides JSON from IndexheroSlides sheet
   * Input: IndexheroSlides sheet data
   * Output: src/data/heroSlides.json
   */
  async generateHeroSlides(slidesSheet, dryRun = false) {
    if (!slidesSheet || slidesSheet.length === 0) {
      this.logger.warn('No hero slides data found, skipping heroSlides.json');
      return;
    }

    const slides = slidesSheet.map(row => {
      // Normalize slidertype to lowercase
      const slidertype = (row.slidertype || 'collection').toLowerCase();

      // Normalize imagefolder: remove backslashes and leading slashes
      let imagefolder = row.Imagefolder || row.imagefolder || '';
      if (imagefolder) {
        imagefolder = imagefolder.replace(/\\/g, '/').replace(/^\/+/, '');
      }

      // Slugify collection name for URL consistency
      let collection = row.collection || '';
      if (collection) {
        collection = collection
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }

      return {
        indexorder: row.indexorder || 0,
        eyebrow: row.eyebrow || '',
        title: row.title || '',
        description: row.description || '',
        sampleImage: row.sampleImage || '',
        ambientImage: row.ambientImage || '',
        background: row.background || '#000000',
        textColor: row.textColor || '#ffffff',
        link: row.link || '',
        linkLabel: row.linkLabel || '',
        // NEW FIELDS FOR V2 (normalized)
        slidertype,
        imagefolder,
        collection
      };
    });

    // Sort by indexorder
    slides.sort((a, b) => a.indexorder - b.indexorder);

    await this.writeJson('heroSlides.json', slides, dryRun);
  }

  /**
   * Generate collection showcase JSON from CollectionShowcase sheet
   * Input: CollectionShowcase sheet data + coleccion sheet for filtering by Active
   * Output: src/data/collectionShowcase.json
   */
  async generateCollectionShowcase(showcaseSheet, coleccionSheet = [], dryRun = false) {
    if (!showcaseSheet || showcaseSheet.length === 0) {
      this.logger.warn('No collection showcase data found, skipping collectionShowcase.json');
      return;
    }

    // Create a map of active collections by name
    const activeCollections = new Set();
    if (coleccionSheet && coleccionSheet.length > 0) {
      coleccionSheet.forEach(col => {
        // Default to active if Active column is missing or = 1
        const isActive = col.Active === undefined || col.Active === null || col.Active === 1;
        if (isActive) {
          activeCollections.add(col.Coleccion);
        }
      });
    } else {
      // If no collection data, show all showcases
      showcaseSheet.forEach(row => activeCollections.add(row.card_title));
    }

    // Filter showcases to only include active collections
    const showcases = showcaseSheet
      .filter(row => activeCollections.has(row.card_title))
      .map(row => ({
        CollectionShowcase: row.CollectionShowcase || '',
        card_eyebrow: row.card_eyebrow || '',
        card_title: row.card_title || '',
        card_description: row.card_description || '',
        card_image: row.card_image || '',
        card_linklabel: row.card_linklabel || ''
      }));

    await this.writeJson('collectionShowcase.json', showcases, dryRun);
  }

  /**
   * Generate navigation menu JSON from navmenu sheet
   * Input: navmenu sheet data with mega menu highlight configs per line
   * Output: src/data/navmenu.json
   */
  async generateNavMenu(navmenuSheet, dryRun = false) {
    if (!navmenuSheet || navmenuSheet.length === 0) {
      this.logger.warn('No navmenu data found, skipping navmenu.json');
      return;
    }

    const navmenuData = {};

    navmenuSheet.forEach(row => {
      const linea = row.Linea || row.linea || row.label;
      if (!linea) return;

      const imageFolder = (row['mega-highlight-image-folder'] || '')
        .replace(/\\/g, '/')
        .replace(/^\/+/, ''); // Remove leading slashes
      const imageName = row['mega-highlight-image'] || '';
      const imagePath = imageFolder && imageName
        ? `/images/wallpapers/${imageFolder}/${imageName}`
        : '';

      // Generate collection slug from heading for URL
      const slugify = (text) => text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const collectionSlug = slugify(row['mega-highlight-heading'] || '');

      navmenuData[linea] = {
        enabled: row['mega-menu'] === 1,
        highlight: {
          image: imagePath,
          heading: row['mega-highlight-heading'] || '',
          text: row['mega-highlight-text'] || '',
          cta: row['mega-highlight-cta'] || '',
          url: collectionSlug ? `/catalogo?coleccion=${collectionSlug}` : '/catalogo'
        }
      };
    });

    await this.writeJson('navmenu.json', navmenuData, dryRun);
  }

  /**
   * Generate catalogo hero JSON from catalogohero sheet
   * Input: catalogohero sheet data
   * Output: src/data/catalogoHero.json
   */
  async generateCatalogoHero(catalogoSheet, dryRun = false) {
    if (!catalogoSheet || catalogoSheet.length === 0) {
      this.logger.warn('No catalogo hero data found, skipping catalogoHero.json');
      return;
    }

    const catalogoRow = catalogoSheet[0];
    const catalogoData = {
      heading: catalogoRow.heading || '',
      subheading: catalogoRow.subheading || ''
    };

    await this.writeJson('catalogoHero.json', catalogoData, dryRun);
  }

  /**
   * Generate FAQ JSON from faq sheet
   * Input: faq sheet data
   * Output: src/data/faq.json
   */
  async generateFAQ(faqSheet, dryRun = false) {
    if (!faqSheet || faqSheet.length === 0) {
      this.logger.warn('No FAQ data found, skipping faq.json');
      return;
    }

    const faqs = faqSheet.map(row => ({
      id: row.id || '',
      question: row.question || '',
      answer: row.answer || ''
    }));

    await this.writeJson('faq.json', faqs, dryRun);
  }

  /**
   * Generate all JSON files
   */
  async generateAll(sheets, dryRun = false) {
    this.logger.info('\nGenerating JSON data files:');

    if (sheets.site) {
      await this.generateSiteSettings(sheets.site, dryRun);
    }

    if (sheets.heroSlides) {
      await this.generateHeroSlides(sheets.heroSlides, dryRun);
    }

    if (sheets.collectionShowcase) {
      // Pass coleccion sheet to filter by Active column
      await this.generateCollectionShowcase(sheets.collectionShowcase, sheets.coleccion, dryRun);
    }

    if (sheets.catalogoHero) {
      await this.generateCatalogoHero(sheets.catalogoHero, dryRun);
    }

    if (sheets.navmenu) {
      await this.generateNavMenu(sheets.navmenu, dryRun);
    }

    if (sheets.faq) {
      await this.generateFAQ(sheets.faq, dryRun);
    }

    this.logger.success('JSON generation complete');
  }
}
