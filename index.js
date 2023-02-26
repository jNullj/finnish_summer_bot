// for testing/easy configuration
const botinfo = require("./botinfo.js");
const fs = require('node:fs');
const path = require('node:path');

const TOKEN = botinfo.token;
const Discord = require('discord.js');
const myIntents = new Discord.IntentsBitField()
myIntents.add(Discord.IntentsBitField.Flags.GuildMessages);
myIntents.add(Discord.IntentsBitField.Flags.GuildVoiceStates);
myIntents.add(Discord.IntentsBitField.Flags.GuildMembers);
myIntents.add(Discord.IntentsBitField.Flags.Guilds);
myIntents.add(Discord.IntentsBitField.Flags.MessageContent);
const bot = new Discord.Client({ intents: myIntents });

// slash commands handler
bot.commands = new Discord.Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
	  bot.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

bot.on(Discord.Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

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
