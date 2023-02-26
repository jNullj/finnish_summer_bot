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

    static penis_party(message){
        message.channel.send("𓂸");
    }
}

module.exports = Command;

