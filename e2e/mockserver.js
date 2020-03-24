//
// This server will be started by Protractor in end-to-end tests.
// Add your API mocks for your specific project in this file.
//
const express = require('express')
const port = 3000

let app = express()
let routes = require('express').Router()

// Add CORS headers so our external Angular app is allowed to connect
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

routes.post('/api/auth/login', (req, res, next) => {
  res.status(200).json({
    role: 1,
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzUwMjIzNjQsImlhdCI6MTU3NDE1ODM2NCwic3ViIjp7ImVtYWlsIjoiYWRtaW5AYXZhbnMubmwiLCJpZCI6IjVkYzlhY2Y3NmUzOTVhMTY1ODkwMjk2MiJ9fQ.qRPy-lTPIopAJPrarJYZkxK0suUJF_XZ9szeTtie4nc'
  })
})

//
// Write your own mocking API endpoints here.
//

// Finally add your routes to the app
app.use(routes)

app.use('*', function(req, res, next) {
  next({ error: 'Non-existing endpoint' })
})

app.use((err, req, res, next) => {
  res.status(400).json(err)
})

app.listen(port, () => {
  console.log('Mock backend server running on port', port)
})
