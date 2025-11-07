import type { Task } from '@core/Task'
import type { Scope } from '@core/Scope'

/**
 * Enumeration of possible data types for instruction outputs.
 */
export enum DataType {
    Any,
    Boolean,
    Number,
    String
}

/**
 * Maps DataType to its corresponding TypeScript type.
 */
export type CompileDataType<T extends DataType = DataType> = 
    T extends DataType.Boolean ? boolean
    : T extends DataType.Number ? number
    : T extends DataType.String ? string
    : unknown

/**
 * Represents the base structure for instruction values.
 */
export interface InstructionArgument<Type extends DataType = DataType> {
    /**
     * The name of the argument.
     */
    name:           string
    /**
     * A brief description of the argument.
     */
    description:    string
    /**
     * Indicates whether the argument is optional.
     */
    optional:       boolean
    /**
     * Indicates whether the argument can accept multiple values.
     */
    spread:         boolean
    /**
     * The expected data type of the argument.
     */
    type:           Type
    /**
     * A fallback value for the argument.
     * @param scope The current scope.
     * @returns The fallback value.
     */
    fallback?:      (scope: unknown) => CompileDataType<Type>
}

/**
 * Represents the base structure for all instructions.
 */
export interface Instruction {
    /**
     * The name of the instruction.
     */
    name:           `@${string}`
    /**
     * A brief description of what the instruction does.
     */
    description:    string
    /**
     * Indicates whether the instruction values should be interpreted.
     */
    interpret:      boolean
    /**
     * Indicates whether the instruction is scoped.
     */
    scoped:         boolean
    /**
     * The expected output data type of the instruction.
     */
    output?:        DataType
    /**
     * The list of arguments that the instruction accepts.
     */
    arguments?:     InstructionArgument[]
    /**
     * An example usage of the instruction.
     */
    example?:       string
    /**
     * The version of the instruction.
     */
    version?:       string
    /**
     * Executes the instruction.
     * @param fn The function to execute.
     * @param scope The scope in which to execute the function.
     * @param args The arguments to pass to the function.
     * @returns The result of the function execution.
     */
    run:            (fn: Task, scope: Scope, args: unknown[]) => Promise<string | undefined> | string | undefined
}
