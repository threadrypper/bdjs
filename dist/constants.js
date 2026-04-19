"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BDJS_VERSION = exports.INTERNAL_INSTRUCTIONS_DIRECTORY = void 0;
const getVersion_1 = require("./utils/getVersion");
const path_1 = require("path");
/**
 * The directory where the internal instructions are located.
 */
exports.INTERNAL_INSTRUCTIONS_DIRECTORY = (0, path_1.join)(__dirname, 'instructions');
/**
 * The version of the library.
 */
exports.BDJS_VERSION = (0, getVersion_1.getVersion)();
