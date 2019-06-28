// for testing/easy configuration
const botinfo = require("./botinfo.js");

const TOKEN = botinfo.token;
const Discord = require('discord.js');
const bot = new Discord.Client();
// login the bot
bot.login(TOKEN);
// critical, makes sure the bot will only start after discord gives it the green flag
bot.on('ready', () => {
  console.log('I am ready!');
});
// Load commands class
const Command = require('./Command.js');

// create an event listener for messages
bot.on('message', message => {
  switch (message.content) {
    case '!points':
      //points = Command.getPoints(message.author.id);
      //message.reply('You have '+points+' points.');
      break;
    case (message.content.match(/^!setBDay /) || {}).input:
        //example of command with match
        break;
    case '!stress':
      Command.random_swear_vc(bot);
      break;
  
    default:
        //at random (1% chance) write a new msg
        if(Math.random()>0.99){
            Command.random_swear(message);
        }
        break;
  }
});
