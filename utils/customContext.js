const Discord = require('discord.js')

class CustomContext {
    constructor(args, author, bot, channel, guild, me, message, prefix) {
        this.args = args;
        this.author = author;
        this.Bot = bot;
        this.channel = channel;
        this.guild = guild;
        this.me = me;
        this.message = message;
        this.prefix = prefix;
        this.content = message.content;
        this.isSelf = this.Bot.user === this.author;
    }

    send = async (content, options, embeddify) => {
        let exampleEmbed;
        if (!options) {
            options = {}
        }

        if (embeddify || this.Bot.embeddify) {
            exampleEmbed = new Discord.MessageEmbed()
            exampleEmbed.setDescription(content)
            content = null;
        }

        options.embed = exampleEmbed;

        await this.message.channel.send(content, options)
    }
}

module.exports = CustomContext