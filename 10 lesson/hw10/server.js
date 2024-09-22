var express  = require('express'); 
var mssql = require('mssql'); 
var app = express(); 
var port = 8080; 


var config = {
    user: 'admin',                      // пользователь базы данных
    password: 'admin',                  // пароль пользователя 
    server: 'MAINDANYA\\SQLEXPRESS',          // хост
    database: 'Library',                // имя бд
    port: 1433,                         // порт, на котором запущен sql server
    options: {
        encrypt: true,                  // Использование SSL/TLS
        trustServerCertificate: true    // Отключение проверки самоподписанного сертификата
    },
  }

  mssql.connect(config, err => {
    if (err) {
        console.error('Error connect', err);
    } else {
        console.log('Successful connect');
    }
});



var booksRouter = express.Router();

booksRouter.get('/', (req, res) => {
    const request = new mssql.Request(); 
    request.query('SELECT * FROM Books', (err, result) => {
        if (err) {
            console.error('Error', err);
            res.status(500).send('Error retrieving books');
        } else {
            res.json(result.recordset); 
        }
    });
});

booksRouter.get('/:Auth', (req, res) => {  
    const Auth = req.params.Auth;
    const request = new mssql.Request();
    request.input('Auth', mssql.NVarChar, Auth);
    request.query(`SELECT * FROM Books JOIN Authors ON Books.id = Authors.id WHERE Authors.LastName = @Auth`, (err, result) => {
        if (err) {
            console.error('Error', err);
            res.status(500).send('Error retrieving books by author');
        } else {
            res.json(result.recordset);  
        }
    });
});

app.use('/books', booksRouter);

booksRouter.get('/:Press', (req, res) => {  
    const Press = req.params.Press;
    const request = new mssql.Request();
    request.input('Press', mssql.NVarChar, Press);
    request.query(`SELECT * FROM Books JOIN Press ON Books.id = Press.id WHERE Press.Name = @Press`, (err, result) => {
        if (err) {
            console.error('Error', err);
            res.status(500).send('Error retrieving books by author');
        } else {
            res.json(result.recordset);  
        }
    });
});

app.use('/press', booksRouter);

var studentsRouter = express.Router();

studentsRouter.get('/', (req, res) => {
    const request = new mssql.Request();
    request.query('SELECT * FROM Students', (err, result) => {
        if (err) {
            console.error('Error', err);
            res.status(500).send('Error retrieving students');
        } else {
            res.json(result.recordset); 
        }
    });
});

app.use('/students', studentsRouter);

var groups = express.Router();

groups.get('/', (req, res) => {
    
    const request = new mssql.Request(); 
    request.query('SELECT * FROM Groups', (err, result) => {
        if (err) {
            console.error('Error', err);
            res.status(500).send('Error retrieving books');
        } else {
            res.json(result.recordset); 
        }
    });
});

groups.get('/:Group', (req, res) => {  
    const Group = req.params.Group;
    const request = new mssql.Request();
    request.input('Group', mssql.NVarChar, Group);
    request.query('SELECT * FROM Students JOIN Groups ON Students.Id_Group = Groups.Id WHERE Groups.Name = @Group', (err, result) => {
        if (err) {
            console.error('Error', err);
            res.status(500).send('Error retrieving students by group');
        } else {
            res.json(result.recordset);  
        }
    });
});


app.use('/groups', groups);


var facultiesRouter = express.Router();
facultiesRouter.get('/', (req, res) => {
    const request = new mssql.Request(); 
    request.query('SELECT * FROM Faculties', (err, result) => {
        if (err) {
            console.error('Error', err);
            res.status(500).send('Error retrieving faculties');
        } else {
            res.json(result.recordset); 
        }
    });
});

app.use('/faculties', facultiesRouter);

var teachersRouter = express.Router();
teachersRouter.get('/', (req, res) => {
    const request = new mssql.Request(); 
    request.query('SELECT * FROM Teachers', (err, result) => {
        if (err) {
            console.error('Error', err);
            res.status(500).send('Error retrieving teachers');
        } else {
            res.json(result.recordset); 
        }
    });
});

app.use('/teachers', teachersRouter);



app.listen(port, function() { 
	console.log('app listening on port ' + port); 
}); 