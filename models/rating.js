const mongoose = require('mongoose')
const models = require('./models')
const Schema = mongoose.Schema

const ratingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: models.user
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: models.restaurant
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: models.item
  },
  value: {
    type: Number,
    required: [true, 'Value field is required']
  }
})

const Rating = mongoose.model(models.rating, ratingSchema)

module.exports = Rating
