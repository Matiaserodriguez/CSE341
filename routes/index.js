const router = require('express').Router();
const { helloWorld } = require('../controllers');

router.use('/helloWorld', helloWorld);
router.use('/api/contacts', require('./contacts'));
router.use('/api/contacts/:id', require('./contacts'));

module.exports = router;
