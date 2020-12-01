import { Templates } from './enums';

export interface CliOptions {
  git: boolean;
  dirname: string;
  template: Templates;
  runInstall: boolean;
  skipPrompts: boolean;
}

export interface CopyTemplateOptions {
  targetDirectory: string;
  templateDirectory: string;
}
