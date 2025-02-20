import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
	description: 'Stops the execution for the remaining code.',
	code: async d => {
		d.stop = true
	}
})
