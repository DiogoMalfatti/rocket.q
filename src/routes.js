const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')
const route = express.Router()

//  ==> PASSWORD ROUTE
route.get('/', (req, res) => res.render('index', { page: 'enter-room' }))
route.get('/create-pass', (req, res) =>
  res.render('index', { page: 'create-pass' }),
)
//  *** PASSWORD ROUTE

//  ==> ROOM ROUTE
route.post('/create-room', RoomController.create)
route.get('/room/:room', RoomController.open)
route.post('/enterroom', RoomController.enter)
//  *** ROOM ROUTE

//  ==> QUESTION ROUTE
route.post('/question/create/:room', QuestionController.create)
//  *** QUESTION ROUTE

//  ==> MODAL ROUTE
route.post('/question/:room/:question/:action', QuestionController.index)
//  *** MODAL ROUTE

module.exports = route
