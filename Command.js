const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
const streamOptions = { seek: 0, volume: 0.7, passes: 3 };
const ffmpeg = require("ffmpeg");

class Command {
    static getPoints(id){
        return 0;
    }
    static random_swear(message){
        var swear = ["Dreamers, I have for you a tale of triumph over adversity. Of one person actin' true to their truest self.",
"Get comfy, Dreamers. One of our own believes they are the equal of our foe and, baby, they are actin' like it.",
"Word's comin' in of so many of you bein' your best selves. Nora is just beside herself with admiration.",
"Dreamers, Dreamers, Dreamers! There just is no. holding. you. all. back!",
"Things seem tough, Nora knows, but believe: though it's going outta style there are people workin' to make this System a better place.",
"Ladies. And. Gentlemen. Listeners of all ages. I present to you. Walking amongst us. The once. And future. Bad. Ass.",
"If there's one thing I've learned, Dreamers, it's this: Just when you think you've had it all, seen it all, done it all... there's always more.",
"Life is a cornucopia, friends. A movable feast. An act of guts and trust. Take it when and where you find it.",
"Does your backbrain feel that reptile tickle of a reward? Do you see that bobbing light ahead, floating through the marsh of what is to come, promising you more and more and more? Do follow, Dreamers, into that sweet black tomorrow?"];
        var rand = Math.random();
        var i = Math.floor(rand * Math.floor(swear.length)); //get random index from array
        message.channel.send(swear[i]);
    }
    static random_swear_vc(client, vchannel){
        if(vchannel==undefined){ return; } //avoid crushing when user isnt in vc
        var path = "./";
        var swear = ["1.wav","2.wav","3.wav","4.wav","5.wav","6.wav","7.wav","8.wav","9.wav","10.wav","11.wav","12.wav","13.wav","14.wav"];
        var rand = Math.random();
        var i = Math.floor(rand * Math.floor(swear.length)); //get random index from array
        var broadcast = client.createVoiceBroadcast();
        //broadcast.on("end", () => { sleep(1000); vchannel.leave(); });
        vchannel.join()
          .then(connection => {
            var dispatcher = connection.playFile(path + swear[i]);
            //console.log(path + swear[i]);
            //var endme = broadcast.playFile(path + swear[i], streamOptions);
            //var endme = broadcast.playArbitraryInput(path + swear[i], streamOptions);
            dispatcher.on("end", () => { setTimeout(function(){
                dispatcher.destroy();
                vchannel.leave();
            }, 2000) });
         }).catch(console.error);
    }
}

module.exports = Command;

