
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
}

module.exports = Command;

