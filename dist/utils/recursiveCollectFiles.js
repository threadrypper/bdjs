"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveCollectFiles = recursiveCollectFiles;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
/**
 * Recursively collect all file paths inside a directory.
 * @param {string} path - The path to collect.
 * @param {(file: string) => boolean} cb - The callback condition to collect the files.
 * @returns {string[]}
 */
function recursiveCollectFiles(path, cb = (file) => file.endsWith('.js')) {
    const collected = [];
    const files = (0, node_fs_1.readdirSync)(path, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            collected.push(...recursiveCollectFiles((0, node_path_1.join)(path, file.name), cb));
        }
        else if (cb && cb(file.name)) {
            collected.push((0, node_path_1.join)(path, file.name));
        }
    }
    return collected;
}
