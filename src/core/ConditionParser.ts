export namespace ConditionParser {
    /**
     * Represents the tokens of the condition parser.
     */
    type ConditionLexerToken =
        | { type: "IDENTIFIER"; value: string }
        | { type: "NUMBER"; value: number }
        | { type: "OPERATOR"; value: string };

    /**
     * Tokenizes the input string.
     * @param {string} input The input string to tokenize.
     * @returns {ConditionLexerToken[]}
     */
    export function tokenize(input: string): ConditionLexerToken[] {
        const tokens: ConditionLexerToken[] = []
        const regex = /\s*([a-zA-Z]+|\d+|==|!=|<=|>=|<|>)\s*/g

        let match
        while ((match = regex.exec(input)) !== null) {
            const value = match[1]

            if (/^\d+$/.test(value)) {
                tokens.push({ type: "NUMBER", value: Number(value) })
            } else if (/^(==|!=|<=|>=|<|>)$/.test(value)) {
                tokens.push({ type: "OPERATOR", value })
            } else {
                tokens.push({ type: "IDENTIFIER", value })
            }
        }

        return tokens
    }

    /**
     * Represents the AST of the condition parser.
     */
    type ASTNode = {
        left: any
        operator: string
        right: any
    }

    /**
     * Parses the tokens into an AST.
     * @param {ConditionLexerToken[]} tokens The tokens to parse.
     * @returns {ASTNode}
     */
    export function parse(tokens: ConditionLexerToken[]): ASTNode {
        if (tokens.length !== 3) {
            throw new Error("Invalid expression")
        }

        return {
            left: tokens[0],
            operator: tokens[1].value as string,
            right: tokens[2]
        }
    }

    /**
     * Evaluates the AST.
     * @param {ASTNode} ast The AST to evaluate.
     * @returns {boolean}
     */
    export function evaluate(ast: ASTNode): boolean {
        const left = ast.left.value
        const right = ast.right.value

        switch (ast.operator) {
            case "==": return left == right
            case "!=": return left != right
            case "<": return left < right
            case ">": return left > right
            case "<=": return left <= right
            case ">=": return left >= right
            default: throw new Error("Unknown operator")
        }
    }
}
