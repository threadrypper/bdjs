import { randomUUID } from 'node:crypto'

/**
 * A unique identifier for a task.
 */
export type TaskID = `[TASK-${string}]`

/**
 * Creates a unique task identifier.
 * @returns A unique task identifier.
 */
function makeTaskId(): TaskID {
    return `[TASK-${randomUUID()}]` as TaskID
}

/**
 * Closures for a task.
 */
export interface TaskClosures {
    /**
     * Whether the task has been opened.
     */
    opened: boolean

    /**
     * Whether the task has been closed.
     */
    closed: boolean
}

/**
 * Task states.
 */
export interface TaskStates {
    /**
     * Whether the task output is suppressed.
     */
    suppressed: boolean

    /**
     * Whether the task is set to catch errors no matter what.
     */
    catchAnyError: boolean

    /**
     * The closures for the task.
     */
    closures: TaskClosures
}

/**
 * Represents a compiled task by the lexer.
 */
export class Task {
    /**
     * The name of the task.
     */
    name: string = ''

    /**
     * The unique identifier for the task.
     */
    id: TaskID = makeTaskId()

    /**
     * The fields associated with the task.
     */
    fields: string[] | null = null

    /**
     * The content inside the task.
     */
    inside: string | null = null

    /**
     * The states of the task.
     */
    states: TaskStates = {
        suppressed: false,
        catchAnyError: false,
        closures: {
            opened: false,
            closed: false
        }
    }

    /**
     * The lines where the task is located.
     */
    lines: number[] = []

    /**
     * The bounds of the task.
     */
    bounds: [number, number] = [] as unknown as [number, number]

    /**
     * The parent task identifier, if any.
     */
    parentId: TaskID | null = null

    /**
     * The path of the task in the task hierarchy.
     */
    path: string[] = []

    /**
     * Nested tasks that overload this task.
     */
    overloads: Task[] = []

    /**
     * The instruction data of the task.
     */
    data: unknown = null

    /**
     * Converts the task to a system string representation.
     * @returns The system string representation of the task.
     */
    toSystemString(): string {
        return this.id
    }

    /**
     * Sets the name of the task.
     * @param name The new name of the task.
     */
    setName(name: string) {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new Error('Task name must be a non-empty string.')
        }
        this.name = name
        return this
    }

    /**
     * Sets the fields of the task.
     * @param fields The fields to set.
     */
    setFields(...fields: string[]) {
        (this.fields ??= []).push(...fields)
        return this
    }

    /**
     * Sets the inside content of the task.
     * @param inside The inside content to set.
     * @returns The updated task instance.
     */
    setInside(inside: string) {
        if (typeof inside !== 'string' || inside.trim() === '') {
            throw new Error('Task inside must be a non-empty string.')
        }
        this.inside = inside
        return this
    }

    /**
     * Filters and retrieves overloads based on a predicate.
     * @param predicate The predicate function to filter overloads.
     * @returns An array of overloads that match the predicate.
     */
    getOverloadsFor(predicate: (overload: Task) => boolean): Task[] {
        return this.overloads.filter(predicate)
    }

    /**
     * Sets the start point of the task.
     * @param position The new start point position.
     * @returns The updated task instance.
     */
    setStartPoint(position: number) {
        if (typeof position !== 'number' || position < 0) {
            throw new Error('Start point position must be a non-negative number.')
        }
        this.bounds[0] = position
        return this
    }

    /**
     * Sets the end point of the task.
     * @param position The new end point position.
     * @returns The updated task instance.
     */
    setEndPoint(position: number) {
        if (typeof position !== 'number' || position < 0) {
            throw new Error('End point position must be a non-negative number.')
        }
        this.bounds[1] = position
        return this
    }

    /**
     * Adds a line number to the task's lines.
     * @param line The line number to add.
     * @returns The updated task instance.
     */
    addLine(line: number) {
        if (typeof line !== 'number' || line < 0) {
            throw new Error('Line number must be a non-negative number.')
        }
        this.lines.push(line)
        return this
    }

    /**
     * Sets the opened state of the task.
     * @param state The new opened state. Defaults to true.
     * @returns The updated task instance.
     */
    setOpened(state = true) {
        this.states.closures.opened = state
        return this
    }

    /**
     * Sets the closed state of the task.
     * @param state The new closed state. Defaults to true.
     * @returns The updated task instance.
     */
    setClosed(state = true) {
        this.states.closures.closed = state
        return this
    }

    /**
     * Enables output suppression for the task.
     * @returns The updated task instance.
     */
    enableOutputSuppression() {
        this.states.suppressed = true
        return this
    }

    /**
     * Enables catch any error for the task.
     * @returns The updated task instance.
     */
    allowCatchAnyError() {
        this.states.catchAnyError = true
        return this
    }

    /**
     * Checks if the task has associated data.
     * @returns True if the task has data, false otherwise.
     */
    fetchData(): boolean {
        // ...this.data = null
        return this.data !== null
    }

    /**
     * Checks if the task output is suppressed.
     * @returns True if the task output is suppressed, false otherwise.
     */
    get isOutputSuppressed() {
        return this.states.suppressed === true
    }

    /**
     * Checks if the task is set to catch any error.
     * @returns True if the task is set to catch any error, false otherwise.
     */
    get isAllowedToCatchAnyError() {
        return this.states.catchAnyError === true
    }
}
