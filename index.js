// for testing/easy configuration
const botinfo = require("./botinfo.js");

const TOKEN = botinfo.token;
const Discord = require('discord.js');
const myIntents = new Discord.IntentsBitField()
myIntents.add(Discord.IntentsBitField.Flags.GuildMessages);
myIntents.add(Discord.IntentsBitField.Flags.GuildVoiceStates);
myIntents.add(Discord.IntentsBitField.Flags.GuildMembers);
myIntents.add(Discord.IntentsBitField.Flags.Guilds);
myIntents.add(Discord.IntentsBitField.Flags.MessageContent);
const bot = new Discord.Client({ intents: myIntents });
// login the bot
//bot.on('debug', console.log)
bot.login(TOKEN);
// critical, makes sure the bot will only start after discord gives it the green flag
bot.on('ready', () => {
  console.log('I am ready!');
});
// Load commands class
const Command = require('./Command.js');

// create an event listener for messages
bot.on('messageCreate', message => {
  if(message.author.id == bot.user.id) { return; }  //ignore replaying to self
  switch (message.content) {
    case '!points':
      //points = Command.getPoints(message.author.id);
      //message.reply('You have '+points+' points.');
      break;
    case (message.content.match(/^!setBDay /) || {}).input:
        //example of command with match
        break;
    case '!stress':
      Command.random_swear_vc(bot, message.member.voice.channel);
      break;
    default:
        if(message.content.match(/𓂸/) != null){
            Command.penis_party(message);
        }else if(Math.random()>0.97){
            //at random (3% chance) write a new msg
            Command.random_swear(message);
        }
        break;
  }
});
