// Imports
import { Client } from '../'
import { RegistryCommand } from './command'

// Class
export default class Registry {
    public command: RegistryCommand
    private client: Client

    public constructor(client: Client) {
        this.client = client
        this.command = new RegistryCommand(client)
    }
}
