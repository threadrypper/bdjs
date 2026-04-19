const { Interpreter, Parser } = require('../dist/core/Reader')
const { Runtime } = require('../dist/classes/internal/Runtime')
const { createInstruction } = require('../dist/utils/createInstruction')
const { Output } = require('../dist/classes/internal/Output')
const { DataType } = require('../dist/classes/internal/Instruction')

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
        const args = runtime.getCompiledArgs()
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
        const args = runtime.getCompiledArgs((a) => a.value)
        const values = args.map((arg) => parseInt(arg))

        return Output.ok(values.reduce((a, b) => a + b))
    }
})

const runtime = new Runtime()
runtime.instructions.set(log.name.slice(1), log)
runtime.instructions.set(math.name.slice(1), math)

console.time('parsing')
const compiled = Parser.parse('$log[$sum[12;1]]')
console.timeEnd('parsing')

console.time('running')
Interpreter.run(compiled, runtime)
    .then(() => console.timeEnd('running'))
    .catch((err) => console.error(err));
