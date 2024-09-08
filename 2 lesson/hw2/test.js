//task1

var event = require('events');
// var emitter = new event.EventEmitter;

// var firstSentence = () => {
//     console.log('Hello, my name is Danylo!');
// }


// emitter.on('click', firstSentence);


// emitter.emit('click');



//task2

function readAndWrite() {
    this._file = '';
}

readAndWrite.prototype = new event.EventEmitter();

readAndWrite.prototype.Read = function(path) {
    console.log(`File reading from this \"${path}\"`);
    this.emit('Read', path);
}

readAndWrite.prototype.Write = function(path, txt) {
    console.log(`File writing in this \"${path}\" with this info \"${txt}\"`);
    this.emit('Write', path, txt);
}

exports.readAndWrite = readAndWrite;