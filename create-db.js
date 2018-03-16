"use strict";
/*
ANNOYING - Mongo doesn't persist any of this unless you touch data
*/
var config = require('./config'),
    Mongo  = require('./mongo'),
    _      = require('lodash'),
    {user, product} = require('./api/controllers'),
    resetCollections = ['purchases','users','products', 'activations'];


var db = new Mongo;
db.connect(config.mongoURI)
  .then(function(){return db.db.admin().listDatabases()})
  .then(function(dbArray){
	 console.log(dbArray)
    var loc = _.findIndex(dbArray, function(o){return o.name == 'zcecomm';});

    if (loc == -1){
      // database doesn't exist yet so create it
      //var {Server, Db} = require('mongodb');

      console.log('CREATED zcecomm database');
    } else {
      console.log('zcecomm database exists');
    }
  })

  .then(function(){
      // drop collections
      for (var i = 0; i < resetCollections.length; i++){
        db.db.dropCollection(resetCollections[i], function(){});
        console.log(resetCollections[i] + ' collection dropped');
      }
  })
  .then(function(){
      // create collections
      for (var i = 0; i < resetCollections.length; i++){
        db.db.createCollection(resetCollections[i], function(){});
        console.log(resetCollections[i] + ' collection created');
      }
  })
  .then(function(){
    let god = {
      email : 'god@zencolor.com',
      password : 'qwerty?><MNB',
      role : 'admin',
      activeYN : true,
      resetKey : null
    };

      // put one record in users
      return user.createUser(god);
  })

  .then(function(){
    db.close();
    console.log('Finished');
  })
