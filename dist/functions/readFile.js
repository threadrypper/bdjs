"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const promises_1 = require("node:fs/promises");
const node_util_1 = require("node:util");
exports.default = new Function_1.BaseFunction({
    description: 'Reads a file and load the result into a environment variable.',
    parameters: [
        {
            name: 'Directory',
            description: 'The directory to be readed.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Variable',
            description: 'Environment variable name to load the code results to, if any.',
            required: true,
            compile: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'Encoding',
            description: 'Type of encoding to read the file.',
            required: false,
            resolver: 'String',
            value: 'utf-8'
        }
    ],
    code: async (d, [directory, variable, encoding = 'utf-8']) => {
        if (directory === undefined)
            throw new d.error(d, 'required', 'Directory', d.function.name);
        if (variable === undefined)
            throw new d.error(d, 'required', 'Variable Name', d.function.name);
        await (0, promises_1.readFile)(directory, {
            encoding: encoding
        })
            .then(str => {
            if (str.length > 0)
                d.setEnvironmentVariable(variable, str);
        })
            .catch(e => {
            throw new d.error(d, 'custom', (0, node_util_1.inspect)(e, { depth: 1 }));
        });
    }
});
