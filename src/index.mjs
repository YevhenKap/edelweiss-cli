import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './create_project.mjs';

const Templates = Object.freeze({
  JavaScript: 'javascript',
  TypeScript: 'typescript',
});

/**
 * @typedef {{
 * skipPrompts: boolean,
 * git: boolean,
 * runInstall: boolean,
 * template?: Templates[keyof Templates],
 * }} CliOptions
 */

/**
 * @param {Array<string>} args
 */
export async function cli(args) {
  const options = await propmpForMissingOptions(
    parseArgumentsIntoOptions(args)
  );
  await createProject(options);
}

/**
 * @param {Array<string>} rawArgs
 * @returns {CliOptions}
 */
function parseArgumentsIntoOptions(rawArgs) {
  const args = arg({
    '--install': Boolean,
    '--git': Boolean,
    '--skip': Boolean,
    '--template': String,
    '-t': '--template',
    '-i': '--install',
    '-g': '--git',
    '-s': '--skip',
  });
  return {
    skipPrompts: args['--skip'] || false,
    git: args['--git'] || false,
    runInstall: args['--install'] || false,
    template: args['--template'] || Templates.JavaScript,
  };
}

/**
 *
 * @param {CliOptions} options
 * @returns {Promise<CliOptions>}
 */
async function propmpForMissingOptions(options) {
  if (options.skipPrompts) {
    return options;
  }

  const questions = [];

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: false,
    });
  }

  if (!options.runInstall) {
    questions.push({
      type: 'confirm',
      name: 'npm',
      message: 'Install required dependencies automatically?',
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    git: options.git || answers.git,
    runInstall: options.runInstall || answers.npm,
  };
}
