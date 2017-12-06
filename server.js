if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const PORT = config.PORT[process.env.NODE_ENV] || process.env.PORT;
const router = require('./routes/');

mongoose.Promise = global.Promise;

app.use(express.static(path.join(__dirname, '/public')));

mongoose.connect(db, { useMongoClient: true })
  .then(() => console.log('successfully connected to', db))
  .catch(err => console.log('connection failed', err));

app.options('*', cors());
app.use(cors());

app.use(bodyParser.json());

app.use(router);

module.exports = app;

app.use((err, req, res, next) => {
  if (err.type === 404) return res.status(404).send({ msg: 'page not found' });
  if (err.type === 400) return res.status(400).send({ msg: 'bad request' });
  if (err.type === 422) return res.status(422).send({ msg: 'bad query' });
  res.status(500).send(err);
  next();
});
