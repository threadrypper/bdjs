export class Output {
    #value: string = ''
    #error: boolean = false

    constructor(value: string, error: boolean = false) {
        this.#value = value
        this.#error = error
    }

    /**
     * Creates an OK output.
     * @param value The value to wrap.
     * @returns {string}
     */
    static ok(value?: string): Output {
        return new Output(String(value) ?? '')
    }

    /**
     * Creates an error output.
     * @param value The value to wrap.
     * @returns {string}
     */
    static error(value?: string): Output {
        return new Output(String(value) ?? '', true)
    }

    isError() {
        return this.#error
    }

    get value() {
        return this.#value
    }
}
