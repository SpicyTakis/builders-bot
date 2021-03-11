class CustomContext {
    constructor(args, author, bot, channel, guild, me, message, prefix) {
        this.args = args;
        this.author = author;
        this.bot = bot;
        this.channel = channel;
        this.guild = guild;
        this.me = me;
        this.message = message;
        this.prefix = prefix;
        this.content = message.content;
    }

    send = async (...args) => {
        this.message.channel.send(...args)
    }

    
}