require('dotenv').config();
const express = require('express');

const app = express();
const port = 8000;

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
