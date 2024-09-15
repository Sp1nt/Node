var express = require('express');
var fs = require('fs');
var app = express();

app.get('/name/:name', function(request, response) {
    console.log(`keyword: ${request.params.name}`);

    fs.readFile('products.txt', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        var products = JSON.parse(data);
        var buff = products.find(p => p.name.toLowerCase() === request.params.name.toLowerCase());
        response.json(buff);
    });
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
