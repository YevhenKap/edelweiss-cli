import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import chalk from 'chalk';
import execa from 'execa';
import Listr from 'listr';
import { promisify } from 'util';
import { buildPackageJsonFile } from './build_package_json_file.mjs';
import { buildRollupConfigFile } from './build_rollup_config_file.mjs';

const access = promisify(fs.access);
const copy = promisify(ncp);

function getAbsolutePathToTemplateDir(dirName) {
  return path.resolve(
    new URL(import.meta.url).pathname,
    `../../templates/${dirName}`
  );
}

/** Path of common directory where are common files for all templates. */
const COMMON_DIR_PATH = getAbsolutePathToTemplateDir('common');

/**
 * @param {{ templateDirectory: string, targetDirectory: string, }} options
 * @returns {Promise<void>}
 */
async function copyTemplateFiles(options) {
  await copy(COMMON_DIR_PATH, options.targetDirectory, {
    clobber: false,
  });
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
  const targetDirectory =
    options.dirname === '.' ? process.cwd() : options.dirname;

  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory);
  }

  const templateDirectory = getAbsolutePathToTemplateDir(options.template);

  try {
    await access(templateDirectory, fs.constants.R_OK);
  } catch (err) {
    console.error(`${chalk.red.bold('ERROR')} Invalid template name`);
    process.exit(1);
  }

  /** Creates config for Rollup. */
  const rollupContent = buildRollupConfigFile(
    options.template,
    targetDirectory
  );
  fs.writeFileSync(`${targetDirectory}/rollup.config.mjs`, rollupContent);

  /** Creates package.json. */
  const packageContent = buildPackageJsonFile(
    options.dirname,
    options.template
  );
  fs.writeFileSync(`${targetDirectory}/package.json`, packageContent);

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

  console.log(`${chalk.green.bold('DONE:')} Project is ready. Happy coding :)`);
}
