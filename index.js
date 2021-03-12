const discord = require('discord.js');

const manager = new discord.ShardingManager('./bot.js', { token: 'NzU4MDQ3OTg2NzY3ODg4NTY1.X2pRMw.zpgqtlW0U' })
manager.spawn()