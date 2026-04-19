"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersion = getVersion;
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Gets the version of the library.
 * @returns {string} The version of the library.
 */
function getVersion() {
    return JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '..', '..', 'package.json'), 'utf-8')).version;
}
