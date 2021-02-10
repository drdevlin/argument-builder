const express = require('express');
const bodyParser = require('body-parser');

const root = require('./routers/root.js');

const app = express();
app.use(bodyParser.json());
app.use('/', root);

const PORT = process.env.PORT || 4545;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

