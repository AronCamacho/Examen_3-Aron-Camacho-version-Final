const router = require('express').Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.list);
router.post('/add', customerController.save);
router.get('/update/:num_dato', customerController.edit);
router.post('/update/:num_dato', customerController.update);
router.get('/delete/:num_dato', customerController.delete);
router.get('/buscar/:query', customerController.buscar);

module.exports = router;

