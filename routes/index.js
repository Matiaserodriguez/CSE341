const router = require('express').Router();
const { helloWorld } = require('../controllers');

router.use('/helloWorld', helloWorld);
router.use('/api/contacts', require('./contacts'));
router.use('/api/createContact', require('./contacts'));
router.use('/api/updateContact', require('./contacts'));
router.use('/api/deleteContact', require('./contacts'));

module.exports = router;
