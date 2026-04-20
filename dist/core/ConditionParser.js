"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionParser = void 0;
var ConditionParser;
(function (ConditionParser) {
    /**
     * Tokenizes the input string.
     * @param {string} input The input string to tokenize.
     * @returns {ConditionLexerToken[]}
     */
    function tokenize(input) {
        const tokens = [];
        const regex = /\s*([a-zA-Z]+|\d+|==|!=|<=|>=|<|>)\s*/g;
        let match;
        while ((match = regex.exec(input)) !== null) {
            const value = match[1];
            if (/^\d+$/.test(value)) {
                tokens.push({ type: "NUMBER", value: Number(value) });
            }
            else if (/^(==|!=|<=|>=|<|>)$/.test(value)) {
                tokens.push({ type: "OPERATOR", value });
            }
            else {
                tokens.push({ type: "IDENTIFIER", value });
            }
        }
        return tokens;
    }
    ConditionParser.tokenize = tokenize;
    /**
     * Parses the tokens into an AST.
     * @param {ConditionLexerToken[]} tokens The tokens to parse.
     * @returns {ASTNode}
     */
    function parse(tokens) {
        if (tokens.length !== 3) {
            throw new Error("Invalid expression");
        }
        return {
            left: tokens[0],
            operator: tokens[1].value,
            right: tokens[2]
        };
    }
    ConditionParser.parse = parse;
    /**
     * Evaluates the AST.
     * @param {ASTNode} ast The AST to evaluate.
     * @returns {boolean}
     */
    function evaluate(ast) {
        const left = ast.left.value;
        const right = ast.right.value;
        switch (ast.operator) {
            case "==": return left == right;
            case "!=": return left != right;
            case "<": return left < right;
            case ">": return left > right;
            case "<=": return left <= right;
            case ">=": return left >= right;
            default: throw new Error("Unknown operator");
        }
    }
    ConditionParser.evaluate = evaluate;
})(ConditionParser || (exports.ConditionParser = ConditionParser = {}));
