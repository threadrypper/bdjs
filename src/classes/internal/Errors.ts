/**
 * Represents an error that occurs during the interpretation of BDJS code.
 */
export class InterpretingError extends Error {
    /**
     * Creates a new instance of `InterpretingError`.
     * @param {string} message The error message.
     */
    constructor(message: string) {
        super(message)
        this.name = 'InterpretingError'
    }
}

/**
 * Represents an error that occurs during the compilation of BDJS code.
 */
export class ReadingError extends Error {
    /**
     * Creates a new instance of `ReadingError`.
     * @param {string} message The error message.
     */
    constructor(message: string) {
        super(message)
        this.name = 'ReadingError'
    }
}
