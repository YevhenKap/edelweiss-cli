// @flow

import chalk from 'chalk'
import fs from 'fs'
import ncp from 'ncp'
import path from 'path'
import { promisify } from 'util'
import execa from 'execa'
import Listr from 'listr'

import type { CliOptions } from './index.mjs'

const access = promisify(fs.access)
const copy = promisify(ncp)

async function copyTemplateFiles(options: {
  templateDirectory: string,
  targetDirectory: string,
}) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  })
}

async function initGit(targetDirectory: string) {
  const result = await execa('git', ['init'], {
    cwd: targetDirectory,
  })
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'))
  }
}

export async function createProject(options: CliOptions) {
  const targetDirectory = process.cwd()

  const templateDirectory = path.resolve(
    new URL(import.meta.url).pathname,
    '../../templates',
    options.template
  )

  try {
    await access(templateDirectory, fs.constants.R_OK)
  } catch (err) {
    console.error(`${chalk.red.bold('ERROR')} Invalid template name`)
    process.exit(1)
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
      title: 'Initialize git',
      task: () => initGit(targetDirectory),
      enabled: () => options.git,
    },
    {
      title: 'Install dependencies',
      task: () =>
        execa('npm', ['i'], {
          cwd: targetDirectory
        }),
      skip: () =>
        !options.runInstall
          ? 'Pass --install or -i to automatically install dependencies'
          : undefined,
    },
  ])

  await tasks.run()

  console.log(`${chalk.green.bold('DONE')} Project ready`)
}
