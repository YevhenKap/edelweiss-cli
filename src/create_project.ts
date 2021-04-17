import { resolve } from 'path';

import chalk from 'chalk';

import { mkdir } from './mkdir';
import { copyTemplate } from './copy_template';
import { asyncSequence } from './async_sequence';
import { createPackageJson } from './package_json';

export const createProject = async (
  folder: string = process.cwd()
): Promise<void> =>
  asyncSequence(
    mkdir,
    createPackageJson,
    copyTemplate
  )(resolve(folder)).then(() => {
    console.log();

    if (folder !== process.cwd()) {
      console.log(`Navigate to ${chalk.green(folder)}:`);
      console.log(`  ${chalk.gray('-')} ${chalk.magenta('cd ' + folder)}`);
      console.log();
      console.log('And then 👇');
      console.log();
    }

    console.log('To start developing application use:');
    console.log(`  ${chalk.gray('-')} ${chalk.magenta('npm start')}`);
    console.log();
    console.log('To build application use:');
    console.log(`  ${chalk.gray('-')} ${chalk.magenta('npm run build')}`);
    console.log();
    console.log(`${chalk.bold.blue('Done!')} Happy coding ✌️`);
  });
