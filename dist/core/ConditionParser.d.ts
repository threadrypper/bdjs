export declare namespace ConditionParser {
    /**
     * Represents the tokens of the condition parser.
     */
    type ConditionLexerToken = {
        type: "IDENTIFIER";
        value: string;
    } | {
        type: "NUMBER";
        value: number;
    } | {
        type: "OPERATOR";
        value: string;
    };
    /**
     * Tokenizes the input string.
     * @param {string} input The input string to tokenize.
     * @returns {ConditionLexerToken[]}
     */
    export function tokenize(input: string): ConditionLexerToken[];
    /**
     * Represents the AST of the condition parser.
     */
    type ASTNode = {
        left: any;
        operator: string;
        right: any;
    };
    /**
     * Parses the tokens into an AST.
     * @param {ConditionLexerToken[]} tokens The tokens to parse.
     * @returns {ASTNode}
     */
    export function parse(tokens: ConditionLexerToken[]): ASTNode;
    /**
     * Evaluates the AST.
     * @param {ASTNode} ast The AST to evaluate.
     * @returns {boolean}
     */
    export function evaluate(ast: ASTNode): boolean;
    export {};
}
