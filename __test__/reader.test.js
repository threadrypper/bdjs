const { Interpreter, Parser } = require('../dist/core/Reader')
const { Runtime } = require('../dist/classes/internal/Runtime')
const { INTERNAL_INSTRUCTIONS_DIRECTORY } = require('../dist/constants')

const runtime = new Runtime()
runtime.instructions.load(INTERNAL_INSTRUCTIONS_DIRECTORY)

console.time('parsing')
const compiled = Parser.parse(`
    $switch[3;
        $case[1;$log[1]]
        $case[2;$log[2]]
        $case[3;$log[3]]
        $case[4;$log[4]]
        $case[5;$log[5]]
    ]
`)
console.timeEnd('parsing')

console.time('running')
Interpreter.run(compiled, runtime)
    .then(() => console.timeEnd('running'))
    .catch((err) => console.error(err));
