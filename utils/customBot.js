const Discord = require('discord.js');

const Context = require('./customContext');
const UpdateUtils = require('./updateUtils');

class CustomBot extends Discord.Client {
    constructor(opts) {
        super(opts)
    }

    log = (...opts) => {
        let date = new Date();
        return console.log(`[${date.toISOString}] |`, ...opts)
    }

    /**
     * Gets context from a message object 
     * @param {Discord.message} message
     */
    getContext = async (message) => {
        return new Context(message.args, message.author, this, message.channel, message.guild, message.me, message)
    }

    Update = async () => {
        await UpdateUtils();
    }
}

module.exports = CustomBot;