"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordClient = void 0;
const BaseEventManager_1 = require("../managers/BaseEventManager");
const oceanic_js_1 = require("oceanic.js");
/**
 * Represents the Discord client structure.
 */
class DiscordClient extends oceanic_js_1.Client {
    /**
     * The events to listen to for the client.
     */
    loadedEvents = [];
    /**
     * The command prefixes for the client.
     */
    prefixes = null;
    /**
     * The event manager for handling client events.
     */
    events = new BaseEventManager_1.EventManager(this);
    /**
     * Creates an instance of the Discord client.
     * @param options The options for setting up the Discord client.
     */
    constructor(options) {
        // Initialize the base Client with provided options.
        super(options);
        // Set the command prefixes.
        this.prefixes = options.prefixes ?? null;
        // Set the loaded events.
        this.loadedEvents = options.events ?? [];
        this.events.loadNative();
    }
}
exports.DiscordClient = DiscordClient;
