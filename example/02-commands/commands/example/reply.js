const { CommandBase } = require('@tanuki/discord-bot-base')

class ReplyCommand extends CommandBase {
    constructor(client) {
        super(client, {
            group: 'example',
            name: 'reply',
            description: 'Reply to the user',
            args: [
                { name: 'text', type: String },
                {
                    name: 'nbr',
                    type: Number,
                    validator: arg => arg > 5 ? [ false, 'The maximum of replies are 5.' ] : [ true, null ]
                },
                { name: 'display', type: Boolean, isOptional: true, default: true }
            ]
        })
    }

    async run (message, { text, nbr, display }) {
        console.log(`Reply "${text}" ${nbr} times (display: ${display ? 'true' : 'false'}).`)
        if (!display) return
        const replies = []
        for (let i = 0; i < nbr; i++) {
            replies.push(message.reply(text.toString()))
        }
        return Promise.all(replies)
    }
}

module.exports = ReplyCommand
