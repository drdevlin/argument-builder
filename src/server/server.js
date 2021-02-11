const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const root = require('./routers/root.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', root);

const PORT = process.env.PORT || 4545;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

