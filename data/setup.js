const csv = require('csvtojson')
const {Restaurant, Category, Item, Rating, User} = require('../models')

const pathToRestaurantsCSV = './CSV/sum_restaurants.csv'
const pathToItemsCSV = './CSV/sum_items.csv'

const items = []

function createRestaurants() {
  return new Promise((resolve, reject) => {
    csv().fromFile(`${__dirname}/${pathToRestaurantsCSV}`).then(restaurantsCSV => {
      const restaurantsData = []
      const restaurantKeys = {}
      restaurantsCSV.forEach((restaurantCSV, i) => {
        const {name, address, phone, neighbourhood, cuisine, price_cuisine} = restaurantCSV
        const type = price_cuisine.replace(cuisine, '')
        const restaurantData = {
          name, address, phone, neighbourhood, type, cuisine
        }
        restaurantsData.push(restaurantData)
      })
      Restaurant.create(restaurantsData).then(restaurants => {
        console.log(restaurants)
        restaurants.forEach(restaurant => {
          restaurantKeys[restaurant.name] = restaurant.id
        })
        resolve(restaurantKeys)
      })
    })
  })
}

function createItems(restaurantKeys) {
  return new Promise((resolve, reject) => {
    csv().fromFile(`${__dirname}/${pathToItemsCSV}`).then(itemsCSV => {
      const itemsData = []
      itemsCSV.forEach(itemCSV => {
        const {restaurant_name, lunch_price, lunch_menu, dinner_price, dinner_menu} = itemCSV
        const restaurantId = restaurantKeys[restaurant_name]

        const mealMenus = [{
          price: lunch_price,
          menu: lunch_menu
        }, {
          price: dinner_price,
          menu: dinner_menu
        }]

        // console.log('\nrestaurant_name:', restaurant_name)
        mealMenus.forEach(mealMenu => {
          const menuPrice = mealMenu.price
          const menu = mealMenu.menu
          if(menuPrice != 'null' && menu != 'null') {
            // console.log('restaurantId:', restaurantId)

            const priceType = getPriceFromMenuPrice(menuPrice)
            const price = priceType.price
            const type = priceType.type
            // console.log('price:', price)

            const categories = getCategoriesFromMenu(menu)
            categories.forEach((categoryString, i) => {
              const itemsString = getItemsFromCategory(categoryString)
              const category = `${type}_${categoriesKeys[i]}`
              // console.log('\ncategory:', category)

              itemsString.forEach(itemString => {
                const item = getItemNameFromItem(itemString)
                const name = item.name
                const description = item.description
                // console.log('')
                // console.log('name:', name)
                // console.log('description:', description)

                const itemData = {
                  restaurantId, name, category, description, price
                }
                itemsData.push(itemData)
              })
            })
          }
        })
      })
      Item.create(itemsData).then(items => {
        console.log(items)
        resolve(true)
      })
    })
  })
}

const categoriesKeys = {
  0: 'appetizers',
  1: 'mains',
  2: 'desserts'
}
const categoriesDelimiters = [
  'gratuityappetizer',
  '//main//',
  '//desserts//'
]
const categoryDelimiter = '//category//'
const orDelimiters = ['//or//', '////']
const seperator = '**seperator**'

function getPriceFromMenuPrice(menuPrice) {
  const menuPriceSplit = menuPrice.replace('$', '').split(' ')
  return {
    price: menuPriceSplit[0],
    type: menuPriceSplit[1].toLowerCase()
  }
}

const outliers = []

function getCategoriesFromMenu(menu) {
  const categories = JSON.stringify(menu)
    .replace(/\"/g, "")
    .replace(/\\r/g, "")
    .replace('/', "")
    .replace(/\\n/g, "//")
    .split(new RegExp(categoriesDelimiters.join('|'), 'g'))
  categories.shift()
  if(categories.length != 3) {
    outliers.push({
      length: categories.length,
      categories: categories
    })
  }
  return categories
}

function getItemsFromCategory(category) {
  const items = category
    .split(new RegExp(orDelimiters.join('|'), 'g'))
  return items
}

function getItemNameFromItem(item) {
  const itemSplit = item.split('//')
  const name = itemSplit[0]
  const description = itemSplit[1]
  return {
    name, description
  }
}

function createWithCSV() {
  createRestaurants()
  .then(createItems)
  .then(res => {
    outliers.forEach(outlier => {
      console.log('\n\nlength:', outlier.length)
      console.log('categories:', outlier.categories)
    })

    if(outliers.length == 0) {
      console.log('success')
    }
  })
}

function initialize() {
  console.log('creating database')

  createWithCSV()

  return true
}

module.exports = initialize
