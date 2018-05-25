const mongoose = require('mongoose')
const models = require('./models')
const Schema = mongoose.Schema

const ratingSchema = new Schema({
  itemId: {
    type: Schema.Types.ObjectId,
    ref: models.item
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: models.user
  },
  rating: {
    type: Number,
    required: [true, 'Rating field is required']
  }
})

const Rating = mongoose.model(models.rating, ratingSchema)

module.exports = Rating
