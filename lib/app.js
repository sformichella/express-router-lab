const express = require('express');
const app = express();

const Log = require('./models/log');

app.use(express.json());

app.use('/api/v1/recipes', require('./controllers/recipes'));

app.post('/api/v1/logs', (req, res, next) => {
  Log
    .insert(req.body)
    .then(log => res.send(log))
    .catch(next);
});

app.get('/api/v1/logs', (req, res, next) => {
  Log
    .find()
    .then(logs => res.send(logs))
    .catch(next);
});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
