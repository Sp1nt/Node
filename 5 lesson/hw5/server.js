var http = require('http'); 
var fs = require('fs'); 
var url = require('url');
var path = require('path'); 
var querystring = require('querystring');


var port = 8080;

http.createServer(function(req, res) {

    // обработка ошибок запросв
    req.on('error', function (err) {
        console.log(err);
    }); 

    if (req.url == "/") {
            // чтение файла index.html
            var file_path = path.join(__dirname, 'index.html');
            fs.readFile(file_path, function (err, data) { 


                if (err) {
                    console.log(err);
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write('Not Found!');

                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' }); 

                    res.write(data.toString());

                }

                res.end();
            })

        } else if (req.url == "/login" && req.method == "POST") {

            var body = ''; 

            req.on('data', buff => {
                body += buff.toString();
            });

            req.on('end', () => {
                let data = querystring.parse(body);
                console.log('Received data:', data);
    
                console.log(`login: ${data.login}`);
                console.log(`password: ${data.password}`);

                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write('Registration successful');
                res.end();
            });

    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('Resource not found'); 
    }

}).listen(port, function () {
    console.log('server running on port ' + port);
});
