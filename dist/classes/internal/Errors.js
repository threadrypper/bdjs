"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutOfScopeError = exports.IllegalGetterError = exports.ReadingError = exports.InterpretingError = void 0;
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
/**
 * Represents an error that occurs during the compilation of BDJS code.
 */
class ReadingError extends Error {
    /**
     * Creates a new instance of `ReadingError`.
     * @param {string} message The error message.
     */
    constructor(message) {
        super(message);
        this.name = 'ReadingError';
    }
}
exports.ReadingError = ReadingError;
/**
 * Represents an error that occurs when a getter is used illegally.
 */
class IllegalGetterError extends Error {
    /**
     * Creates a new instance of `IllegalGetterError`.
     * @param {string} message The error message.
     */
    constructor(message) {
        super(message);
        this.name = 'IllegalGetterError';
    }
}
exports.IllegalGetterError = IllegalGetterError;
/**
 * Represents an error that occurs when a variable is used out of scope.
 */
class OutOfScopeError extends Error {
    /**
     * Creates a new instance of `OutOfScopeError`.
     * @param {string} message The error message.
     */
    constructor(message) {
        super(message);
        this.name = 'OutOfScopeError';
    }
}
exports.OutOfScopeError = OutOfScopeError;
