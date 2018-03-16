var auth      = require('./auth'),
    user      = require('./user'),
    purchase   = require('./purchase'),
    product = require('./product'),
    mail      = require('./mail.js');


module.exports = {
  auth      : auth,
  user      : user,
  product   : product,
  purchase  : purchase,
  mail      : mail,
};
