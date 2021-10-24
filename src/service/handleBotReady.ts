// Imports
import { Events, Client } from '../'
import * as Debug from 'debug'
const log = Debug('qd:handler:ready')

// Method
export async function handleBotReady(client: Client) {
    log(`%s is ready to fire.`, client.discord.user.username)
    client.dispatcher.emit(Events.CONNECTED)
    return true
}
