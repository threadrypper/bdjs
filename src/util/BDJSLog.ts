import type { Data } from '../structures/Data'
import clc from 'cli-color'

type ErrorTypes =
	| 'client'
	| 'command'
	| 'custom'
	| 'disallowed'
	| 'internal'
	| 'invalid'
	| 'required'

export class BDJSLog extends Error {
	name = ''
	message = ''
	constructor(d: Data, type: ErrorTypes, ...args: string[] | undefined[]) {
		let message: string

		switch (type) {
			case 'client':
				message = `🤖 ${clc.blue('BDJS') + ':' + clc.blue('CLIENT')} | ${args.join(' ')}`
				break
			case 'custom':
				message = `❌ ${clc.blue('BDJS') + ':' + clc.red('ERROR')} | ${args.join(' ')}`
				break
			case 'command':
				message = `ℹ  ${clc.blue('BDJS') + ':' + clc.magenta('COMMAND')} | ${args[0]} at ${args[1]}`
				break
			case 'disallowed':
				message = `❌ ${clc.blue('BDJS') + ':' + clc.red('DISALLOWED')} | "${args[0]}" is only allowed in ${args[1]}`
				break
			case 'internal':
				message = `⚠️ ${clc.blue('BDJS') + ':' + clc.yellowBright('INTERNAL')} | ${args.join(' ')}`
				break
			case 'invalid':
				message = `❌ ${clc.blue('BDJS') + ':' + clc.red('ERROR')} | Invalid "${args[0]}" in ${args[1]}`
				break
			case 'required':
				message = `❌ ${clc.blue('BDJS') + ':' + clc.red('ERROR')} | "${args[0]}" is required in ${args[1]}`
				break
		}

		super(message)
		this.message = message.split('|').map(x => x.trim())[1]
	}

	/**
	 * BDJSLog a colored error message into the console.
	 * @param message - The error message.
	 * @returns {void}
	 */
	static error(message: string) {
		console.log(
			'❌',
			`${clc.blue('BDJS') + ':' + clc.red('ERROR')}`,
			'|',
			clc.magentaBright(message)
		)
	}

	/**
	 * BDJSLog a colored information message into the console.
	 * @param message - The information message.
	 * @returns {void}
	 */
	static info(message: string) {
		console.log(
			'ℹ',
			`${clc.blue('BDJS') + ':' + clc.cyan('INFO')}`,
			'|',
			clc.green(message)
		)
	}

	/**
	 * BDJSLog a colored warning message into the console.
	 * @param message - The warning message.
	 * @returns {void}
	 */
	static warn(message: string) {
		console.log(
			'⚠️ ',
			`${clc.blue('BDJS') + ':' + clc.yellowBright('WARN')}`,
			'|',
			clc.yellow(message)
		)
	}

	/**
	 * BDJSLog a colored debug message into the console.
	 * @param message - The debug message.
	 * @returns {void}
	 */
	static debug(message: string) {
		console.log(
			'🐛',
			`${clc.blue('BDJS') + ':' + clc.cyan('DEBUG')}`,
			'|',
			clc.blue(message)
		)
	}
}
