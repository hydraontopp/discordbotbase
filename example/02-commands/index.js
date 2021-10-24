// Initialisation
const { Client } = require('@tanuki/discord-bot-base')
const Settings = require('../settings')
const QueenDecim = new Client(Settings)

// Register commands
Promise.all([
    QueenDecim.registry.command.registerDefaults(),
    QueenDecim.registry.command.register('./commands/example/reply.js')
]).then(() => {
    // Logging
    QueenDecim.logIn()
        .then(() => console.log('Application done'))
        .catch(console.error)
})
