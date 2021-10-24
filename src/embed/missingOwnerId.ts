// Imports
import { RichEmbed } from 'discord.js'
import * as Debug from 'debug'
const log = Debug('qd:embed:missingOwnerId')

// Export embed
export function missingOwnerIdEmbed(): RichEmbed {
    log('Please, set-up the OWNER option or disable throwErrorPM.')
    return new RichEmbed()
        .addField('Warning', 'If you are the owner of client bot, please set-up the `owner` option with your ID, if it\'s not you, please alert him.')
        .addField('Error reported', 'The error has been reported in the console.')
}
