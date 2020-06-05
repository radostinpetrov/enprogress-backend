let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {

  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.gt(0);
          done();
        });
    });
  });

  describe('/POST users', () => {
    it('it should not POST a user without an email address', (done) => {
      let user = {
        name: "JoeExotic",
      }
      chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('"email" is required');
          done();
        });
    });

    it('it should POST a user ', (done) => {
      let user = {
        name: "JoeExotic",
        email: "joe@gmail.com"
      }
      chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('message').eql('User successfully inserted!')
          done();
        });
    });
  });

  describe('/GET/:id user', () => {
    it('it should GET a user by the given id', (done) => {
      let user = {
        name: "JoeExotic",
        email: "joe@gmail.com"
      }
      chai.request(server)
        .get('/users/' + 1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('id').eql(1);
          res.body[0].should.have.property('email');
          done();
        });
    })
  })

  describe('/PUT/:id user', () => {
    it('it should UPDATE a user by the given id', (done) => {
      let user = {
        name: "JoeExotic",
        email: "joe@gmail.com"
      }
      chai.request(server)
        .put('/users/' + 1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('message').eql('User successfully modified!')
          done();
        });
    })
  })

  describe('/DELETE/:id user', () => {
    it('it should DELETE a user by the given id', (done) => {
      chai.request(server)
        .delete('/users/' + 1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('message').eql('User successfully deleted!')
          done();
        });
    })
  })

});

