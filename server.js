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
    res.setHeader('Access-Control-Allow-Origin', '*');
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
