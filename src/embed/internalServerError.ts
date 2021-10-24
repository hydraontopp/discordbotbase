// Import
import { RichEmbed } from 'discord.js'

// Export
export function internalServerErrorEmbed(error: any): RichEmbed {
    return new RichEmbed()
        .setColor('#C0392B')
        .setFooter('See more details in console.')
        .setTimestamp()
        .setTitle('Internal server error')
        .setDescription(error)
}
