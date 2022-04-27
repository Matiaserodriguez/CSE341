require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');

const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;

app
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Allow-Controll-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Access-Allow-Control-Headers', 
      'Origin, X-Requested-With', 
      'Content-Type', 'Accept', 'Z-Key');
    res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  }
});
