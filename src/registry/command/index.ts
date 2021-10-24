// Imports
import { Client } from '../../'
import { CommandBase } from '../../model/CommandBase'
import * as Debug from 'debug'
const log = Debug('qd:registry:command')

// Default commands
const DefaultCommands = [
    '../../command/default/help',
    '../../command/default/eval',
    '../../command/default/reload'
]

// Class
export class RegistryCommand {
    private client: Client
    private list: {[commandName: string]: CommandBase} = {}
    private pathsToCommand: {[path: string]: string} = {}

    public constructor(client: Client) {
        this.client = client
    }

    public exists(name: string) {
        return this.list[name] !== undefined
    }

    public get(name: string): CommandBase {
        return this.list[name] || null
    }

    public getNames(): string[] {
        return Object.keys(this.list)
    }

    public getNameFromPath(path: string): string {
        return this.pathsToCommand[path] || null
    }

    public getPathFromName(name: string): string {
        for (const path in this.pathsToCommand)
            if (this.pathsToCommand[path].toLowerCase().trim() === name.toLowerCase().trim())
                return path
        return null
    }

    public getPaths(): string[] {
        return Object.keys(this.pathsToCommand)
    }

    public async register(path: string): Promise<void> {
        const command: CommandBase = new (require(path))(this.client)

        if (this.list[command.settings.name] !== undefined) {
            log('The command is already registered (%o).', { name: command.settings.name })
            return
        }

        this.list[command.settings.name] = command
        this.pathsToCommand[path] = command.settings.name
        log('Command registered (%o).', {
            group: command.settings.group || null,
            name: command.settings.name
        })
        return command.load()
    }

    public async unregister(path: string): Promise<void> {
        if (this.pathsToCommand[path] === undefined) {
            log('The command doesn\'t exists (%o).', { path })
            return
        }

        const commandName = this.pathsToCommand[path]
        const command = this.list[commandName]
        const unload = command.unload()

        log('Command unregistered (%o).', {
            group: command.settings.group || null,
            name: command.settings.name
        })

        delete this.list[commandName]
        delete this.pathsToCommand[path]
        return unload
    }

    public async registerDefaults(): Promise<void> {
        await DefaultCommands.map(path => this.register(require.resolve(path)))
    }

    public async unregisterDefaults(): Promise<void> {
        await DefaultCommands.map(path => this.unregister(require.resolve(path)))
    }
}
