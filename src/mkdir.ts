import { existsSync, promises } from 'fs';

export const mkdir = async (url: string): Promise<string | boolean> =>
  !existsSync(url) && promises.mkdir(url, { recursive: true });
