const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const { createAudioResource, createAudioPlayer, joinVoiceChannel, VoiceConnectionStatus, AudioPlayerStatus, getVoiceConnection, entersState } = require('@discordjs/voice');

class Command {
    static getPoints(id){
        return 0;
    }
    static random_swear(message){
        var swear = ["Mitä helvettiä?!",
                    "Jumalauta!",
                    "Perkele!",
                    "Saatana!",
                    "Vittu!",
                    "Voi vittujen kevät!"];
        var rand = Math.random();
        var i = Math.floor(rand * Math.floor(swear.length)); //get random index from array
        message.channel.send(swear[i]);
    }
    static async random_swear_vc(client, vchannel){
        if(vchannel==undefined){ console.log("Error: missing voice channel in random_swear_vc"); return; } //avoid crushing when user isnt in vc
        var swear = ["1.wav","2.wav","3.wav","4.wav","5.wav","6.wav","7.wav","8.wav","9.wav","10.wav","11.wav","12.wav","13.wav","14.wav"];
        swear = swear.map(val => { return "media/" + val })
        var rand = Math.random();
        var i = Math.floor(rand * Math.floor(swear.length)); //get random index from array
        const player = createAudioPlayer()
        const connection = joinVoiceChannel({
            channelId: vchannel.id,
            guildId: vchannel.guild.id,
            adapterCreator: vchannel.guild.voiceAdapterCreator
        });
        connection.subscribe(player);
        let resource = createAudioResource(swear[i]);
        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 300e3);
            player.play(resource)
            await entersState(player, AudioPlayerStatus.Playing, 200e3)
        } catch (error) {
            connection.destroy();
            console.log(error);
        }
        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy()
        });
	}

    static penis_party(message){
        message.channel.send("𓂸");
    }
}

module.exports = Command;

