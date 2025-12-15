import XLSX from 'xlsx';
import { Logger } from './logger.js';

const SCHEMA_REQUIREMENTS = {
  coleccion: {
    required: ['Linea', 'Coleccion', 'imgfolder'],
    optional: ['visible_HeroSlider', 'HeroSliderTitle', 'HeroSliderCTA', 'Active']
  },
  sku: {
    required: ['codigo', 'linea', 'coleccion', 'filename'],
    optional: ['color', 'patron', 'marca', 'sample', 'ambiente',
               'disponible', 'nueva', 'error', 'folder']
  }
};

export class ExcelParser {
  constructor(filePath, logger = new Logger()) {
    this.filePath = filePath;
    this.logger = logger;
    this.workbook = null;
    this.sheets = {};
  }

  async load() {
    try {
      this.logger.info(`Loading Excel file: ${this.filePath}`);
      this.workbook = XLSX.readFile(this.filePath);

      // Extract all sheets
      const sheetNames = ['site', 'coleccion', 'sku', 'IndexheroSlides',
                         'CollectionShowcase', 'catalogohero', 'navmenu', 'faq', 'img'];

      for (const name of sheetNames) {
        if (this.workbook.Sheets[name]) {
          this.sheets[name] = XLSX.utils.sheet_to_json(this.workbook.Sheets[name]);
          this.logger.debug(`Loaded sheet "${name}": ${this.sheets[name].length} rows`);
        } else {
          if (name === 'coleccion' || name === 'sku') {
            throw new Error(`Required sheet "${name}" not found in Excel file`);
          }
          this.logger.warning(`Optional sheet "${name}" not found`);
          this.sheets[name] = [];
        }
      }

      this.logger.success('Excel file loaded successfully');
      return this.sheets;
    } catch (error) {
      this.logger.error(`Failed to load Excel file: ${error.message}`);
      throw error;
    }
  }

  validateSchema(sheetName, rows) {
    const schema = SCHEMA_REQUIREMENTS[sheetName];
    if (!schema) {
      this.logger.debug(`No schema validation for sheet "${sheetName}"`);
      return { valid: true, errors: [], warnings: [] };
    }

    const errors = [];
    const warnings = [];

    if (rows.length === 0) {
      warnings.push(`Sheet "${sheetName}" is empty`);
      return { valid: true, errors, warnings };
    }

    // Check required columns exist
    const firstRow = rows[0] || {};
    schema.required.forEach(col => {
      if (!(col in firstRow)) {
        errors.push(`Missing required column: ${col}`);
      }
    });

    // Validate data types and constraints
    rows.forEach((row, index) => {
      if (sheetName === 'sku') {
        if (!row.codigo || row.codigo.toString().trim() === '') {
          warnings.push(`Row ${index + 2}: Missing SKU code`);
        }

        if (row.disponible !== undefined && ![0, 1].includes(row.disponible)) {
          warnings.push(`Row ${index + 2}: Invalid 'disponible' value (expected 0 or 1)`);
        }
      }

      if (sheetName === 'coleccion') {
        if (!row.Coleccion || row.Coleccion.toString().trim() === '') {
          warnings.push(`Row ${index + 2}: Missing collection name`);
        }
      }
    });

    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  }

  validateAll() {
    this.logger.info('Validating Excel schema...');

    const results = {};
    let allValid = true;

    for (const [sheetName, rows] of Object.entries(this.sheets)) {
      const result = this.validateSchema(sheetName, rows);
      results[sheetName] = result;

      if (!result.valid) {
        allValid = false;
        result.errors.forEach(err => this.logger.error(`[${sheetName}] ${err}`));
      }

      result.warnings.forEach(warn => this.logger.warning(`[${sheetName}] ${warn}`));
    }

    if (allValid) {
      this.logger.success('Schema validation passed');
    } else {
      throw new Error('Schema validation failed');
    }

    return results;
  }

  getSheets() {
    return this.sheets;
  }
}
