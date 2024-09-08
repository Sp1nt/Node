var obj = require('./test');

var streamFile = new obj.readAndWrite;

streamFile.Read('Secutity.docx');

streamFile.Write('Secutity.docx', 'The information is encrypted');