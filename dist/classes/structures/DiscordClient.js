"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordClient = void 0;
const discord_js_1 = require("discord.js");
/**
 * The channel where the errors will be sent.
 */
var ErrorDeliveryChannel;
(function (ErrorDeliveryChannel) {
    ErrorDeliveryChannel[ErrorDeliveryChannel["LogOnly"] = 0] = "LogOnly";
    ErrorDeliveryChannel[ErrorDeliveryChannel["LogAndSend"] = 1] = "LogAndSend";
    ErrorDeliveryChannel[ErrorDeliveryChannel["SendOnly"] = 2] = "SendOnly";
})(ErrorDeliveryChannel || (ErrorDeliveryChannel = {}));
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
