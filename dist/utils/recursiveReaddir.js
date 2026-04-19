"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveReaddir = recursiveReaddir;
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Recursively reads a directory and returns all files.
 * @param directory The directory to read.
 * @returns {string[]} An array of file paths.
 */
function recursiveReaddir(directory, filter = () => true) {
    const files = [];
    const items = (0, fs_1.readdirSync)(directory, { withFileTypes: true });
    for (const item of items) {
        const path = (0, path_1.join)(directory, item.name);
        if (item.isDirectory()) {
            files.push(...recursiveReaddir(path, filter));
        }
        else {
            if (filter(path))
                files.push(path);
        }
    }
    return files;
}
