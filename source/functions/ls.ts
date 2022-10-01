import fs from 'fs-extra';

/**
 * Returns array of filenames from provided directory asynchronously.
 * @param path The path to return the files of
 * @param regex The regex to filter files by (optional)
 * @returns The array of files
 */
export async function ls(path: string, regex?: RegExp) {
  const files = await fs.readdir(path);
  return regex ? files.filter((f) => regex.test(f)) : files;
}

/**
 * Returns array of filenames from provided directory.
 * @param path The path to return the files of
 * @param regex The regex to filter files by (optional)
 * @returns The array of files
 */
export function lsSync(path: string, regex?: RegExp) {
  const files = fs.readdirSync(path);
  return regex ? files.filter((f) => regex.test(f)) : files;
}
