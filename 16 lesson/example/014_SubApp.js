var express = require('express');
var port = 8080; 

// вложенные приложения используются для маршрутизации 
var app = express(); // главное приложение
var admin = express(); // вложенное приложение 
var user = express(); 

app.get('/', function(req, res) {
	res.writeHead(200, {'Content-Type':'text/html'}); 
	res.write('<a href="/admin">admin page</a>');
	res.write('<br />');  
	res.write('<a href="/user">user page</a>'); 
	res.end(); 
}); 
app.get('/contacts', function(req, res) {
	res.writeHead(200, {'Content-Type':'text/html'}); 
	res.write('<h2>Contacts:</h2>');
	res.write('<br />');  
	res.write('<p>T. 098-456-67-65</p>'); 
	res.end(); 
}); 

admin.get('/', function (req, res) { 
  // свойство mountpath содержить текущий путь маршрутизации(route) 
  console.log(admin.mountpath); // /admin
  res.send('Admin Homepage');
}); 

// событие mount генерируется, когда происходит привязка дочернего(вложенного) 
// приложения к родительскому 
admin.on('mount', function() {
	console.log('admin mounted'); 
}); 

user.get('/', function (req, res) {
	console.log(user.mountpath); // /user 
	res.send('User Homepage'); 
}); 
user.get('/contacts', function(req, res) {
	res.writeHead(200, {'Content-Type':'text/html'}); 
	res.write('<h2>USER Contacts:</h2>');
	res.write('<br />');  
	res.write('<p>T. 098-456-67-65</p>'); 
	res.end(); 
}); 

user.on('mount', function() {
	console.log('user mounted'); 
}); 

// связывание главного приложения со вложенным 
app.use('/admin', admin); 
app.use('/user',user); 

app.listen(port, function() {
	console.log('app running on port ' + port); 
}); 