var express = require('express');
var path = require('path'); 
// создаем приложение, которое будет принимать запросы, обрабатывать их, и отправлять ответы
var app = express();
// обработчик, который будет срабатывать на get запросы, для маршрута '/'
app.get('/', function(request, response){
    console.log(request.url);
    response.send('<h1>Hello, world!</h1>');
});

app.get('/about', function(request, response){
    console.log(request.url);
    response.send('<h1>About Page</h1>');
});

app.get('/products', function(request, response){
    console.log(request.url);
    response.sendFile(path.join(__dirname, `/data/products.html`));
});

app.listen(8080);