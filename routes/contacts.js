const routes = require('express').Router();
const contacts = require('../controllers/contactsController');

routes.get('/', contacts.getAll);
routes.get('/:id', contacts.getOne);
routes.post('/', contacts.postContact)
routes.put('/:id', contacts.putContact)
routes.delete('/:id', contacts.deleteContact)

module.exports = routes;
