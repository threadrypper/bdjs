"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = buildErrorMessage;
/**
 * Builds an error message.
 * @param headerMessage - The header message.
 * @param additionalInfo - Additional information.
 * @param sourceString - The source string.
 * @param line - The line number.
 * @returns {string} The error message.
 */
function buildErrorMessage(headerMessage, additionalInfo, sourceString, line = NaN) {
    return [
        headerMessage,
        ...additionalInfo.map((value) => `|-> ${value}`),
        `|-> Line: ${isNaN(line) ? 'Unknown' : line}`,
        `|-> Source: "${sourceString}"`,
        `|   ${' '.repeat(9)}${'^'.repeat(sourceString.length)}`,
        '|--------------------------------------------'
    ].join('\n');
}
