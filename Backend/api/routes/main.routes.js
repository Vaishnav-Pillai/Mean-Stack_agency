var express = require('express');
var router = express.Router();
const mainController = require('../controller/main.controller');

//HTTP Verbs : Post - Create, Get - Read, Put - Update, Delete

router.post('/providers',mainController.create);

router.get('/providers',mainController.readAll);

router.get('/providers/:id',mainController.readOne);

router.put('/providers/:id',mainController.update);

router.delete('/providers/:id',mainController.deleteOne);

router.delete('/providers',mainController.deleteAll);

module.exports = router;