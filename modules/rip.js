/*
 * Command: Rip
 * Description: Rips all uploaded images and videos from 4chan and reuploads them.
*/

// Tis needs url module.
const url = require('url');

// https://codeburst.io/an-introduction-to-web-scraping-with-node-js-1045b55c63f7
const rp = require('request-promise');
const cheerio = require('cheerio');

// For embeds because perrtty
const Discord = require('discord.js');

module.exports = (message, args) => {
    // Some tard called llamasking forgot a url once and noticed this
    if (args[0] === undefined) {
        message.reply('you fucking tard. Give me a thread url.');
        return;
    }

    // Split apart args to get the board and thread.
    var parseURL = url.parse(args[0], true);

    if (!parseURL.host === ('boards.4chan.org' || 'boards.4channel.org')) {
        // lmao fuck off you fag
        message.reply('lmao no easy security issues for you, fucking faggot');

        // That'd be a no from me.
        message.clearReactions();
        message.react('❌');
        return;
    } else {
        // React with a check to confirm the command is being processed.
        message.react('✅');
    }

    // Define request-promise options
    const options = {
        uri: parseURL.href.replace('https://boards.4chan.org/', 'https://boards.4channel.org/'),
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    // Make the request
    // i have no fucking idea what any of this does.
    // i just smashed my keyboard for some time then it worked lmao
    // dont fucking ask me if this is alien technology because i have no fucking clue lmao
    rp(options)
        .then(($) => {
            // i think this says something lmao
            var embed = new Discord.RichEmbed()
                .addField('Thread URL:', parseURL.href)
                .setTitle('File count: ' + $('.fileThumb').length)
                .setColor(0x7289DA)
                .setFooter('If files are not uploaded, that means my internet gave up on one, some, or many files.');
            message.reply(embed);

            // i think this saves something idk
            var files = new Array();
            $('.fileThumb').each(function () {
                files.push(`https:${$(this).attr('href')}`);
            });

            // and this uploads a thing i think
            async function sendMsgsAsync(i) {
                await message.channel.send(`${i + 1}/${files.length}`, { files: [files[i]] })
                    .then(() => {
                        //console.log('Success!');
                    })
                    .catch((err) => {
                        message.channel.send(`It appears file ${i + 1}/${files.length} failed to send. Oh well, go fuck that one!`);
                        console.error(err);
                    });

                // callback
                sendMsgsAsync(i + 1);
            }

            sendMsgsAsync(0);
        })
        .catch((err) => {
            // well fuck guess someone's being a nigger
            message.channel.send('Something bad happened! ERROR! ERROR! ERROR!');
            console.error(err);
        });
};