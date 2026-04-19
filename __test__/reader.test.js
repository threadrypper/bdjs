const { Interpreter, Parser } = require('../dist/core/Reader')
const { Runtime } = require('../dist/classes/internal/Runtime')
const { INTERNAL_INSTRUCTIONS_DIRECTORY } = require('../dist/constants')

const runtime = new Runtime()
runtime.instructions.load(INTERNAL_INSTRUCTIONS_DIRECTORY)

console.time('parsing')
const compiled = Parser.parse(`
    $case[10;$log[10]]
`)
console.timeEnd('parsing')

console.time('running')
Interpreter.run(compiled, runtime)
    .then(() => console.timeEnd('running'))
    .catch((err) => console.error(err));
