class Participant{
    constructor(name, maxRun, maxJump){
        this.name = name;
        this.maxRun = maxRun;
        this.maxJump = maxJump;
    }
    run(length){
        if(this.maxRun >= length){
            console.log(`${this.name} runs distance ${length} meters`);
            return true;
        }
        else{
            console.log(`${this.name} can't run distance ${length} meters`);
            return false;
        }
    }

    jump(heigth){
        if(this.maxJump >= heigth){
            console.log(`${this.name} jump distance ${heigth} meters`);
            return true;
        }
        else{
            console.log(`${this.name} can't jump distance ${heigth} meters`);
            return false;
        }
    }

}

class Human extends Participant {

}

class Cat extends Participant {

}

class Robot extends Participant {
    
}


class Obstacle {
    overcome(participant) {
        console.error(new Error('Something wrong!'));
    }
}

class RunningTrack extends Obstacle {
    constructor(length) {
        super();
        this.length = length;
    }

    overcome(participant) {
        return participant.run(this.length);
    }
}

class Wall extends Obstacle {
    constructor(height) {
        super();
        this.height = height;
    }

    overcome(participant) {
        return participant.jump(this.height);
    }
}

module.exports = {
    Participant: Participant,
    Human: Human,
    Cat: Cat,
    Robot: Robot,
    Obstacle: Obstacle,
    RunningTrack: RunningTrack,
    Wall: Wall
}