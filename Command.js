
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
    static random_swear_vc(client){
        var path = "/absulote/path/";
        var swear = ["test.mp3","test2.mp3"];
        var rand = Math.random();
        var i = Math.floor(rand * Math.floor(swear.length)); //get random index from array
        const broadcast = client.createVoiceBroadcast();
        const voiceChannel = client.channels.find("name", "Main");
        voiceChannel.join()
          .then(connection => {
            broadcast.playFile(path + swear[i]);
            const dispatcher = connection.playBroadcast(broadcast);
          })
          .catch(console.error);
    }
}

module.exports = Command;

