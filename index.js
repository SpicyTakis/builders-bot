const discord = require('discord.js');
const config = require('./config.json');

const manager = discord.ShardingManager('./bot.js', { token: process.env.TOKEN || config.token })