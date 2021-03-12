const Discord = require('discord.js')

class OwnerCommands {
    constructor (bot) {
        this.Bot = bot;
        this.Category = "Owner"
        this.Commands = ["eval"]
        
        /**
         * Checks if the user meets certain criteria to run commands
         */
        this.Check = (bot, author) => {
            return author.id in bot.owners;
        }
    }

    eval = async (stuff) => {
        return stuff
    }
}

module.exports = async (bot) => {
    let cog = new OwnerCommands(bot);
    await bot.add_command("eval", { check: cog.Check, execute: cog.eval, cog: cog, category: cog.category })
}