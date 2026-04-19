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

/**
 * Represents an error that occurs when a getter is used illegally.
 */
export class IllegalGetterError extends Error {
    /**
     * Creates a new instance of `IllegalGetterError`.
     * @param {string} message The error message.
     */
    constructor(message: string) {
        super(message)
        this.name = 'IllegalGetterError'
    }
}

/**
 * Represents an error that occurs when a variable is used out of scope.
 */
export class OutOfScopeError extends Error {
    /**
     * Creates a new instance of `OutOfScopeError`.
     * @param {string} message The error message.
     */
    constructor(message: string) {
        super(message)
        this.name = 'OutOfScopeError'
    }
}