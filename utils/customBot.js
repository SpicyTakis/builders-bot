const Discord = require('discord.js');
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const Context = require('./customContext');
const UpdateUtils = require('./updateUtils');
const Database = require('./database')

class CustomBot extends Discord.Client {
    constructor(embeddify, owners, ...opts) {
        super(...opts);

        this.owners = owners;
        this.embeddify = embeddify;


        this.fetch = fetch
        fs.readdir(path.join(__dirname, '/../commands'), (err, files) => {
            files.forEach(file => {
                require(path.join(__dirname, '/../commands/', file))(this)
            });
        });

    }

    log = (...opts) => {
        let date = new Date();
        return console.log(`[${date.toISOString()}] |`, ...opts)
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
        let prefix = await Database.getPrefix(ctx);

        if (!ctx.message.content.startsWith(prefix)) {
            return;
        }

        let cleanCommand = ctx.message.content.replace(prefix, '');

        let args = cleanCommand.split(' ')

        for (const command of this.commands.keys()) {

            if (command === args[0]) {
                let cdata = this.commands.get(command)
                let runCommand = cdata.check(this, ctx)
                if (!runCommand) { return await ctx.send('You do not have permission to run this command') }
                cdata.execute(ctx, ...args);
            }
        }
    }

    booleanConverter = (value) => {
        validBooleans = ['yes', 'y', '1', 1, true, 'true']

        if (validBooleans.includes(value)) {
            return false
        } else {
            return true
        }
    }
}

module.exports = CustomBot;