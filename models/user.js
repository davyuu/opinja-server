const mongoose = require('mongoose')
const models = require('./models')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  name: String,
  provider: String,
  providerId: String,
  providerPic: String,
  token: String
})

const User = mongoose.model(models.user, userSchema)

module.exports = User
