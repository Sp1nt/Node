var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

var categoryRouter = express.Router();
var categoryProducts = express.Router();

app.use(function(req, res, next){
    var data = `Address : ${req.ip}; Time: ${new Date().toLocaleString()}; URL : ${req.url}\n`;

    fs.appendFile('logger.txt', data, function(err){
        console.log('Data written to log file');
    });
    
    next();
});

categoryRouter.route("/")
    .get(function(req, res){
        fs.readFile('category.txt', 'utf8', function(err, data) {
            var categories = JSON.parse(data);
            res.json(categories);
        });
    });

categoryRouter.route("/:category")
    .get(function(req, res){
        fs.readFile('category.txt', 'utf8', function(err, data) {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            
            var products = JSON.parse(data);
            var buff = products.find(p => p.category.toLowerCase() === req.params.category.toLowerCase());
            res.json(buff);
        });
    });

app.use("/category", categoryRouter);

categoryProducts.route("/")
    .get(function(req, res){
        fs.readFile('products.txt', 'utf8', function(err, data) {
            var products = JSON.parse(data);
            res.json(products);
        });
    });

categoryProducts.route("/:name")
    .get(function(req, res){
        fs.readFile('products.txt', 'utf8', function(err, data) {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
    
            var products = JSON.parse(data);
            var buff = products.find(p => p.name.toLowerCase() === req.params.name.toLowerCase());
            res.json(buff);

        });
    });

app.use("/products", categoryProducts);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
