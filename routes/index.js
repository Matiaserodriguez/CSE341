const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const { helloWorld } = require('../controllers');

router.use('/helloWorld', helloWorld);
router.use('/contacts', require('./contacts'));
// Swagger routes
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
