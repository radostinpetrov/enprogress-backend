let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let db = require('../queries')
chai.use(chaiHttp);

let validUser = {
    name: "JoeExotic",
    email: "joe@gmail.com"
}

const testUserId = 178

describe('Users', () => {
    var insertedUserId;

    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server.app)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.gt(0)
                    done();
                })
        })
    })

    describe('/POST users', () => {
        it('it should not POST a user without an email address', (done) => {
            let user = {
                name: "JoeExotic",
            }
            chai.request(server.app)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error').eql('"email" is required')
                    done()
                })
        })

        it('it should POST a user ', (done) => {
            chai.request(server.app)
                .post('/users')
                .send(validUser)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('message').eql('User successfully inserted!')
                    insertedUserId = res.body.id
                    done()
                })
        })
    })

    describe('/GET/:id user', () => {
        it('it should GET a user by the given id', (done) => {
            chai.request(server.app)
                .get('/users/' + insertedUserId)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body[0].should.be.a('object')
                    res.body[0].should.have.property('id').eql(insertedUserId)
                    res.body[0].should.have.property('email')
                    done()
                })
        })
    })

    describe('/PUT/:id user', () => {
        it('it should UPDATE a user by the given id', (done) => {
            chai.request(server.app)
                .put('/users/' + insertedUserId)
                .send(validUser)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id').eql(insertedUserId)
                    res.body.should.have.property('message').eql('User successfully modified!')
                    done()
                })
        })
    })

    describe('/DELETE/:id user', () => {
        it('it should DELETE a user by the given id', (done) => {
            chai.request(server.app)
                .delete('/users/' + insertedUserId)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id').eql(insertedUserId)
                    res.body.should.have.property('message').eql('User successfully deleted!')
                    done()
                })
        })
    })
})

describe('Tasks', () => {
    var insertedTaskId;

    describe('/GET tasks', () => {
        it('it should GET all the tasks', (done) => {
            chai.request(server.app)
                .get('/tasks')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.gt(0)
                    done()
                })
        })
    })

    describe('/POST tasks', () => {
        it('it should not POST a task without a percentage', (done) => {
            let task = {
                name: 'Essay',
                deadline: "2020-06-09",
                fk_user_id: testUserId,
                subtasks: ['Introduction', 'Content', 'Conclusion'],
                subtaskPercentages: [20, 60, 20]
            }
            chai.request(server.app)
                .post('/tasks')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error').eql('"percentage" is required')
                    done()
                })
        })

        it('it should not POST a task without an associated user id', (done) => {
            let task = {
                name: 'Essay',
                percentage: 0,
                deadline: "2020-06-09",
                subtasks: ['Introduction', 'Content', 'Conclusion'],
                subtaskPercentages: [20, 60, 20]
            }
            chai.request(server.app)
                .post('/tasks')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error').eql('"fk_user_id" is required')
                    done()
                })
        })

        it('it should POST a task ', (done) => {
            let validTask = {
                name: 'Essay',
                percentage: 0,
                deadline: "2020-06-09",
                fk_user_id: testUserId,
                subtasks: ['Introduction', 'Content', 'Conclusion'],
                subtaskPercentages: [20, 60, 20]
            }
            chai.request(server.app)
                .post('/tasks')
                .send(validTask)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('message').eql('Task successfully created!')
                    insertedTaskId = res.body.id
                    done()
                })
        })
    })

    describe('/GET/:id task', () => {
        it('it should GET a task by the given id', (done) => {
            chai.request(server.app)
                .get('/tasks/' + insertedTaskId)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body[0].should.be.a('object')
                    res.body[0].should.have.property('id').eql(insertedTaskId)
                    res.body[0].should.have.property('percentage')
                    done()
                })
        })
    })

    describe('/PUT/:id task', () => {
        it('it should UPDATE a task by the given id', (done) => {
            let validTask = {
                name: 'Essay',
                percentage: 0,
                deadline: "2020-06-09",
                fk_user_id: testUserId,
                subtasks: ['Introduction', 'Content', 'Conclusion'],
                subtaskPercentages: [20, 60, 20]
            }
            chai.request(server.app)
                .put('/tasks/' + insertedTaskId)
                .send(validTask)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id').eql(insertedTaskId)
                    res.body.should.have.property('message').eql('Task successfully modified!')
                    done()
                })
        })
    })

    describe('/DELETE/:id task', () => {
        it('it should DELETE a task by the given id', (done) => {
            chai.request(server.app)
                .delete('/tasks/' + insertedTaskId)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id').eql(insertedTaskId)
                    res.body.should.have.property('message').eql('Task successfully deleted!')
                    done()
                })
        })
    })
})

describe('WorkModeRequests', () => {
    var insertedWorkModeRequestId

    after(() => {
        db.pool.end().then(console.log("connection to db closed"))
        server.server.close()
    })

    describe('/GET workModeRequests', () => {
        it('it should GET all the workModeRequests', (done) => {
            chai.request(server.app)
                .get('/workmoderequests')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.gt(0)
                    done();
                })
        })
    })

    describe('/POST workModeRequests', () => {
        it('it should not POST a workModeRequest without a start_time', (done) => {
            let workModeRequest = {
                fk_sender_id: testUserId,
                fk_recipient_id: testUserId,
                duration: 10
            }
            chai.request(server.app)
                .post('/workmoderequests')
                .send(workModeRequest)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error').eql('"start_time" is required')
                    done()
                })
        })

        it('it should not POST a workModeRequest without a duration', (done) => {
            let workModeRequest = {
                fk_sender_id: testUserId,
                fk_recipient_id: testUserId,
                start_time: "2020-06-12 19:00:00",
            }
            chai.request(server.app)
                .post('/workmoderequests')
                .send(workModeRequest)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    res.body.should.have.property('error').eql('"duration" is required')
                    done()
                })
        })

        it('it should POST a workModeRequest ', (done) => {
            let workModeRequest = {
                fk_sender_id: testUserId,
                fk_recipient_id: testUserId,
                start_time: "2020-06-12 19:00:00",
                duration: 10
            }
            chai.request(server.app)
                .post('/workmoderequests')
                .send(workModeRequest)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('message').eql('WorkModeRequest successfully inserted!')
                    insertedWorkModeRequestId = res.body.id
                    done()
                })
        })
    })

    describe('/GET/:id workModeRequest', () => {
        it('it should GET a workModeRequests by the given id', (done) => {
            chai.request(server.app)
                .get('/workmoderequests/' + insertedWorkModeRequestId)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body[0].should.be.a('object')
                    res.body[0].should.have.property('id').eql(insertedWorkModeRequestId)
                    res.body[0].should.have.property('start_time')
                    done()
                })
        })
    })


    describe('/DELETE/:id workModeRequest', () => {
        it('it should DELETE a workModeRequest by the given id', (done) => {
            chai.request(server.app)
                .delete('/workmoderequests/' + insertedWorkModeRequestId)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id').eql(insertedWorkModeRequestId)
                    res.body.should.have.property('message').eql('WorkModeRequest successfully deleted!')
                    done()
                })
        })
    })

})
