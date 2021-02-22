const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./config/passport.js')();

const root = require('./routers/root.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/', root);

const PORT = process.env.PORT || 4545;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

