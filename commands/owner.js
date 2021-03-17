const Discord = require('discord.js')
const util = require('util');

class OwnerCommands {
    constructor (bot) {
        this.Bot = bot;
        this.Category = "Owner"
        this.Commands = ["eval"]
        
        /**
         * Checks if the user meets certain criteria to run commands
         */
        this.Check = (bot, ctx) => {
            return bot.owners.indexOf(ctx.author.id.toString()) > -1;
        }
    }

    eval = async (ctx, ...args) => {
        args = args.slice(1);
        let code = args.join().replace('```', '').replace('js', '').replace(',', ' ');

        let result = '';
        let returned = null;

        const cons = {
            log: (...stuff) => result += (util.format(...stuff) + '\n'),
        };

        try {
            returned = eval(`((console) => { ${code} })`)(cons);
        } catch (e) {
            return await ctx.send(`\`\`\`js\n${e}\n\`\`\``)
        }

        if (result !== '') {
            return await ctx.send(`\`\`\`js\n${result}\n\`\`\``)
        }

        if (returned === null && result === '') {
            return;
        }

        if (returned !== null) {
            return await ctx.send(`\`\`\`js\n${returned}\n\`\`\``)
        }
    }
}

module.exports = async (bot) => {
    let cog = new OwnerCommands(bot);
    await bot.add_command("eval", { check: cog.Check, execute: cog.eval, cog: cog, category: cog.category })
}