const { SlashCommandBuilder } = require('discord.js');
const { createAudioPlayer, joinVoiceChannel, entersState, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');
const fs = require('node:fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stress')
		.setDescription('Stress the bot for a spicy reaction in voice chat'),
	async execute(interaction) {
        // Defer as audio might play longer then interaction timeout
        await interaction.deferReply({ ephemeral: true });
        // Find channel for reply
        const vchannel = interaction.member.voice.channel;
        if (vchannel==null) {
            // Avoid crushing when user isnt in vc
            await interaction.editReply('This command can only work while you are in voice chat of this guild');
            return;
        }
        if (interaction.client.voice.adapters.get(vchannel.guildId)) {
            // Handle situation of bot already in guild voice chat
            await interaction.editReply('Bot is already stressing in voice chat! you spammer!')
            return;
        }
        // Grab swears audio files saved in the media directory
        const swearFiles = fs.readdirSync('./media').filter(file => file.endsWith('.wav'));
        if (swearFiles.length == 0) {
            interaction.editReply('No swear audio files found in the media directory. Please contact an admin or dev to add some');
            return;
        }
        // Pick a random file to play
        const rand = Math.random();
        const randomIndex = Math.floor(rand * Math.floor(swearFiles.length));
        // Create audio player for the voice channel
        const player = createAudioPlayer();
        const connection = joinVoiceChannel({
            channelId: vchannel.id,
            guildId: vchannel.guild.id,
            adapterCreator: vchannel.guild.voiceAdapterCreator,
        });
        connection.subscribe(player);
        let resource = createAudioResource(`./media/${swearFiles[randomIndex]}`);
        // When done/idle kill voice chat connection
        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
            interaction.deleteReply();
        });
        // Try playing the file
        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 300e3);  // avoid playing before connection is done
            player.play(resource)
            await entersState(player, AudioPlayerStatus.Playing, 200e3);    // if didn't start playing throw an error
        } catch (error) {
            connection.destroy();
            console.log(error);
            await interaction.editReply('Unexpected error: please contact admin or devs');
        }
	},
};