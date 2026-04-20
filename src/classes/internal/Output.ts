export enum OutputType {
    OK = 'ok',
    ERROR = 'error',
    WARNING = 'warning',
    OK_BUT_EMPTY = 'okButEmpty',
    STOP = 'stop'
}

export class Output<T = string> {
    #value?: T
    #type: OutputType
    #message?: string

    private constructor(type: OutputType, value?: T, message?: string) {
        this.#type = type
        this.#value = value
        this.#message = message
    }

    static ok<T>(value?: T): Output<T> {
        return new Output<T>(OutputType.OK, value)
    }

    static error(message: string): Output<unknown> {
        return new Output(OutputType.ERROR, undefined, message)
    }

    static warning<T>(value: T, message?: string): Output<T> {
        return new Output(OutputType.WARNING, value, message)
    }

    static okButEmpty(): Output<never> {
        return new Output(OutputType.OK_BUT_EMPTY)
    }

    static stop(): Output<never> {
        return new Output(OutputType.STOP)
    }

    get value(): T {
        if (this.isError()) {
            throw new Error('Tried to access value of an error output')
        }

        return this.#value as T
    }

    get type() {
        return this.#type
    }

    get message() {
        return this.#message
    }

    isOk(): this is Output<T> {
        return this.#type === OutputType.OK
    }

    isError(): this is Output<never> {
        return this.#type === OutputType.ERROR
    }

    isWarning(): boolean {
        return this.#type === OutputType.WARNING
    }
}