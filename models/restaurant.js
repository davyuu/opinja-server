const mongoose = require('mongoose')
const models = require('./models')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  neighbourhood: String,
  type: String,
  cuisine: String
})

const Restaurant = mongoose.model(models.restaurant, restaurantSchema)

module.exports = Restaurant
