const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express_graphql = require('express-graphql')
const schema = require('./graphql')

const initialize = require('./data/initialize')

const env = process.env.NODE_ENV || 'dev'
const PORT = process.env.PORT || 4000

let MONGODB_URI
if(env === 'prod') {
  MONGODB_URI = 'mongodb://david:1994yu@ds247670.mlab.com:47670/opinja'
} else if(env === 'dev') {
  MONGODB_URI = 'mongodb://localhost/opinja'
}
mongoose.connect(MONGODB_URI)
mongoose.Promise = global.Promise

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/graphql', express_graphql({
  schema: schema,
  graphiql: true
}))

app.get('/', (req, res) => res.send('Hello World'))

app.get('/initialize', (req, res) => {
  let result = initialize()
  res.send(result)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${env} mode`))
