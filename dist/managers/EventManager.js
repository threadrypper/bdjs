"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = void 0;
const recursiveReaddir_1 = require("../utils/recursiveReaddir");
const path_1 = require("path");
/**
 * The path where events are stored.
 */
const EVENTS_PATH = (0, path_1.join)(__dirname, '../events');
class EventManager {
    /**
     * Loads all events.
     * @param client The discord client.
     */
    load(client) {
        const files = (0, recursiveReaddir_1.recursiveReaddir)(EVENTS_PATH, f => f.endsWith('.js'));
        files.forEach((directory) => {
            const event = require(directory).data;
            client.on(event.name, event.run);
        });
    }
}
exports.EventManager = EventManager;
