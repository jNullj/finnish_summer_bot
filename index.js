// for testing/easy configuration
import { token } from "./botinfo.js";
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TOKEN = token;
import { IntentsBitField, Client, Collection, Events, MessageFlags } from 'discord.js';
const myIntents = new IntentsBitField()
myIntents.add(IntentsBitField.Flags.GuildMessages);
myIntents.add(IntentsBitField.Flags.GuildVoiceStates);
myIntents.add(IntentsBitField.Flags.GuildMembers);
myIntents.add(IntentsBitField.Flags.Guilds);
myIntents.add(IntentsBitField.Flags.MessageContent);
const bot = new Client({ intents: myIntents });

// slash commands handler
bot.commands = new Collection();

const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = join(commandsPath, file);
	const { data, execute } = await import(`file://${filePath}`);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if (data && execute) {
	  bot.commands.set(data.name, { data, execute });
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

bot.on(Events.InteractionCreate, async interaction => {
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
		await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
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
import { penis_party, random_swear } from './Command.js';

// create an event listener for messages
bot.on('messageCreate', message => {
  if(message.author.id == bot.user.id) { return; }  //ignore replaying to self
  if(message.content.match(/𓂸/) != null){
	penis_party(message);
  }else if(Math.random()>0.97){
	//at random (3% chance) write a new msg
	random_swear(message);
  }
});
