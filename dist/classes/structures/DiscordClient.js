"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordClient = void 0;
const discord_js_1 = require("discord.js");
/**
 * Represents a Discord client.
 */
class DiscordClient extends discord_js_1.Client {
    constructor(extraOptions) {
        super(extraOptions);
        this.extraOptions = extraOptions;
    }
}
exports.DiscordClient = DiscordClient;
