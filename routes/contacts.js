const routes = require("express").Router();
const { getAll, getOne } = require("../controllers/contactsController");

routes.get("/", getAll);
routes.get("/:id", getOne);

module.exports = routes;
