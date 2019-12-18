const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const facebookRouter = require('./routes/facebook/index');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/facebook', facebookRouter);

// @steeve: 3 lines below getting random MongoTimeout error
// TODO:figure out why (probably Mongo Atlas IP whitelist)
// const { DB_USER, DB_PASSWORD } = process.env;
// const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0-7tgcb.mongodb.net/test?retryWrites=true&w=majority`;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
