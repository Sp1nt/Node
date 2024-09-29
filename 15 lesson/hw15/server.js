var express  = require('express');
var path = require('path');
var port = 8080;
var app = express();
var news = express();
var aboutUs = express();


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, "/home.html"));
});

news.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/news.html"));
});

aboutUs.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/aboutUs.html"));
});
aboutUs.get('/Company', function(req, res) {
    res.sendFile(path.join(__dirname, "/company.html"));
});
aboutUs.get('/Me', function(req, res) {
    res.sendFile(path.join(__dirname, "/me.html"));
});

app.get('/singIn', function(req, res) {
    res.sendFile(path.join(__dirname, "/singIn.html"));
});

app.get('/singUp', function(req, res) {
    res.sendFile(path.join(__dirname, "/singUp.html"));
});


app.use('/news', news); 
app.use('/aboutUs', aboutUs); 


app.listen(port, function() {
    console.log('app listening on port ' + port);
});