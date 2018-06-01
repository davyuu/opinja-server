const mongoose = require('mongoose')
const models = require('./models')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  order: Number
})

const Category = mongoose.model(models.category, categorySchema)

module.exports = Category
