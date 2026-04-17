import { Client, type ClientOptions, ClientEvents } from 'discord.js';
/**
 * Options to initialize the Discord client.
 */
interface BaseDiscordClientSetupOptions extends ClientOptions {
    /**
     * Automatically update the client.
     * If true, the client will automatically update the client.
     */
    autoUpdate?: boolean;
    /**
     * Enable debug mode.
     */
    debug?: boolean;
    /**
     * The events to listen to.
     */
    events: Array<keyof ClientEvents>;
}
interface PrefixedDiscordClientSetupOptions extends BaseDiscordClientSetupOptions {
    /**
     * The prefixes to use for the Discord client.
     * If null, the client will not be able to process prefixed commands.
     */
    prefixes: string[];
    /**
     * Enable mention prefix.
     * If true, the client will be able to process its mention as a prefix.
     */
    mentionPrefix?: boolean;
    /**
     * Enable respond to bots.
     * If true, the client will be able to process messages from bots.
     */
    respondToBots?: boolean;
}
interface UnprefixedDiscordClientSetupOptions extends BaseDiscordClientSetupOptions {
    /**
     * If null, the client wont be able to process prefixed commands.
     */
    prefixes: null;
}
export type DiscordClientSetupOptions = PrefixedDiscordClientSetupOptions | UnprefixedDiscordClientSetupOptions;
/**
 * Represents a Discord client.
 */
export declare class DiscordClient<Ready extends boolean = boolean> extends Client<Ready> {
    readonly extraOptions: DiscordClientSetupOptions;
    constructor(extraOptions: DiscordClientSetupOptions);
}
export {};
