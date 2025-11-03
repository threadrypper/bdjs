/**
 * Recursively collect all file paths inside a directory.
 * @param {string} path - The path to collect.
 * @param {(file: string) => boolean} cb - The callback condition to collect the files.
 * @returns {string[]}
 */
export declare function recursiveCollectFiles(path: string, cb?: (file: string) => boolean): string[];
