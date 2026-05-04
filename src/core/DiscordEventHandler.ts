import type { ClientEvents } from 'discord.js'
import { BaseEventHandler, type IEventHandler } from './BaseEventHandler'
import { DiscordClient } from '@structures/DiscordClient'

/**
 * A discord-specific event handler.
 */
export class DiscordEventHandler<T extends keyof ClientEvents> extends BaseEventHandler<ClientEvents, T> {
    add(client: DiscordClient) {
        client.on(this.name, this.listener.bind(client) as any)
    }
}
