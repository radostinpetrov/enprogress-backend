let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  var insertedUserId;

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
          insertedUserId = res.body.id;
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
        .get('/users/' + insertedUserId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('id').eql(insertedUserId);
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
        .put('/users/' + insertedUserId)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(insertedUserId);
          res.body.should.have.property('message').eql('User successfully modified!')
          done();
        });
    })
  })

  describe('/DELETE/:id user', () => {
    it('it should DELETE a user by the given id', (done) => {
      chai.request(server)
        .delete('/users/' + insertedUserId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(insertedUserId);
          res.body.should.have.property('message').eql('User successfully deleted!')
          done();
        });
    })
  })

});

describe('Tasks', () => {

  var insertedTaskId;

  describe('/GET tasks', () => {
    it('it should GET all the tasks', (done) => {
      chai.request(server)
        .get('/tasks')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.gt(0);
          done();
        });
    });
  });

  describe('/POST tasks', () => {
    it('it should not POST a task without a percentage', (done) => {
      let task = {
        name: 'Essay',
        subtasks: ['Introduction', 'Content', 'Conclusion'],
        subtaskPercentages: [20, 60, 20]
      }
      chai.request(server)
        .post('/tasks')
        .send(task)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql('"percentage" is required');
          done();
        });
    });

    it('it should POST a task ', (done) => {
      let task = {
        name: 'Essay',
        percentage: 0,
        subtasks: ['Introduction', 'Content', 'Conclusion'],
        subtaskPercentages: [20, 60, 20]
      }
      chai.request(server)
        .post('/tasks')
        .send(task)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          insertedTaskId = res.body.id;
          res.body.should.have.property('message').eql('Task successfully created!')
          done();
        });
    });
  });

  describe('/GET/:id task', () => {
    it('it should GET a task by the given id', (done) => {
      chai.request(server)
        .get('/tasks/' + insertedTaskId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.be.a('object');
          res.body[0].should.have.property('id').eql(insertedTaskId);
          res.body[0].should.have.property('percentage');
          done();
        });
    })
  })

  describe('/PUT/:id task', () => {
    it('it should UPDATE a task by the given id', (done) => {
      let task = {
        name: 'Essay',
        percentage: 0,
        subtasks: ['Introduction', 'Content', 'Conclusion'],
        subtaskPercentages: [20, 50, 30]
      }
      chai.request(server)
        .put('/tasks/' + insertedTaskId)
        .send(task)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(insertedTaskId);
          res.body.should.have.property('message').eql('Task successfully modified!')
          done();
        });
    })
  })

  describe('/DELETE/:id task', () => {
    it('it should DELETE a task by the given id', (done) => {
      chai.request(server)
        .delete('/tasks/' + insertedTaskId)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(insertedTaskId);
          res.body.should.have.property('message').eql('Task successfully deleted!')
          done();
        });
    })
  })
});