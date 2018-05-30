const csv = require('csvtojson')
const {restaurantsData, categoriesData, itemsData, ratingsData, usersData} = require('./')
const {Restaurant, Category, Item, Rating, User} = require('../models')

const pathToRestaurantsCSV = './restaurants.csv'

function createRestaurant() {
  console.log('\ncreating restaurants and categories\n')
  console.log('restaurantsData', restaurantsData)
  console.log('categoriesData', categoriesData)
  return Promise.all([Restaurant.create(restaurantsData), Category.create(categoriesData)])
}

function createItemsAndUsers(res) {
  const restaurants = res[0]
  const categories = res[1]
  console.log('restaurants', restaurants)
  console.log('categories', categories)

  console.log('\ncreating items and users\n')
  itemsData.forEach((item) => {
    item.restaurantId = restaurants[item.restaurantId - 1]
    item.categoryId = categories[item.categoryId - 1]
  })
  console.log('itemsData', itemsData)
  console.log('usersData', usersData)
  return Promise.all([Item.create(itemsData), User.create(usersData)])
}

function createRatings(res) {
  const items = res[0]
  const users = res[1]
  console.log('items', items)
  console.log('users', users)

  console.log('\ncreating ratings\n')
  ratingsData.forEach((rating) => {
    console.log('rating', rating)
    rating.userId = users[rating.userId - 1]
    rating.itemId = items[rating.itemId - 1]
  })
  console.log('ratingsData', ratingsData)
  return Rating.create(ratingsData)
}

function createWithJS() {
  createRestaurant()
  .then(createItemsAndUsers)
  .then(createRatings)
  .then(ratings => {
    console.log('ratings', ratings)
    console.log('\nsuccess\n')
  })
}

function createWithCSV() {
  csv().fromFile(`${__dirname}/${pathToRestaurantsCSV}`).then(restaurants => {
    Restaurant.create(restaurants).then(restaurants => console.log('restaurants', restaurants))
  })
}

function initialize() {
  console.log('initializing database')

  createWithJS()
  // createWithCSV()

  return true
}

module.exports = initialize
