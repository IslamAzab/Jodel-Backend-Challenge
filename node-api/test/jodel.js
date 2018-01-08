//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Jodel = require('../app/models/jodel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Jodels', () => {
  beforeEach((done) => { //Before each test we empty the database
    Jodel.remove({}, (err) => { 
      done();
    });
  });
 /*
  * Test the /GET route
  */
  describe('/GET jodels', () => {
    it('it should GET all the jodels', (done) => {
      chai.request(server)
          .get('/api/jodels')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.docs.should.be.a('array');
              res.body.docs.length.should.be.eql(0);
            done();
          });
    });
  });

});