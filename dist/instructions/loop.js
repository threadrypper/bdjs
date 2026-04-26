"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
const createInstruction_1 = require("../utils/createInstruction");
const Instruction_1 = require("../classes/internal/Instruction");
const Output_1 = require("../classes/internal/Output");
const Reader_1 = require("../core/Reader");
exports.data = (0, createInstruction_1.createInstruction)({
    name: '$loop',
    description: 'Loops a specified number of times.',
    interpret: false,
    args: [
        {
            name: 'Times',
            description: 'The number of times to loop.',
            required: true,
            type: Instruction_1.DataType.NUMBER,
            spread: false
        },
        {
            name: 'Array Name',
            description: 'The name of the array to store the result of each iteration.',
            required: false,
            type: Instruction_1.DataType.ANY,
            spread: false
        },
        {
            name: 'Index Name',
            description: 'The name of the variable to store the current index of the loop.',
            required: false,
            type: Instruction_1.DataType.ANY,
            spread: false
        },
        {
            name: 'Code',
            description: 'The code to execute in each iteration.',
            required: true,
            type: Instruction_1.DataType.ANY,
            spread: false
        }
    ],
    run: async (runtime) => {
        let [amount, arrayName, indexName, codeToExecute] = runtime.getRawArgs();
        const fixedAmount = parseInt(amount);
        const results = [];
        arrayName = (await Reader_1.Interpreter.parseAndRun(arrayName, runtime)).getResultString();
        indexName = (await Reader_1.Interpreter.parseAndRun(indexName, runtime)).getResultString();
        for (let i = 0; i < fixedAmount; i++) {
            runtime.setEnvironmentVariable(indexName, i.toString());
            const result = await Reader_1.Interpreter.parseAndRun(codeToExecute, runtime);
            if (result.getResultString() === '')
                continue;
            results.push(result.getResultString());
        }
        runtime.setEnvironmentVariable(arrayName, results);
        return Output_1.Output.okButEmpty();
    }
});
