const express = require('express');
require('express-async-errors');

const cors = require('./app/middlewares/cors');
const handleError = require('./app/middlewares/handleError');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.use(cors);

app.use(routes);

app.use(handleError);

app.listen(3001, () => console.log('🔥 Server started in http://localhost:3001'));
