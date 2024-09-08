var obj = require('./test');

const participants = [
    new obj.Human('Human', 1000, 2),
    new obj.Cat('Cat', 300, 3),
    new obj.Robot('Robot', 2000, 4)
];

const obstacles = [
    new obj.RunningTrack(650),
    new obj.Wall(2)
];

participants.forEach(participant => {
    console.log(`${participant.name} starts`);

    for (const obstacle of obstacles) {
        if (!obstacle.overcome(participant)) {
            console.log(`${participant.name} withdrew from participation.`);
            break;
        }
    }
});