import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import chalk from 'chalk';
import execa from 'execa';
import Listr from 'listr';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

/**
 * @param {{ templateDirectory: string, targetDirectory: string, }} options
 * @returns {Promise<void>}
 */
async function copyTemplateFiles(options) {
  await copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

/**
 * @param {string} targetDirectory
 * @returns {Promise<void>}
 */
async function initGit(targetDirectory) {
  const result = await execa('git', ['init'], {
    cwd: targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'));
  }
}

/**
 * @param {import('./index.mjs').CliOptions} options
 * @returns {Promise<void>}
 */
export async function createProject(options) {
  const targetDirectory = process.cwd();

  const templateDirectory = path.resolve(
    new URL(import.meta.url).pathname,
    '../../templates',
    options.template
  );

  try {
    await access(templateDirectory, fs.constants.R_OK);
  } catch (err) {
    console.error(`${chalk.red.bold('ERROR')} Invalid template name`);
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () =>
        copyTemplateFiles({
          targetDirectory,
          templateDirectory,
        }),
    },
    {
      title: 'Initialize git repository',
      task: () => initGit(targetDirectory),
      skip: () => (!options.git ? 'Flag --git or -g was not provided.' : false),
    },
    {
      title: 'Install dependencies',
      task: () =>
        execa('npm', ['i'], {
          cwd: targetDirectory,
        }),
      skip: () =>
        !options.runInstall ? 'Flag --install or -i was not provided.' : false,
    },
  ]);

  await tasks.run();

  console.log(`${chalk.green.bold('DONE:')} Project ready. Happy coding :)`);
}
