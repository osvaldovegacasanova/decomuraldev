import chalk from 'chalk';

export class Logger {
  constructor(verbose = false) {
    this.verbose = verbose;
    this.warnings = [];
    this.errors = [];
  }

  success(message) {
    console.log(chalk.green('✓') + ' ' + message);
  }

  error(message) {
    console.log(chalk.red('✗') + ' ' + message);
    this.errors.push(message);
  }

  warning(message) {
    console.log(chalk.yellow('⚠') + ' ' + message);
    this.warnings.push(message);
  }

  info(message) {
    console.log(chalk.blue('→') + ' ' + message);
  }

  debug(message) {
    if (this.verbose) {
      console.log(chalk.gray('  ' + message));
    }
  }

  summary() {
    return {
      totalErrors: this.errors.length,
      totalWarnings: this.warnings.length,
      errors: this.errors,
      warnings: this.warnings
    };
  }
}
