# Discord Bot Base
<img alt="NodeICO" src="https://nodei.co/npm/@tanuki/discord-bot-base.png?mini=true"/>

DiscordBotBase is an unofficial framework written in TypeScript for [discord.js](https://github.com/discordjs/discord.js), it allow you to create a discord's bot with the minimum of lines.

## Example (minimal)
```js
const { Client } = require('@tanuki/discord-bot-base');

const QueenDecim = new Client({
    token: null,
    ownerId: null,
    prefix: null
});

QueenDecim.logIn()
    .then(() => { console.log('Yo.'); })
```
[See more examples on GitHub.](https://github.com/nooneexpectme/discord-bot-base/tree/dev/example)

## Features
- Register a command from file.
    - Options:
        - `name` - Command name.
        - `group` - Group of the command.
        - `description` - A simple description.
        - `details` - Complete description.
        - `ownerOnly` - Restrict access to the owner only.
        - `args` - Array of command's arguments.
            - `name` - Name of the argument.
            - `type` - `String`, `Number`, `Date` or other custom type.
            - `validator` - A checker, must return a `[boolean, string]`.
    - Methods:
        - `load` - async method executed on command registering.
        - `unload` - async method executed on command unregistering.
        - `run` - async method executed when the command has been called.
- In-built objects sharing across project (including commands) with `QueenDecim.shared`.
- In-built commands (enable on-demand).
    - `eval` - Owner only, execute a code.
    - `reload` - Owner only, reload a command.
    - `help` - DM List of registered commands.

If you have any ideas, i am open!

## Installation
1. Our package: `npm i --save @tanuki/discord-bot-base`
2. (Optional) Voice support: `npm i --save node-opus`
3. (Optional) Faster voice packet encryption/decryption: `npm i --save libsodium.js`

## Links
- Repository (master, stable): https://github.com/nooneexpectme/discord-bot-base
- Repository (dev, may be unstable): https://github.com/nooneexpectme/discord-bot-base/tree/dev
- NPM: https://www.npmjs.com/package/@tanuki/discord-bot-base

## Contributing
Anyone can contribute to this project with **issues** and **pull requests**, i will be happy if you also want to contact me on discord: **Tanuki#0003** (Even you're french!).