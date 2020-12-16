const express = require('express');
const app = express();

const Log = require('./models/log');

app.use(express.json());

app.use('/api/v1/recipes', require('./controllers/recipes'));

app.post('/api/v1/logs', (req, res, next) => {

});

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
