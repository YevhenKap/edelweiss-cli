export const ES_CONFIG_NAME = 'es_config.mjs';

export function createEsConfigContent(options) {
  return `
  /**
   * This file contains some options that needed in development process.
   * Do not edit it and do not delete it.
   * In future it will be replaced by more optimal variant.
  */

  export const template = '${options.template}';
  `;
}
