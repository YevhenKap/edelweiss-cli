// @flow

import arg from 'arg'
import inquirer from 'inquirer'
import { createProject } from './create_project.mjs'

export type CliOptions = {
  skipPrompts: boolean,
  git: boolean,
  runInstall: boolean,
  template?: 'js' | 'flow-js',
}

export async function cli(args: string[]) {
  let options = parseArgumentsIntoOptions(args)
  options = await propmpForMissingOptions(options)
  await createProject(options)
}

function parseArgumentsIntoOptions(rawArgs: string[]): CliOptions {
  const args = arg({
    '--install': Boolean,
    '--git': Boolean,
    '--skip': Boolean,
    '--template': String,
    '-t': '--template',
    '-i': '--install',
    '-g': '--git',
    '-s': '--skip',
  })
  return {
    skipPrompts: args['--skip'] || false,
    git: args['--git'] || false,
    runInstall: args['--install'] || false,
    template: args['--template'],
  }
}

async function propmpForMissingOptions(
  options: CliOptions
): Promise<CliOptions> {
  const defaultTemplate = 'js'

  if (options.skipPrompts) {
    if (!options.template) {
      options.template = defaultTemplate
    }
    return options
  }

  const questions = []

  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['js', 'flow-js'],
      default: defaultTemplate,
    })
  }

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
    runInstall: options.runInstall || answers.npm,
    template: options.template || answers.template,
  }
}
