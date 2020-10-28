require('dotenv').config()
const express = require('express');
const bugRouter = require('./routes/bugs');
const userRouter = require('./routes/users');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('home page');
});

app.use('/bugs', bugRouter);
app.use('/users', userRouter);

// global error handler
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
