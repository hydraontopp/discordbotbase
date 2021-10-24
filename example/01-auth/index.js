// Initialisation
const { Client } = require('@tanuki/discord-bot-base')
const Settings = require('../settings')
const QueenDecim = new Client(Settings)

// Logging
QueenDecim.logIn()
    .then(() => console.log('Application done'))
    .catch(console.error)
