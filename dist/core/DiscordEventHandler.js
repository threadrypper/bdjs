"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordEventHandler = void 0;
const BaseEventHandler_1 = require("./BaseEventHandler");
/**
 * A discord-specific event handler.
 */
class DiscordEventHandler extends BaseEventHandler_1.BaseEventHandler {
    add(client) {
        client.on(this.name, this.listener.bind(client));
    }
}
exports.DiscordEventHandler = DiscordEventHandler;
