"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Check whether current interaction belongs to a slash command or not.',
    allowFor(type) {
        return type !== 'anyInteraction';
    },
    code: async (d) => {
        return d.ctx?.raw instanceof discord_js_1.ChatInputCommandInteraction;
    }
});
