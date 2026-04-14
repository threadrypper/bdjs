"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcells = void 0;
/**
 * Parses the given cells.
 * @param text - The text to resolve.
 * @param cellName - The cell name to resolve.
 * @param value - The new value.
 * @returns {string}
 */
const parcells = (text, cellName, value) => {
    return text.replaceAll(`{${cellName.trim()}}`, value);
};
exports.parcells = parcells;
