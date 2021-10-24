// Import
import { CommandBase } from '../../model/CommandBase'
import { Client } from '../../'
import { Message, RichEmbed } from 'discord.js'

// Command
module.exports = class ReloadCommand extends CommandBase {
    constructor(client: Client) {
        super(client, {
            group: 'default',
            name: 'reload',
            description: 'Reload a command.',
            args: [
                {
                    name: 'command',
                    type: String,
                    validator: command => {
                        if (!this.client.registry.command.getPathFromName(command))
                            return [false, 'You are asking for an unregistered command, type `!help` to see the command list.']
                        return [true, null]
                    }
                },
                { name: 'silent', type: Boolean, isOptional: true, default: false }
            ],
            userIds: client.settings.ownerIds
        })
    }

    public async run(msg: Message, { command, silent }): Promise<void> {
        const path = this.client.registry.command.getPathFromName(command)
        await this.client.registry.command.unregister(path)
        delete require.cache[require.resolve(path)]
        await this.client.registry.command.register(path)
        if (!silent) await msg.react('✅')
        else if (msg.deletable) await msg.delete()
    }
}
