var assert = require('assert'),
    request = require('request'),
    moment = require('moment'),
    machineID = require('node-machine-id'),
    _ = require('lodash'),
    config = require('../config'),
    apiServer = `http://localhost:${config.expressPort}/API/purchase`,
    productServer = `http://localhost:${config.expressPort}/API/product`,
    loginServer = `http://localhost:${config.expressPort}/login`,
    querystring = require('querystring'),
    newPurchaseID = null,
    newProductName = null,
    newProductID = null,
    newProductKey = null,
    securityToken = null,
    machineCode = machineID.machineIdSync();


describe('PURCHASE API', function() {
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

  describe('CREATE PURCHASE', function() {
    it('creates a purchase', function (done) {

      let postData = querystring.stringify({
        name : 'Test Product',
        downloadable : true,
        url : 'http://someproducturl.com',
        version : 0.1,
        licenseYears : 1
      });

      request.post({url:productServer, headers:{'x-access-token':securityToken}, form: postData}, function (error, response, body) {
        if (!error && response.statusCode == 200){
          let newProduct = JSON.parse(body);
          newProductID = newProduct._id;
          newProductName = newProduct.name;

          let postData = {
            firstName : 'Test',
            lastName : 'User',
            company : 'Test Co',
            email : 'god@zencolor.com',
            street1 : 'Test St.',
            city : 'Brooklyn',
            state : 'NY',
            postalCode : '11215',
            country : 'US',
            ccNum : config.testCCNum,
            ccCVC : config.testCCCVC,
            ccExpMonth : '11',
            ccExpYear : '2020',
            cart : []
          };

          postData.cart.push({productID : newProductID, productName : newProductName,
          quantity : 1});

          //postData = querystring.stringify(postData);

          request.post({url:`${apiServer}/test`, headers:{'x-access-token':securityToken}, form: postData}, function (error, response, body) {

            if (!error && response.statusCode == 200) {
                let newPurchase = JSON.parse(body);

                newPurchaseID = newPurchase._id;
                assert.equal(newPurchase.email, "god@zencolor.com");
                done();
            }
          });
        }
      });
    });
  });

  describe('GET PURCHASE', function(){
      it('gets a purchase by ID', function(done){
        request.get({url:`${apiServer}/${newPurchaseID}`, headers:{'x-access-token':securityToken}}, function (error, response, body) {

          if (!error && response.statusCode == 200) {
              let purchase = JSON.parse(body);
              assert.equal(purchase.email, "god@zencolor.com");
              newProductKey = purchase['cart'][0]['productKey'];
              done();
          }
        });
      });

      it('finds purchases by email', function(done){
        let postData = querystring.stringify({
          email : 'god@zencolor.com'
        });

        request.post({url:`${apiServer}/search`, headers:{'x-access-token':securityToken}, form: postData}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let purchases = JSON.parse(body);

              assert.notEqual(purchases.length, 0);

              assert.ok(_.find(purchases, (i)=>{return i._id == newPurchaseID;}));
              done();
          }
        });
      });

      it('gets the status of a purchase', function(done){

        while(newProductKey === null){};
        let postData = querystring.stringify({
          productKey : newProductKey,
          machineCode : machineCode
        });

        request.post({url:`${apiServer}/status`, headers:{'x-access-token':securityToken}, form: postData}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let statusMsg = JSON.parse(body);
              assert.equal(statusMsg.message, 'Product Key not activated yet');
              done();
          }
        });
      });

      it('gets the expiration date of a purchase', function(done){

        //while(newProductKey === null){};
        let postData = querystring.stringify({
          productKey : newProductKey
        });

        request.post({url:`${apiServer}/getExpiration`, headers:{'x-access-token':securityToken}, form: postData}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let nextYear = moment().year() + 1;
              let exp = JSON.parse(body);
              let expYear = moment(exp).year();

              assert.equal(nextYear, expYear);
              done();
          }
        });
      });

  });

  describe('UPDATE PURCHASE', function(){
    it('updates a purchase', function(done){
      request.get({url:`${apiServer}/${newPurchaseID}`, headers:{'x-access-token':securityToken}}, function (error, response, body) {
        if (!error && response.statusCode == 200){
          let purchase = JSON.parse(body);
          purchase.firstName = "Updated First Name";
          request.put({url:apiServer, headers:{'x-access-token':securityToken}, form: purchase}, function (error, response, body){
            if (!error && response.statusCode == 200){
              let numUpdated = JSON.parse(body);
              assert.equal(numUpdated, 1);
              request.get({url:`${apiServer}/${newPurchaseID}`, headers:{'x-access-token':securityToken}}, function (error, response, body) {
                if (!error && response.statusCode == 200){
                    let newPurchase = JSON.parse(body);
                    assert.equal(newPurchase.firstName, "Updated First Name");
                    done();
                }
              });
            }
          });
        }
      });
    });
  });

  describe('ACTIVATE / DEACTIVATE PURCHASE', function(){

    it('activates a purchase', function(done){
      let postData = querystring.stringify({
        productKey : newProductKey,
        machineCode : machineCode
      });

      request.post({url:`${apiServer}/activate`, headers:{'x-access-token':securityToken}, form: postData}, function (error, response, body) {
        request.post({url:`${apiServer}/status`, headers:{'x-access-token':securityToken}, form: postData}, function (error, response, body) {
          let statusMsg = JSON.parse(body);
          assert.equal(statusMsg.message, 'Product key is activated for this machine');
          done();
        });
      });
    });

    it('deactivates a purchase', function(done){
      let postData = querystring.stringify({
        productKey : newProductKey,
        machineCode : machineCode
      });
      request.post({url:`${apiServer}/deactivate`, headers:{'x-access-token':securityToken}, form: postData}, function (error, response, body) {
        request.post({url:`${apiServer}/status`, headers:{'x-access-token':securityToken}, form: postData}, function (error, response, body) {
          let statusMsg = JSON.parse(body);
          assert.equal(statusMsg.message, 'Product Key not activated yet');
          done();
        });
      });
    });

  });

  describe('DELETE PURCHASE', function(){
    it('deletes a purchase', function(done){
      request.delete({url:apiServer, headers:{'x-access-token':securityToken}, form: {_id:newPurchaseID}}, function (error, response, body){
        if (!error && response.statusCode == 200){
          let numDeleted = JSON.parse(body);
          assert.equal(numDeleted, 1);
          request.get({url:`${apiServer}/${newPurchaseID}`, headers:{'x-access-token':securityToken}}, function (error, response, body){
            let purchase = JSON.parse(body);
            assert.equal(purchase, null);
            done();
          });
        }
      });
    });
  });

});
