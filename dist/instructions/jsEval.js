"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$jsEval',
    description: 'Executes JavaScript code.',
    interpret: true,
    args: [
        {
            name: 'Code',
            description: 'JS code to execute',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    run: async (runtime) => {
        const [code] = runtime.getCompiledArgs();
        try {
            const context = {
                runtime,
                console,
                Math,
                Date
            };
            const fn = new Function(...Object.keys(context), `
                return (async () => {
                    ${code}
                })()
                `);
            const result = await fn(...Object.values(context));
            return Output_1.Output.ok(result ?? '');
        }
        catch (err) {
            return Output_1.Output.error(`Error: ${err.message}`);
        }
    }
});
