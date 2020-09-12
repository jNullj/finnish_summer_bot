const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

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
        if(vchannel==undefined){ console.log("nooo"); return; } //avoid crushing when user isnt in vc
        var swear = ["1.wav","2.wav","3.wav","4.wav","5.wav","6.wav","7.wav","8.wav","9.wav","10.wav","11.wav","12.wav","13.wav","14.wav"];
        var rand = Math.random();
        var i = Math.floor(rand * Math.floor(swear.length)); //get random index from array
        const connection = await vchannel.join();
        const dispatcher = connection.play(swear[i]);

        dispatcher.on('start', () => {
	        
        });

        dispatcher.on('finish', () => {
	        connection.disconnect();
        });

        dispatcher.on('error', console.error);
	}

    static penis_party(message){
        message.channel.send("𓂸");
    }
}

module.exports = Command;

