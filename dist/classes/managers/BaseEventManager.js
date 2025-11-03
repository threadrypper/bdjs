"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
const recursiveCollectFiles_1 = require("../../utils/recursiveCollectFiles");
const node_path_1 = require("node:path");
/**
 * The event manager class.
 */
class EventManager {
    /**
     * The Discord client instance.
     */
    client;
    /**
     * Creates an instance of the base event manager.
     * @param client The Discord client instance.
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Loads native events.
     */
    loadNative() {
        const paths = (0, recursiveCollectFiles_1.recursiveCollectFiles)((0, node_path_1.join)(__dirname, '../../events'));
        console.debug(`[EventManager] Found ${paths.length} native event(s).`);
        return void 0;
    }
}
exports.EventManager = EventManager;
