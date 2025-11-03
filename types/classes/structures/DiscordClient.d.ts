import { EventManager } from '../managers/BaseEventManager';
import { Client, type ClientEvents, type ClientOptions } from 'oceanic.js';
/**
 * The discord client events prefixed with 'on'.
 */
export type DiscordClientEvents = `on${Capitalize<keyof ClientEvents>}`;
/**
 * Options for setting up the Discord client.
 */
export interface DiscordClientSetupOptions extends ClientOptions {
    /**
     * Events to listen to for the Discord client.
     */
    events: DiscordClientEvents[];
    /**
     * Command prefixes for the Discord client.
     */
    prefixes: string[] | null;
}
/**
 * Represents the Discord client structure.
 */
export declare class DiscordClient extends Client {
    /**
     * The events to listen to for the client.
     */
    private loadedEvents;
    /**
     * The command prefixes for the client.
     */
    prefixes: string[] | null;
    /**
     * The event manager for handling client events.
     */
    events: EventManager;
    /**
     * Creates an instance of the Discord client.
     * @param options The options for setting up the Discord client.
     */
    constructor(options: DiscordClientSetupOptions);
}
