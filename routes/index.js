const routes = require("express").Router();
const { helloWorld } = require("../controllers");

routes.get("/", helloWorld);

module.exports = routes;
