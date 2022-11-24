require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = 8000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
const index = require('./routes/index');
const admin = require('./routes/admin');
const auth = require('./routes/auth');

app.use('/', index);
app.use('/admin', admin);
app.use('/auth', auth);

app.listen(port, () => {
  console.log('[BE] CheckPoint running on http://localhost:8000');
});
