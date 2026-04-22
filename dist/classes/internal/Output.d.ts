export declare enum OutputType {
    OK = "ok",
    ERROR = "error",
    WARNING = "warning",
    OK_BUT_EMPTY = "okButEmpty",
    STOP = "stop"
}
export declare class Output<T = string> {
    #private;
    private constructor();
    static ok<T>(value?: T): Output<T>;
    static error(message: string): Output<unknown>;
    static warning<T>(value: T, message?: string): Output<T>;
    static okButEmpty(): Output<never>;
    static stop(): Output<never>;
    get value(): T;
    get type(): OutputType;
    get message(): string | undefined;
    isOk(): this is Output<T>;
    isError(): this is Output<never>;
    isWarning(): boolean;
}
