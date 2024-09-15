var express = require('express');
const path = require('path');


var app = express();

app.get('/', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, "/main.html"));
});

app.get('/home', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, "/home.html"));
});

app.get('/news', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, "/news.html"));
});

app.get('/about', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, "/about.html"));
});

app.get('/signIn', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, "/signIn.html"));
});

app.get('/signUp', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, "/signUp.html"));
});

app.listen(8080);