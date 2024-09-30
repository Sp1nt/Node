var express = require('express');
var app = express();
var mssql = require('mssql');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var jsonParser = bodyParser.json();
app.use(jsonParser);

var port = 8080;

var dbConfig = {
    user: 'admin',
    password: 'admin',
    server: 'MAINDANYA\\SQLEXPRESS',
    database: 'testdb',
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

var pool = new mssql.ConnectionPool(dbConfig);
pool.connect(function (err) {
    if (err) {
        console.log('Error bd:', err);
    } else {
        console.log('Connection successful');
    }
});

app.use(cookieParser());
app.use(session({
    saveUninitialized: true,
    secret: 'supersecret'
}));

app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var request = new mssql.Request(pool);
    request.input('username', mssql.NVarChar, username)
           .input('password', mssql.NVarChar, password)
           .query('SELECT * FROM Panel WHERE Login = @username AND Password = @password', function (err, result) {
               if (err) {
                   console.error('SQL error', err);
                   return res.status(500).send('error');
               }

               if (result.recordset.length > 0) {
                   var user = result.recordset[0];

                   req.session.username = user.Login;
                   console.log("Login succeeded:", req.session.username);

                       res.send('Login successful: ' + 'sessionID: ' + req.session.id + '; user: ' + req.session.username);

               } else {
                   console.log("Login failed:", req.body.username);
                   res.status(401).send('Login error');
               }
           });
});

app.get('/logout', function (req, res) {
    req.session.username = '';
    console.log('logged out');
    res.send('logged out!');
});

app.get('/admin', function (req, res) {
    if (req.session.username === 'Admin') {
        console.log(req.session.username + ' requested admin page');
        res.render('admin_page');
    } else {
        res.status(403).send('Access Denied!');
    }
});

app.get('/user', function (req, res) {
    if (req.session.username) {
        console.log(req.session.username + ' requested user page');
        res.render('user_page');
    } else {
        res.status(403).send('Access Denied!');
    }
});

app.get('/guest', function (req, res) {
    res.render('guest_page');
});

app.listen(port, function () {
    console.log('app running on port ' + port);
});
