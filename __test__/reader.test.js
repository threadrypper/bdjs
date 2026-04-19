const { Reader } = require('../dist/core/Reader')
const { Runtime } = require('../dist/classes/internal/Runtime')
const { createInstruction } = require('../dist/utils/createInstruction')
const { Output } = require('../dist/classes/internal/Output')
const { DataType } = require('../dist/classes/internal/Instruction')

const instruction = createInstruction({
    name: '$test',
    description: 'Test instruction',
    interpret: false,
    run: () => {
        console.log('Test')
        return Output.ok()
    }
})

const log = createInstruction({
    name: '$log',
    description: 'Log a value.',
    brackets: true,
    interpret: true,
    args: [
        {
            name: 'Value',
            description: 'The value to log.',
            required: true,
            type: DataType.ANY,
            spread: false
        }
    ],
    run: (runtime) => {
        const args = runtime.getCompiledArgs((field) => field.value)
        const [value] = args

        console.log(value)

        return Output.ok()
    }
})

const math = createInstruction({
    name: '$sum',
    description: 'Sum two numbers.',
    brackets: true,
    interpret: true,
    run: (runtime) => {
        const args = runtime.getCompiledArgs((field) => field.value)
        const [n1, n2] = args.map((arg) => parseInt(arg))

        return Output.ok(n1 + n2)
    }
})

const runtime = new Runtime()
runtime.instructions.set(instruction.name.slice(1), instruction)
runtime.instructions.set(log.name.slice(1), log)
runtime.instructions.set(math.name.slice(1), math)

console.log(runtime.instructions)

const compiled = Reader.compile('$test\n$log[$sum[12;1]]')

Reader.interpret(compiled, runtime)
    .then(() => console.debug('CODE EXECUTED'))
    .catch((err) => console.error(err));
