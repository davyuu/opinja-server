const {Restaurant, Category, Item, Rating, User} = require('../../models')

const resolvers = {
  Query: {
    restaurant: (_, {id}) => Restaurant.findOne({_id: id}),
    restaurants: () => Restaurant.find({}),
    categories: () => Category.find({}),
    items: () => Item.find({}),
    ratings: () => Rating.find({}),
    users: () => User.find({})
  },
  Restaurant: {
    items: (restaurant) => Item.find({restaurantId: restaurant.id})
  },
  Item: {
    category: (item) => Category.findOne({_id: item.categoryId}),
    overallRating: (item) => {
      return new Promise((resolve, reject) => {
        Rating.find({itemId: item.id}, (err, ratings) => {
          if(err) reject(err)
          const sum = ratings.reduce((total, rating) => {
            return total += rating.value
          }, 0)
          resolve(sum === 0 ? null : Math.round(sum / ratings.length * 100) / 100)
        })
      })
    }
  },
  Rating: {
    item: (rating) => Item.findOne({_id: rating.itemId}),
    user: (rating) => User.findOne({_id: rating.userId})
  },
  Mutation: {
    addRating: (_, {id, itemId, userId, value}) => {
      console.log('\naddRating\n')
      if(value < 0 || value > 5) {
        throw new Error(`Invalid value of ${value}`)
      }
      return new Promise((resolve, reject) => {
        if(id) {
          Rating.findByIdAndUpdate({_id: id}, {itemId, userId, value}, {upsert: true}, (err, rating) => {
            console.log('findByIdAndUpdate', rating)
            if(err) reject(err)
            resolve(rating)
          })
        } else {
          Rating.create({itemId, userId, value}, (err, rating) => {
            console.log('create', rating)
            if(err) reject(err)
            resolve(rating)
          })
        }
      })
    },
    loginUser: (_, {email, name, provider, providerId, providerPic, token}) => {
      console.log('\nloginUser\n')
      return new Promise((resolve, reject) => {
        User.findOne({email}, (err, user) => {
          console.log('findOne', user)
          if(err) reject(err)
          if(user) resolve(user)
          else {
            User.create({email, name, provider, providerId, providerPic, token}, (err, user) => {
              console.log('create', user)
              if(err) reject(err)
              resolve(user)
            })
          }
        })
      })
    }
  }
}

module.exports = resolvers
