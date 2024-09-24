var express = require('express');
var mssql = require('mssql');

var app = express();
var port = 8080;
// параметры соединения с бд
var config = {
	user: 'admin',   				// пользователь базы данных
	password: 'admin', 	 			// пароль пользователя 
	server: 'MAINDANYA\\SQLEXPRESS', 			// хост
	database: 'testdb',    			// имя бд
	port: 1433,			 			// порт, на котором запущен sql server
    options: {
        encrypt: true,  // Использование SSL/TLS
        trustServerCertificate: true // Отключение проверки самоподписанного сертификата
    },
}
var connection = new mssql.ConnectionPool(config);

app.get('/', function (req, res) {
	connection.connect(function (err) {
		// транзакция - безопасная операция над бд с возможностью отката изменений в случае ошибки при выполнении запроса  
		var transaction = new mssql.Transaction(connection);

		transaction.begin(function (err) {
			var request = new mssql.Request(transaction);
			var request1 = new mssql.Request(transaction);
			request1.query("INSERT INTO Panel (Login, Password) VALUES ('admin, 'admin123')");
			request.query("INSERT INTO items (name, description) VALUES ('test item', 'some text')", function (err, data) {

				if (err) {
					console.log(err);
					transaction.rollback(function (err) {
						console.log('rollback successful');
					});
				} else {
					transaction.commit(function (err, data) {
							console.log('data commit success');
							res.send('transaction successful');
					});
				};
			});
		});
	});
});

// демонстрация отката изменений в случае ошибки при выполнении запроса к бд 

app.get('/error', function (req, res) {
	var transaction = new mssql.Transaction(connection);

	transaction.begin(function (err) {
		var request = new mssql.Request(transaction);
		request.query("bad sql", function (err, data) {
			if (err) {
				console.log(err);
				transaction.rollback(function (err) {

					if (err) {
						console.log('rollback error');
					}
					else {
						console.log('rollback successful');
						res.send('transaction rollback successful');
					}
				});
			} else {
				transaction.commit(function (err, data) {
					if (err) {
						console.log('could not commit data');
					}
					else {
						console.log('data commit success');
						res.send('transaction successful');
					};
				});
			};
		});
	});
});

app.listen(port, function () {

	console.log('app listening on port ' + port);

}); 
