import pkg from '../templates/package.json';
import { Templates } from './enums';

export function buildPackageJsonFile(
  projectName: string,
  templateName: Templates
): string {
  const isTS = templateName === Templates.TypeScript;

  pkg.name = projectName;
  if (!isTS) {
    const devDependencies = pkg.devDependencies as Partial<
      typeof pkg.devDependencies
    >;
    delete devDependencies['@rollup/plugin-typescript'];
    delete devDependencies.tslib;
    delete devDependencies.typescript;
    delete devDependencies['typescript-plugin-css-modules'];
  }

  return JSON.stringify(pkg, null, 2);
}
