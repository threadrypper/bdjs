"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterpretingError = void 0;
/**
 * Represents an error that occurs during the interpretation of BDJS code.
 */
class InterpretingError extends Error {
    /**
     * Creates a new instance of `InterpretingError`.
     * @param {string} message The error message.
     */
    constructor(message) {
        super(message);
        this.name = 'InterpretingError';
    }
}
exports.InterpretingError = InterpretingError;
