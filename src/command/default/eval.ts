// Imports
import { CommandBase } from '../../model/CommandBase'
import { Client } from '../../'
import { Message } from 'discord.js'
import * as Debug from 'debug'
const log = Debug('qd:command:eval')

// Command
module.exports = class EvalCommand extends CommandBase {
    constructor(client: Client) {
        super(client, {
            group: 'default',
            name: 'eval',
            description: 'Evaluate a chunk of code',
            userIds: client.settings.ownerIds
        })
    }

    public async run(msg: Message, { requestContent }): Promise<void> {
        /* tslint:disable:no-eval */
        let execution: any = eval(requestContent)
        if (execution instanceof Promise) execution = await execution
        if (execution && typeof execution !== typeof null) await msg.channel.send(execution)
        else if (execution) log('%O', execution)
        /* tslint:enable:no-eval */
    }
}
