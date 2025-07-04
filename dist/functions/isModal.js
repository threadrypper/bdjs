"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const discord_js_1 = require("discord.js");
exports.default = new Function_1.BaseFunction({
    description: 'Check whether current interaction belongs to a modal or not.',
    allowFor(type) {
        return type !== 'anyInteraction';
    },
    code: async (d) => {
        return d.ctx?.raw instanceof discord_js_1.ModalSubmitInteraction;
    }
});
