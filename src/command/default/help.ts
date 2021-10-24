// Import
import { CommandBase } from '../../model/CommandBase'
import { Client } from '../../'
import { Message, RichEmbed } from 'discord.js'

// Command
module.exports = class HelpCommand extends CommandBase {
    constructor(client: Client) {
        super(client, {
            group: 'default',
            name: 'help',
            description: 'List of available commands and useful things.'
        })
    }

    public async run(msg: Message): Promise<void> {
        // Build the RichEmbed
        const commandNames = this.client.registry.command.getNames()
        const help = [
            '**List of commands**',
            'The list of available commands.',
            '--------------',
            null
        ]

        for (const commandName of commandNames) {
            const command = this.client.registry.command.get(commandName)
            help.push('**' + commandName + '** - ' + command.settings.description)
        }

        // Send & delete
        const promises = [ msg.author.send(help) ]
        if (msg.deletable) promises.push(msg.delete())
        await Promise.all(promises)
    }
}
