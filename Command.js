const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

export const getPoints = (id) => {
    return 0;
};

export const random_swear = (message) => {
    const swear = ["Mitä helvettiä?!",
                   "Jumalauta!",
                   "Perkele!",
                   "Saatana!",
                   "Vittu!",
                   "Voi vittujen kevät!"];
    const rand = Math.random();
    const i = Math.floor(rand * Math.floor(swear.length)); // get random index from array
    message.channel.send(swear[i]);
};

export const penis_party = (message) => {
    message.channel.send("𓂸");
};

