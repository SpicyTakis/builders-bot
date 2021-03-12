const Discord = require('discord.js');
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const Context = require('./customContext');
const UpdateUtils = require('./updateUtils');
const Database = require('./database')

class CustomBot extends Discord.Client {
    constructor(...opts) {
        this.fetch = fetch
        super(...opts);
    }

    log = (...opts) => {
        let date = new Date();
        return console.log(`[${date.toISOString}] |`, ...opts)
    }

    login = async (...opts) => {
        fs.readdir(path.join(__dirname, '/commands'), (err, files) => {
            files.forEach(file => {
                require(path.join(__dirname, '/commands/', file))(this)
            });
        });
        super().login(...opts)
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

    add_command = async (commandName, data) => {
        this.commands = new Map();
        this.commands.set(commandName, data);
    }

    processCommands = async (ctx) => {
        prefix = await Database.getPrefix(ctx);

        if (!ctx.message.content.startsWith(prefix)) {
            return;
        }

        cleanCommand = ctx.message.content.replace(prefix, '');

        args = cleanCommand.split(' ')

        for (const command of this.commands.keys()) {
            cleanCommand = ctx.message.replace(prefix, '')

            if (command === args[0]) {
                cdata = this.commands.get(commands)
                cdata.execute(ctx, ...args);
            }
        }
    }
}

module.exports = CustomBot;