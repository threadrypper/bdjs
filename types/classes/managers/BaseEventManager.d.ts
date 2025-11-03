import type { DiscordClient } from '../structures/DiscordClient';
/**
 * The event manager class.
 */
export declare class EventManager {
    /**
     * The Discord client instance.
     */
    protected client: DiscordClient;
    /**
     * Creates an instance of the base event manager.
     * @param client The Discord client instance.
     */
    constructor(client: DiscordClient);
    /**
     * Loads native events.
     */
    loadNative(): undefined;
}
