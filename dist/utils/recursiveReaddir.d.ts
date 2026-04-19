/**
 * Recursively reads a directory and returns all files.
 * @param directory The directory to read.
 * @returns {string[]} An array of file paths.
 */
export declare function recursiveReaddir(directory: string, filter?: (file: string) => boolean): string[];
