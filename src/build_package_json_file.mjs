import package from '../templates/package.json';

/**
 * @param {string} projectName
 * @param {'javascript' | 'typescript'} templateName
 * @returns {string}
 */
export function buildPackageJsonFile(projectName, templateName) {
  const isTS = templateName === 'typescript';

  package.name = projectName;
  if (!isTS) {
    delete package.devDependencies['@rollup/plugin-typescript'];
    delete package.devDependencies.tslib;
    delete package.devDependencies.typescript;
    delete package.devDependencies['typescript-plugin-css-modules'];
  }

  return JSON.stringify(package, null, 2);
}
