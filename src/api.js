const express = require('express');
const errorMiddleware = require('./database/middlewares/error');

const loginRouter = require('./database/routes/loginRoute');

const app = express();
app.use(express.json());

app.use(loginRouter);

app.use(errorMiddleware);

module.exports = app;
