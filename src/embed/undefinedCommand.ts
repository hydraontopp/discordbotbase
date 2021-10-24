// Imports
import { RichEmbed } from 'discord.js'
import { CommandRequest } from '../model/CommandRequest'
import * as Debug from 'debug'
const log = Debug('qd:embed:undefinedCommand')

// Embed
export function undefinedCommandEmbed(request: CommandRequest): RichEmbed {
    log('Trying to run an unexistant command (%o).', { request: request.args.requestContent })
    return new RichEmbed()
        .setTitle('Trying to run an unexistant command')
        .setDescription('The command you tried to run does not exists, type `!help` to see the command list.')
}
