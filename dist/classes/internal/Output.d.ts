export declare class Output {
    #private;
    constructor(value: string, error?: boolean);
    /**
     * Creates an OK output.
     * @param value The value to wrap.
     * @returns {string}
     */
    static ok(value?: string): Output;
    /**
     * Creates an error output.
     * @param value The value to wrap.
     * @returns {string}
     */
    static error(value?: string): Output;
    isError(): boolean;
    get value(): string;
}
