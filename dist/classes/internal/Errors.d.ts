/**
 * Represents an error that occurs during the interpretation of BDJS code.
 */
export declare class InterpretingError extends Error {
    /**
     * Creates a new instance of `InterpretingError`.
     * @param {string} message The error message.
     */
    constructor(message: string);
}
/**
 * Represents an error that occurs during the compilation of BDJS code.
 */
export declare class ReadingError extends Error {
    /**
     * Creates a new instance of `ReadingError`.
     * @param {string} message The error message.
     */
    constructor(message: string);
}
