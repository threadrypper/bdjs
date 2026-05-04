import { DiscordClient } from '@structures/DiscordClient'
import type { ClientEvents } from 'discord.js'

export type AssertArgs<T> = T extends unknown[] ? T : never

export interface IEventHandler<Events, T extends keyof Events> {
    /**
     * The name of the event.
     */
    name: T
    /**
     * The description of the event.
     */
    description: string
    /**
     * The function to run when the event is triggered.
     */
    run: (client: DiscordClient, ...args: AssertArgs<Events[T]>) => Promise<void> | void
}

export class BaseEventHandler<Events = Record<string, unknown[]>, T extends keyof Events = keyof Events> {
    constructor(public readonly data: IEventHandler<Events, T>) { }

    get listener() {
        return this.data.run
    }

    get description() {
        return this.data.description
    }

    get name() {
        return this.data.name
    }

    add(client: DiscordClient) {

    }
}