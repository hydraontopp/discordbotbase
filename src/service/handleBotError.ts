// Imports
import { Client, Events } from '../'
import { Message, RichEmbed } from 'discord.js'
import { internalServerErrorEmbed } from '../embed/internalServerError'
import { missingOwnerIdEmbed } from '../embed/missingOwnerId'
import * as Debug from 'debug'
const log = Debug('qd:handler:error')

// Method
export async function handleBotError(client: Client, error: any, message?: Message): Promise<void> {
    log('An error has occured.')
    client.dispatcher.emit(Events.ERROR, error)

    const submissions = []
    submissions.push(message.reply('sorry, i can\'t run you\'re command.'))

    // Throw error in PM
    if (client.settings.throwErrorPM !== false) {
        if (!client.settings.ownerIds.length) submissions.push(message.channel.send({ embed: missingOwnerIdEmbed() }))
        else {
            const embed = internalServerErrorEmbed(error)
            for (const ownerId of client.settings.ownerIds) {
                const PMSubmission = client.discord.users.get(ownerId).send({ embed })
                submissions.push(PMSubmission)
            }
        }
    }

    // Throw error in Channel
    if (client.settings.throwErrorChannel) {
        submissions.push(
            message.channel.send({ embed: internalServerErrorEmbed(error) })
        )
    }

    await Promise.all(submissions)
}
