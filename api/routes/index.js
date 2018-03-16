"use strict";

var auth = require('./auth'),
    purchase = require('./purchase'),
    product = require('./product'),
    user = require('./user');

module.exports = {
  auth  : auth,
  purchase : purchase,
  product : product,
  user : user
};
