const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const streamOptions = { seek: 0, volume: 0.2, passes: 10 };

class Command {
    static getPoints(id){
        return 0;
    }
    static random_swear(message){
        var swear = ["badword1","badword2"];
        var rand = Math.random();
        var i = Math.floor(rand * Math.floor(swear.length)); //get random index from array
        message.channel.send(swear[i]);
    }
    static random_swear_vc(client, vchannel){
        var path = "./";
        var swear = ["1.wav","2.wav","3.wav","4.wav","5.wav","6.wav","7.wav","8.wav","9.wav","10.wav","11.wav","12.wav","13.wav","14.wav"];
        var rand = Math.random();
        var i = Math.floor(rand * Math.floor(swear.length)); //get random index from array
        var broadcast = client.createVoiceBroadcast();
        //broadcast.on("end", () => { sleep(1000); vchannel.leave(); });
        vchannel.join()
          .then(connection => {
            var dispatcher = connection.playBroadcast(broadcast);
            //console.log(path + swear[i]);
            var endme = broadcast.playFile(path + swear[i], streamOptions);
            endme.on("end", () => { setTimeout(function(){
                vchannel.leave()
            }, 2000) });
         }).catch(console.error);
    }
}

module.exports = Command;

