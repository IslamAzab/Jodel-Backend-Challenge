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
    it('it should GET all the jodels with default page(1) and limit(10)', (done) => {
      var jodel = new Jodel({name: "the one jodel", score: 1});
      jodel.save();
      chai.request(server)
          .get('/api/jodels')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.docs.should.be.a('array');
              res.body.docs.length.should.be.eql(1);
              res.body.total.should.be.eql(1);
              res.body.limit.should.be.eql(10);
              res.body.page.should.be.eql(1);
            done();
          });
    });
    it('it should GET all the jodels with different page(2) and limit(20)', (done) => {
      chai.request(server)
          .get('/api/jodels')
          .query({page: 2, limit: 20})
          .end((err, res) => {
              res.should.have.status(200);
              res.body.docs.should.be.a('array');
              res.body.docs.length.should.be.eql(0);
              res.body.total.should.be.eql(0);
              res.body.limit.should.be.eql(20);
              res.body.page.should.be.eql(2);
            done();
          });
    });
    it('it should GET all the jodels filtered by score', (done) => {
      var jodel1 = new Jodel({name: "the 1st jodel", score: 1});
      jodel1.save();
      var jodel2 = new Jodel({name: "the 2nd jodel", score: 2});
      jodel2.save();
      chai.request(server)
          .get('/api/jodels')
          .query({score: 2})
          .end((err, res) => {
              console.log(res.body)
              res.should.have.status(200);
              res.body.docs.should.be.a('array');
              res.body.docs.length.should.be.eql(1);
              res.body.total.should.be.eql(1);
              res.body.limit.should.be.eql(10);
              res.body.page.should.be.eql(1);
              res.body.docs[0]._id.should.be.eql(jodel2.id);
            done();
          });
    });
    it('it should GET all the jodels filtered by name', (done) => {
      var jodel1 = new Jodel({name: "the 1st jodel", score: 1});
      jodel1.save();
      var jodel2 = new Jodel({name: "the 2nd jodel", score: 2});
      jodel2.save();
      chai.request(server)
          .get('/api/jodels')
          .query({name: "the 1st jodel"})
          .end((err, res) => {
              console.log(res.body)
              res.should.have.status(200);
              res.body.docs.should.be.a('array');
              res.body.docs.length.should.be.eql(1);
              res.body.total.should.be.eql(1);
              res.body.limit.should.be.eql(10);
              res.body.page.should.be.eql(1);
              res.body.docs[0]._id.should.be.eql(jodel1.id);
            done();
          });
    });
  });

  /*
  * Test the /POST route
  */
  describe('/POST jodels', () => {
    it('it should POST a simple jodel', (done) => {
      let jodel = {
          name: "the one jodel",
          score: 1984
      }
      chai.request(server)
          .post('/api/jodels')
          .send(jodel)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              res.body.should.have.property('message').eql('Jodel created!');
            done();
          });
    });
    it('should fail if a name field is missing', (done) => {
        let jodel = { score: 3 };
        chai.request(server)
            .post('/api/jodels')
            .send(jodel)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.should.have.property('message').eql('Jodel validation failed: name: Path `name` is required.');
                done();
            });
    });
    it('should fail if a score field is missing', (done) => {
        let jodel = { name: "the one jodel" };
        chai.request(server)
            .post('/api/jodels')
            .send(jodel)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.should.have.property('message').eql('Jodel validation failed: score: Path `score` is required.');
                done();
            });
    });
    it('should fail if a score field is not a number', (done) => {
        let jodel = { name: "the one jodel", score: "the score" };
        chai.request(server)
            .post('/api/jodels')
            .send(jodel)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.should.have.property('message').eql('Jodel validation failed: score: Cast to Number failed for value "the score" at path "score"');
                done();
            });
    });
  });

});