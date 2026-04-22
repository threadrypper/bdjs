const { Interpreter, Parser } = require('../dist/core/Reader')
const { Runtime } = require('../dist/classes/internal/Runtime')
const { INTERNAL_INSTRUCTIONS_DIRECTORY } = require('../dist/constants')

const runtime = new Runtime()
runtime.instructions.load(INTERNAL_INSTRUCTIONS_DIRECTORY)

console.time('parsing')
const compiled = Parser.parse(`
    $then[$checkCondition[a == a];$log[Math evaluation result: $calculate[10+10]]]
    $then[$checkCondition[a == b];$log[This should not be logged]]
    $then[$checkCondition[a != b];$log[This should be logged]]
`)
console.timeEnd('parsing')

console.time('running')
Interpreter.run(compiled, runtime)
    .then(() => console.timeEnd('running'))
    .catch((err) => console.error(err));
