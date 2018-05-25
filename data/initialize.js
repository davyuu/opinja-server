const {restaurantsData, itemsData, ratingsData, usersData} = require('./')
const {Restaurant, Item, Rating, User} = require('../models')

const onCreate = (res, err) => {
  if(err) {
    console.log('err', err)
    return null
  } else {
    console.log('res', res)
    return res
  }
}

function createRestaurant() {
  console.log('\ncreating restaurants\n')
  console.log('restaurantsData', restaurantsData)
  return Restaurant.create(restaurantsData)
}

function createItemsAndUsers(restaurants) {
  console.log('restaurants', restaurants)

  console.log('\ncreating items and users\n')
  itemsData.forEach((item) => {
    item.restaurantId = restaurants[item.restaurantId - 1]
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
    rating.userId = users[rating.userId - 1]
    rating.itemId = items[rating.itemId - 1]
  })
  console.log('ratingsData', ratingsData)
  return Rating.create(ratingsData)
}

function initialize() {
  console.log('initializing database')

  createRestaurant()
  .then(createItemsAndUsers)
  .then(createRatings)
  .then(ratings => {
    console.log('ratings', ratings)
    console.log('\nsuccess\n')
  })

  return true
}

module.exports = initialize
