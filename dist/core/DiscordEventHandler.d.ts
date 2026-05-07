import type { ClientEvents } from 'discord.js';
import { BaseEventHandler } from './BaseEventHandler';
import { DiscordClient } from '../classes/structures/DiscordClient';
/**
 * A discord-specific event handler.
 */
export declare class DiscordEventHandler<T extends keyof ClientEvents> extends BaseEventHandler<ClientEvents, T> {
    add(client: DiscordClient): void;
}
