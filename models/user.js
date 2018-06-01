const mongoose = require('mongoose')
const models = require('./models')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  name: String,
  photoURL: String,
  providerId: String,
  token: String,
  instagramHandle: String,
  twitterHandle: String
})

const User = mongoose.model(models.user, userSchema)

module.exports = User
