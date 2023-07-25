var express = require('express');
var router = express.Router();
const providerController = require('../controller/providers');

/* GET list page. */
router.get('/', providerController.list);
router.get('/details/:id', providerController.details);
router.get('/edit/:id', providerController.edit);
router.post('/update/:id', providerController.update);
router.get('/add', providerController.add);
router.post('/added', providerController.added);
router.get('/delete/:id', providerController.delete);

module.exports = router;
