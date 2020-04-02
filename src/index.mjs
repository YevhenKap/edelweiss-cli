// @flow

import arg from 'arg'
import inquirer from 'inquirer'

type CliOptions = {
  skipPrompts: boolean,
  git: boolean,
  runInstall: boolean,
}

export async function cli(args: string[]) {
  let options = parseArgumentsIntoOptions(args)
  options = await propmpForMissingOptions(options)
  console.log(options)
}

function parseArgumentsIntoOptions(rawArgs: string[]): CliOptions {
  const args = arg({
    '--install': Boolean,
    '--git': Boolean,
    '--skip': Boolean,
    '-i': '--install',
    '-g': '--git',
    '-s': '--skip',
  })
  return {
    skipPrompts: args['--skip'] || false,
    git: args['--git'] || false,
    runInstall: args['--install'] || false,
  }
}

async function propmpForMissingOptions(options: CliOptions): Promise<CliOptions> {
  if (options.skipPrompts) {
    return options
  }

  const questions = []

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: false,
    })
  }

  if (!options.runInstall) {
    questions.push({
      type: 'confirm',
      name: 'npm',
      message: 'Install required dependencies automatically?',
      default: false,
    })
  }

  const answers = await inquirer.prompt(questions)

  return {
    ...options,
    git: options.git || answers.git,
    runInstall: options.runInstall || answers.npm
  }
}
