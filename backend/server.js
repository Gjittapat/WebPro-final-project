require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const itemRoutes = require('./routes/item')
const requestItem = require('./routes/requestItem')
const cors = require('cors')
const bodyParser = require('body-parser');
const collectionRoutes = require('./routes/collection')

// express app
const app = express()

// middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json())
// cors
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
// routes
// app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
app.use('/api/item', itemRoutes)
app.use('/api/itemrequest', requestItem)
app.use('/api/collection', collectionRoutes)
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })