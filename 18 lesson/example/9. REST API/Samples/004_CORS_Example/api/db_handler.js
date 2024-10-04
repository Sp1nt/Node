// Подключаем модуль mssql для работы с mssql сервером
var mssql = require('mssql'); 

var config = {
    user : 'admin',						// пользователь базы данных
    password : 'admin',					// пароль пользователя
    database : 'testdb',				// имя бд
    server : 'MAINDANYA\\SQLEXPRESS',				// хост
    port : 1433,
    options: {
        encrypt: true,  // Использование SSL/TLS
        trustServerCertificate: true // Отключение проверки самоподписанного сертификата
    },						// порт, на котором запущен sql server
    pool: {
        max: 10, 						// максимальное допустимое количество соединений пула 
        min: 0,  						// минимальное допустимое количество соединений пула 
        idleTimeoutMillis: 30000 		// время ожидания перед завершением неиспользуемого соединения 
    }
}

var connection = new mssql.ConnectionPool(config); 
var pool = connection.connect(function(err) {
	if (err) console.log(err)
}); 

module.exports = pool; 