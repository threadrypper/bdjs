import { Output } from './Output'
import { Runtime } from './Runtime'

export enum DataType {
    ANY = 'any',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
    ARRAY = 'array',
    OBJECT = 'object',
    NULL = 'null',
    UNDEFINED = 'undefined'
}

export interface InstructionArgOptions {
    name: string
    description: string
    required: boolean
    type: DataType
    spread: boolean
    unescape?: boolean
}

interface BaseInstruction {
    /**
     * The name of the instruction.
     * @example
     * ```js
     * '$meow'
     * ```
     */
    name: `$${string}`
    /**
     * The description of the instruction.
     * @example
     * ```js
     * 'Meows like a cat.'
     * ```
     */
    description: string
    /**
     * If true, it means this instruction will interpret the arguments.
     */
    interpret: boolean
    /**
     * The arguments for this instruction.
     */
    args?: InstructionArgOptions[]
    /**
     * If true, it means this instruction requires brackets.
     * This property is set automatically.
     */
    brackets?: boolean
    /**
     * If true, it means this is an experimental function.
     */
    experimental?: true
    /**
     * If true, it means this is a deprecated function.
     */
    deprecated?: true
    /**
     * @ignore
     * The version when this function was introduced.
     * **DO NOT PROVIDE THIS.**
     */
    version?: string
    /**
     * The output type of the instruction.
     * @example
     * ```js
     * DataType.NUMBER
     * ```
     */
    output?: DataType
    run: (runtime: Runtime, args?: string[]) => Promise<Output> | Output
}

export interface NormalInstruction extends BaseInstruction {
    /**
     * If undefined, it means this is not a builder function.
     */
    builder?: false | undefined
    /**
     * This value does not exist.
     */
    builderOptions?: never
}

export interface BuilderInstruction extends BaseInstruction {
    /**
     * If true, wont be loaded at startup.
     */
    builder: true
    /**
     * @ignore
     * @returns {boolean}
     * The options for the builder function.
     */
    builderOptions: {
        /**
         * Checks if the parent instruction is allowed to use this builder.
         * @param {string} name The name of the parent instruction.
         * @returns {boolean}
         */
        allowFor: (name: string) => boolean
    }
}

/**
 * Union type for instructions.
 */
export type IBDJSInstruction = NormalInstruction | BuilderInstruction
