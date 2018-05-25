const mongoose = require('mongoose')
const models = require('./models')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  }
  // add in geo location
})

const Restaurant = mongoose.model(models.restaurant, restaurantSchema)

module.exports = Restaurant
