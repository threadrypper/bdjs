"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BDJSLog = void 0;
const tslib_1 = require("tslib");
const cli_color_1 = tslib_1.__importDefault(require("cli-color"));
class BDJSLog extends Error {
    constructor(d, type, ...args) {
        let message;
        switch (type) {
            case 'client':
                message = `🤖 ${`${cli_color_1.default.blue('BDJS')}:${cli_color_1.default.blue('CLIENT')}`} | ${args.join(' ')}`;
                break;
            case 'custom':
                message = `❌ ${`${cli_color_1.default.blue('BDJS')}:${cli_color_1.default.red('ERROR')}`} | ${args.join(' ')}`;
                break;
            case 'command':
                message = `ℹ  ${`${cli_color_1.default.blue('BDJS')}:${cli_color_1.default.magenta('COMMAND')}`} | ${args[0]} at ${args[1]}`;
                break;
            case 'disallowed':
                message = `❌ ${`${cli_color_1.default.blue('BDJS')}:${cli_color_1.default.red('DISALLOWED')}`} | "${args[0]}" is only allowed in ${args[1]}`;
                break;
            case 'internal':
                message = `⚠️ ${`${cli_color_1.default.blue('BDJS')}:${cli_color_1.default.yellowBright('INTERNAL')}`} | ${args.join(' ')}`;
                break;
            case 'invalid':
                message = `❌ ${`${cli_color_1.default.blue('BDJS')}:${cli_color_1.default.red('ERROR')}`} | Invalid "${args[0]}" in ${args[1]}`;
                break;
            case 'required':
                message = `❌ ${`${cli_color_1.default.blue('BDJS')}:${cli_color_1.default.red('ERROR')}`} | "${args[0]}" is required in ${args[1]}`;
                break;
        }
        super(message);
        this.name = '';
        this.message = '';
        this.message = message.split('|').map(x => x.trim())[1];
    }
    /**
     * BDJSLog a colored error message into the console.
     * @param message - The error message.
     * @returns {void}
     */
    static error(message) {
        console.log('❌', `${`${cli_color_1.default.blue('BDJS')}:${cli_color_1.default.red('ERROR')}`}`, '|', cli_color_1.default.magentaBright(message));
    }
    /**
     * BDJSLog a colored information message into the console.
     * @param message - The information message.
     * @returns {void}
     */
    static info(message) {
        console.log('ℹ', `${`${cli_color_1.default.blue('BDJS')}:${cli_color_1.default.cyan('INFO')}`}`, '|', cli_color_1.default.green(message));
    }
    /**
     * BDJSLog a colored warning message into the console.
     * @param message - The warning message.
     * @returns {void}
     */
    static warn(message) {
        console.log('⚠️ ', `${`${cli_color_1.default.blue('BDJS')}:${cli_color_1.default.yellowBright('WARN')}`}`, '|', cli_color_1.default.yellow(message));
    }
    /**
     * BDJSLog a colored debug message into the console.
     * @param message - The debug message.
     * @returns {void}
     */
    static debug(message) {
        console.log('🐛', `${`${cli_color_1.default.blue('BDJS')}:${cli_color_1.default.cyan('DEBUG')}`}`, '|', cli_color_1.default.blue(message));
    }
}
exports.BDJSLog = BDJSLog;
