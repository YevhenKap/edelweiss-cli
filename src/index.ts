import arg from 'arg';
import inquirer from 'inquirer';
import { Templates } from './enums';
import { CliOptions } from './types';
import { createProject } from './create_project';

export async function cli(args: ReadonlyArray<string>): Promise<void> {
  const options = await propmpForMissingOptions(
    parseArgumentsIntoOptions(args)
  );
  await createProject(options);
}

function parseArgumentsIntoOptions(rawArgs: ReadonlyArray<string>): CliOptions {
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
    skipPrompts: args['--skip'] ?? false,
    git: args['--git'] ?? false,
    runInstall: args['--install'] ?? false,
    template: (args['--template'] as Templates) ?? Templates.JavaScript,
    dirname: args._[0] ?? '.',
  };
}

async function propmpForMissingOptions(
  options: CliOptions
): Promise<CliOptions> {
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
    git: options.git ?? answers.git,
    runInstall: options.runInstall ?? answers.npm,
  };
}
