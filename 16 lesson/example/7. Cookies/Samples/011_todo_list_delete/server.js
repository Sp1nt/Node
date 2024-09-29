var express  = require('express'); 
var app = express();
var mssql = require('mssql');
var Cookies = require('cookies');

var path = require('path');
var bodyParser = require('body-parser'); 

var port = 8080; 

var connection = require('./js/config');

// подключение модулей для обработки запросов 
var displayHandler = require('./js/displayhandler'); 
var insertHandler = require('./js/inserthandler'); 
var editHandler = require('./js/edithandler'); 

// установка генератора шаблонов 
app.set('views', __dirname + '/pages'); 
app.set('view engine', 'ejs');

// подгрузка статических файлов из папки pages 
app.use(express.static(path.join(__dirname, 'pages')));

// middleware для обработки данных в формате JSON 
var jsonParser = bodyParser.json();
var textParser = bodyParser.text(); 

app.use(jsonParser); 
app.use(textParser); 

// Используем body-parser для обработки данных из формы
app.use(bodyParser.urlencoded({ extended: true }));

// загрузить таблицу с элементами 
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, "/index.html"));
})

app.post('/SignUp', function(req, res) {
	var ps = new mssql.PreparedStatement(connection);
	
	const login = req.body.login;
	const password = req.body.password;

	console.log(`${login}, ${password}`)

	let query = `
		SELECT *
		FROM Users
		WHERE Users.login = @login AND 
			Users.password = @password
	`;

	ps.input('login', mssql.NVarChar);
	ps.input('password', mssql.NVarChar);

	ps.prepare(query, (err) => {
        if (err) { console.error(err); }

        ps.execute({login, password}, (err, data) => {
            if (err) { console.error(err); }

			if (data.recordset.length != 0) {
				res.cookie('login:', login, { maxAge : 10000 });
				console.log(req.cookies);

				res.redirect('/indexPage');
			} else {
				res.send('Неправильный логин или пароль');
			}

            ps.unprepare();
        })
    });
});

app.get('/indexPage', displayHandler.displayItems);

// загрузка страницы для создания нового элемента 
app.get('/add', insertHandler.loadAddPage); 
// добавить новый элемент 
app.post('/add/newItem', insertHandler.addRow); 

// отобразить элементы в режиме редактирования 
app.get('/edit', displayHandler.displayItems); 

// загрузка страницы для редактирования элементов 
app.get('/edit/:id', editHandler.loadEditPage);

// редактирование элемента в бд 
app.put('/edit/:id', editHandler.changeItem);

// удаление элемента из бд 
app.delete('/edit/:id', editHandler.removeItem); 

// обработка ошибок 
app.use(function(err, req, res, next) {
	if (err) console.log(err.stack); 

	res.status(500).send('oops...something went wrong'); 
}); 

app.listen(port, function() { 

	console.log('app listening on port ' + port); 

});  
