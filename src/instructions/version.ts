import { createInstruction } from '@utils/createInstruction'
import { getVersion } from '@utils/getVersion'
import { Output } from '@internal/Output'

export const data = createInstruction({
    name: '$version',
    description: 'Returns the version of the library.',
    interpret: false,
    run: () => {
        return Output.ok(getVersion())
    }
})
