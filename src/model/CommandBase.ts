// Imports
import { Client } from '../'
import { Message } from 'discord.js'

// Exports
export class CommandBase {
    public settings: CommandSettings
    public client: Client

    constructor(client: Client, settings: CommandSettings) {
        this.client = client
        this.settings = settings
    }

    public async load(): Promise<void> {
        return
    }

    public async unload(): Promise<void> {
        return
    }

    public async run(message: Message, args: any): Promise<void> {
        message.reply('Default command initialized, please set-up the run function.')
    }
}
