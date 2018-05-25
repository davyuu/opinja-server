const mongoose = require('mongoose')
const models = require('./models')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: models.restaurant
  },
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  description: String,
  price: Number
})

const Item = mongoose.model(models.item, itemSchema)

module.exports = Item
