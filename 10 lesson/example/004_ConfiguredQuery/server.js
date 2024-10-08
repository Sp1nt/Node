var express  = require('express'); 
var app = express(); 
var port = 8080; 
var mssql = require('mssql'); 
// параметры соединения с бд
var config = {
	user: 'Ivan',   				// пользователь базы данных
	password: '11111', 	 			// пароль пользователя 
	server: 'Kris', 			// хост
	database: 'testdb',    			// имя бд
	port: 1433,			 			// порт, на котором запущен sql server
    options: {
        encrypt: true,  // Использование SSL/TLS
        trustServerCertificate: true // Отключение проверки самоподписанного сертификата
    },
}
app.use(function(req, res) { 

	var connection = new mssql.ConnectionPool(config); 

	connection.connect(function(err){		
		    // конструктор для предварительного форматирования запросов к бд - PreparedStatement
			var ps = new mssql.PreparedStatement(connection);		
			// метод input позволяет указать значение параметра, который будет использован в запросе  
			// аргументы: 
			
			// name - имя параметра 
			// type - SQL тип данных 
			
			ps.input('param', mssql.Int);
			
			// подготовка запроса 
			ps.prepare('SELECT * FROM items WHERE id=@param ', function(err) {
				
				if (err) console.log(err); 

				// выполнение запроса 
				ps.execute({param: 2}, function(err, data) {
					if (err) console.log(err); 
					
					res.send(data.recordset); 
					console.log('prepared statement executed'); 					
				});
			});		
	});
}); 

app.listen(port, function() { 
	console.log('app listening on port ' + port); 

}); 