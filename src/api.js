const express = require('express');
const errorMiddleware = require('./database/middlewares/error');

const loginRouter = require('./database/routes/loginRoute');
const userRouter = require('./database/routes/userRoute');
const categoryRouter = require('./database/routes/categoryRoute');
const postRouter = require('./database/routes/postRouter');

const app = express();
app.use(express.json());

app.use(loginRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(postRouter);

app.use(errorMiddleware);

module.exports = app;
