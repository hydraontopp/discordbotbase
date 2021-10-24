// Imports
import { Message, RichEmbed } from 'discord.js'
import { CommandRequest } from '../model/CommandRequest'
import * as Debug from 'debug'
const log = Debug('qd:embed:invalidArg')

// Method
export function invalidArgEmbed(request: CommandRequest): RichEmbed {
    log('Invalid argument passed to the request (%o).', {
        command: request.command.settings.name,
        error: request.validatorError
    })
    return new RichEmbed()
        .setTitle('Invalid argument supplied to the command')
        .setDescription(request.validatorError)
}
