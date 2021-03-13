const express = require('express');
const route = express.Router();

const indexRouter = require('./index');
const indexUsers = require('./users');

route.use('/', indexRouter);
route.use('/users', indexUsers);

module.exports = route;