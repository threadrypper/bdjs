import { BaseFunction } from '../structures/Function'

export default new BaseFunction({
	description: 'Clears the container.',
	code: async d => {
		d.container.clear()
	}
})
