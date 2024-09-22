var express = require('express');
var mssql = require('mssql');
var path = require('path');
var app = express();
var port = 8080;

var config = {
    user: 'admin',
    password: 'admin',
    server: 'MAINDANYA\\SQLEXPRESS',
    database: 'WebPanel',
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
};

function getAllItems(req, res) {
    let tableRows = '';

    let request = new mssql.Request();
    request.stream = true;
    request.query("SELECT * FROM Users");

    request.on('row', function(row) {
        tableRows += `
        <tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.login}</td>
            <td>${row.password}</td>
        </tr>`;
    });

    request.on('done', function() {
        console.log('Users List:');
        console.log(tableRows);
        res.send('Data logged to console');
    });

    request.on('error', function(err) {
        console.error('Error retrieving items:', err);
        res.status(500).send('Error retrieving items');
    });
}

mssql.connect(config).then(pool => {
    console.log('Successful connect');

    app.use(express.urlencoded({ extended: true }));

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '/pages/index.html'));
    });

    app.get('/signIn', function(req, res) {
        res.sendFile(path.join(__dirname, '/pages/signIn.html'));
    });

    app.get('/signUp', function(req, res) {
        res.sendFile(path.join(__dirname, '/pages/signUp.html'));
    });

    // Обработка формы входа
    app.post('/SignIn', (req, res) => {
        const login = req.body.login;
        const password = req.body.password;

        let request = new mssql.Request();
        const checkAdminQuery = `
            SELECT id, login, 'admin' AS userType
            FROM Admins 
            WHERE login = @login AND password = @password
        `;

        const checkUserQuery = `
            SELECT id, login, 'user' AS userType
            FROM Users 
            WHERE login = @login AND password = @password
        `;

        request.input('login', mssql.NVarChar, login);
        request.input('password', mssql.NVarChar, password);

        request.query(checkAdminQuery, (err, data) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Execution error' });
            }
    
            if (data.recordset.length > 0) {
                // Если найден администратор
                const user = data.recordset[0];
                getAllItems(req, res);
            } else {
                // Проверка в таблице Users
                request.query(checkUserQuery, (err, data) => {
                    if (err) {
                        console.error('Error executing query:', err);
                        return res.status(500).json({ error: 'Execution error' });
                    }
    
                    if (data.recordset.length > 0) {
                        
                        const user = data.recordset[0];
                        res.sendFile(path.join(__dirname, '/pages/user.html'));
                    } else {
                        
                        res.status(401).json({ error: 'Invalid login or password' });
                    }
                });
            }
        });
    });

    // Обработка формы регистрации
    app.post('/SignUp', (req, res) => {
        const { name, login, password } = req.body;

        console.log(`Name: ${name}, Login: ${login}, Password: ${password}`);

        const checkQuery = `SELECT * FROM Users WHERE login = @login`;

        let checkRequest = new mssql.Request();
        checkRequest.input('login', mssql.NVarChar, login);

        checkRequest.query(checkQuery, (err, data) => {
            if (err) {
                console.error('Error executing check query:', err);
                return res.status(500).json({ error: 'Execution error' });
            }

            if (data.recordset.length != 0) {
                res.status(401).json({ error: 'User with this login already exists' });
            } else {
                const insertQuery = `INSERT INTO Users (name, login, password) VALUES (@name, @login, @password)`;
                let insertRequest = new mssql.Request();
                insertRequest.input('name', mssql.NVarChar, name);
                insertRequest.input('login', mssql.NVarChar, login);
                insertRequest.input('password', mssql.NVarChar, password);

                insertRequest.query(insertQuery, (err) => {
                    if (err) {
                        console.error('Error inserting user:', err);
                        return res.status(500).json({ error: 'Insert error' });
                    }

                    res.status(200).send('User registered successfully');
                });
            }
        });
    });

    app.listen(port, function() {
        console.log(`App listening on port ${port}`);
    });

});
