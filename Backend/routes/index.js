var express = require('express');
var router = express.Router();
const mainController = require('../controller/main');

/* GET home page. */
router.get('/', mainController.home);
router.get('/about', mainController.about);
router.get('/contact', mainController.contact);
router.get('/error', mainController.error);
router.get('/forgot-password', mainController.forgotpassword);
router.get('/login', mainController.login);
router.get('/register', mainController.register);

module.exports = router;
