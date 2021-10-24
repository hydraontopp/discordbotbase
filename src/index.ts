// Imports
import { EventEmitter } from 'events'
import { Client as DJSClient, Message } from 'discord.js'
import Registry from './registry'
import { handleBotError } from './service/handleBotError'
import { handleBotReady } from './service/handleBotReady'
import { handleNewMessage } from './service/handleNewMessage'
import * as debug from 'debug'
const log = debug('qd:main')

// Exports
export { CommandBase } from './model/CommandBase'
export const Events = {
    CONNECTED: 'ServerConnected',
    ERROR: 'ServerError',
    DISCONNECTED: 'ServerDisconnected'
}

// Client
export class Client {
    public dispatcher: EventEmitter = new EventEmitter()
    public settings: QueenDecimSettings
    public discord: DJSClient = new DJSClient()
    public registry: Registry
    public shared: Map<string, any> = new Map()

    constructor(settings: QueenDecimSettings) {
        this.settings = settings
        this.registry = new Registry(this)
        this.listenEvents()
    }

    public logIn(): Promise<string> { return this.discord.login(this.settings.token) }
    public logOut(): Promise<void> { return this.discord.destroy() }

    private listenEvents(): void {
        log('Listen events.')
        this.discord.on('ready', () => handleBotReady(this).catch(error => handleBotError(this, error).catch(console.error)))
        this.discord.on('error', error => handleBotError(this, error).catch(console.error))
        this.discord.on('message', message => {
            handleNewMessage(this, message)
            .then(isCommand => {
                if (isCommand)
                    log(`The previous command has been executed.`)
            })
            .catch(error => handleBotError(this, error, message).catch(console.error))
        })
        this.discord.on('disconnect', () => this.dispatcher.emit(Events.DISCONNECTED))
    }
}
