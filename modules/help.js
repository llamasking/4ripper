/*
// Command: Help
// Description: Supplying a list of bot commands.
*/

const Discord = require('discord.js');

module.exports = (message) => {
    var embed = new Discord.RichEmbed()
        .setTitle('Commands')
        .addField('4!help / commands', 'This command.')
        .addField('4!rip [4chan Thread URL]...', 'Upload ALL images and videos on that thread to this channel.')
        .addField('4!ping', 'How crappy is my internet? Please send help. My internet is so fucking slow.')
        .setImage('https://raw.githubusercontent.com/llamasking/TwitblendBot-Discord/master/rainbow.gif')
        .setColor(0x7289DA)
        .setFooter('If you ever run into issues, feel free to DM llamasking#1513.');
    message.channel.send({ embed });
};
