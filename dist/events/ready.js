"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const DiscordEventHandler_1 = require("../core/DiscordEventHandler");
exports.data = new DiscordEventHandler_1.DiscordEventHandler({
    name: 'ready',
    description: 'When the bot is ready.',
    run: (client) => {
        console.log(`Ready: ${client.user?.tag}`);
    }
});
