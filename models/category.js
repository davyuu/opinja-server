const mongoose = require('mongoose')
const models = require('./models')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  key: String,
  name: String,
  order: Number
})

const Category = mongoose.model(models.category, categorySchema)

module.exports = Category
