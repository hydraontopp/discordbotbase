// Imports
import { Client } from '../'
import { Message } from 'discord.js'
import { queryParser } from '../service/queryParser'
import { CommandRequestError } from '../model/CommandRequest'
import { notEnoughArgsEmbed } from '../embed/notEnoughArgs'
import { undefinedCommandEmbed } from '../embed/undefinedCommand'
import { invalidArgEmbed } from '../embed/invalidArg'
import * as Debug from 'debug'
const log = Debug('qd:handler:message')

// Method
export async function handleNewMessage(client: Client, message: Message): Promise<boolean> {
    // Ignore normal messages
    if (!message.content.startsWith(client.settings.prefix)) return false

    // Do the job
    log('Command request (%o).', { request: message.content })
    const request = await queryParser(client, message)

    // Switch error
    switch (request.error) {
        case CommandRequestError.UNDEFINED_COMMAND:
            await message.channel.send({ embed: undefinedCommandEmbed(request) })
            break
        case CommandRequestError.NOT_ENOUGH_ARGS:
            await message.channel.send({ embed: notEnoughArgsEmbed(client.settings.prefix, message, request) })
            break
        case CommandRequestError.INVALID_ARG:
            await message.channel.send({ embed: invalidArgEmbed(request) })
            break
        case CommandRequestError.NOT_ALLOWED:
            if (message.deletable) await message.delete()
            else await message.react(':no_entry_sign:')
            break
    }
    if (request.error) return false

    // Everything is right, run the command
    await request.command.run(message, request.args)
    return true
}
