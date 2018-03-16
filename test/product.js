var assert = require('assert'),
    request = require('request'),
    _ = require('lodash'),
    config = require('../config'),
    fs = require('fs'),
    apiServer = `http://localhost:${config.expressPort}/API/product`,
    loginServer = `http://localhost:${config.expressPort}/login`,
    querystring = require('querystring'),
    newProductID = null,
    securityToken = null;


describe('PRODUCT API', function() {
  var server;
  before((done)=>{
    server = require('../server');
    let postData = querystring.stringify({
      email : 'god@zencolor.com',
      password : 'qwerty?><MNB'
    });

    request.post(loginServer, {form: postData}, function (error, response, body){
      let payload = JSON.parse(body);
      securityToken = payload.token;
      done();
    });

  });


  after(()=>{
    //server.close();
  });

  describe('CREATE PRODUCT', function() {

    it('creates a product', function (done) {
      // create inventory item
      let postData = querystring.stringify({
        name : 'Test Product',
        downloadable : true,
        url : 'http://someproducturl.com',
        version : 0.1,
        licenseYears : 1
      });

      request.post({url:apiServer, headers:{'x-access-token':securityToken}, form: postData}, function (error, response, body) {
        if (!error && response.statusCode == 200){
          let newProduct = JSON.parse(body);
          newProductID = newProduct._id;
          assert.equal(newProduct.name, "Test Product");
          done();
        }
      });
    });
  });


  describe('GET PRODUCT', function(){
      it('gets a product by ID', function(done){
        request.get({url:`${apiServer}/${newProductID}`, headers:{'x-access-token':securityToken}}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let product = JSON.parse(body);
              assert.equal(product.name, "Test Product");
              done();
          }
        });
      });

      it('gets a product version number', function(done){
        request.get({url:`${apiServer}/currentversion/Test Product`, headers:{'x-access-token':securityToken}}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let version = JSON.parse(body);
              assert.equal(version, "0.1");
              done();
          }
        });
      });

      it('finds products by name', function(done){
        let postData = querystring.stringify({
          name : 'Test Product'
        });

        request.post({url:`${apiServer}/search`, headers:{'x-access-token':securityToken}, form: postData}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let products = JSON.parse(body);

              assert.notEqual(products.length, 0);
              assert.ok(_.find(products, (i)=>{return i._id == newProductID;}));
              done();
          }
        });
      });
  });

  describe('UPDATE PRODUCT', function(){
    it('updates a product', function(done){
      request.get({url:`${apiServer}/${newProductID}`, headers:{'x-access-token':securityToken}}, function (error, response, body) {
        if (!error && response.statusCode == 200){
          let product = JSON.parse(body);
          product.name = "Another Test Product";

          request.put({url:apiServer, headers:{'x-access-token':securityToken}, form: product}, function (error, response, body){
            if (!error && response.statusCode == 200){
              let numUpdated = JSON.parse(body);
              assert.equal(numUpdated, 1);
              request.get({url:`${apiServer}/${newProductID}`, headers:{'x-access-token':securityToken}}, function (error, response, body) {
                if (!error && response.statusCode == 200){
                    let newProduct = JSON.parse(body);
                    assert.equal(newProduct.name, "Another Test Product");
                    done();
                }
              });
            }
          });
        }
      });
    });
  });

  describe('DELETE PRODUCT', function(){
    it('deletes a product', function(done){
      request.delete({url:apiServer, headers:{'x-access-token':securityToken}, form: {_id:newProductID}}, function (error, response, body){
        if (!error && response.statusCode == 200){
          let numDeleted = JSON.parse(body);
          assert.equal(numDeleted, 1);
          request.get({url:`${apiServer}/${newProductID}`, headers:{'x-access-token':securityToken}}, function (error, response, body){
            let product = JSON.parse(body);
            assert.equal(product, null);
            done();
          });
        }
      });
    });
  });

});
