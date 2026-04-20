const { ConditionParser } = require('../dist/core/ConditionParser')

console.time('tokenize')
const tokens = ConditionParser.tokenize('age == 18')
console.timeEnd('tokenize')

console.time('parse')
const ast = ConditionParser.parse(tokens)
console.timeEnd('parsing')

console.time('evaluating')
const result = ConditionParser.evaluate(ast)
console.timeEnd('evaluating')

console.log(result)