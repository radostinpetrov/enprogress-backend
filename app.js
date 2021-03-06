var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv-safe').config()

const port = process.env.PORT || 3000;

const db = require('./queries')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public-flutter')));

app.get('/', (request, response) => {
	response.json({ info: 'Node.js, Express, and Postgres API' })
})

let server = app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.get('/users/tasks/:id', db.getTasksByUser)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)
app.patch('/users/:id', db.patchUser)

app.get('/tasks', db.getTasks)
app.get('/tasks/:id', db.getTaskById)
app.get('/tasks/:id/subtasks', db.getSubTaskById)
app.post('/tasks', db.createTask)
app.put('/tasks/:id', db.updateTask)
app.delete('/tasks/:id', db.deleteTask)

app.get('/workmoderequests', db.getWorkModeRequests)
app.get('/workmoderequests/:id', db.getWorkModeRequestById)
app.post('/workmoderequests', db.createWorkModeRequest)
app.delete('/workmoderequests/:id', db.deleteWorkModeRequestById)

module.exports = { app, server };