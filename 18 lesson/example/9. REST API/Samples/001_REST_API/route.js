var express = require('express');

var router = express.Router();

// В данном приложении показана базовая логика построения RESTful API 
router.get('/:id', function (req, res) {
    res.status(200).send('get item by ID ' + req.params.id + '!'); 
});

router.post('/', function (req, res) {
    console.log("get");
    res.status(201).send('create item!');
});

router.put('/:id', function (req, res) {
    res.status(200).send('update item by ID ' + req.params.id + '!');
});

router.delete('/:id', function (req, res) {
    res.status(200).send('remove item by ID ' + req.params.id + '!');
});

// module.exports = { rout: router };