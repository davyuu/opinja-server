const {Restaurant, Category, Item, Rating, User} = require('../../models')

const pointsMultiplier = 10

const options = {
  new: true,
  upsert: true
}

const resolvers = {
  Query: {
    restaurant: (_, {id}) => Restaurant.findOne({_id: id}),
    restaurants: () => Restaurant.find({}),
    categories: () => Category.find({}),
    items: () => Item.find({}),
    ratings: () => Rating.find({}),
    user: (_, {id}) => User.findOne({_id: id}),
    users: () => User.find({})
  },
  Restaurant: {
    items: (restaurant) => Item.find({restaurantId: restaurant.id}),
    numRatings: (restaurant) => Rating.count({restaurantId: restaurant.id})
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
    user: (rating) => User.findOne({_id: rating.userId}),
    restaurant: (rating) => Restaurant.findOne({_id: rating.restaurantId}),
    item: (rating) => Item.findOne({_id: rating.itemId})
  },
  User: {
    points: (user) => {
      return new Promise((resolve, reject) => {
        Rating.count({userId: user.id}, (err, count) => {
          resolve(count * pointsMultiplier)
        })
      })
    }
  },
  Mutation: {
    addRating: (_, {id, userId, restaurantId, itemId, value}) => {
      console.log('\naddRating\n')
      if(value < 0 || value > 5) {
        throw new Error(`Invalid value of ${value}`)
      }
      return new Promise((resolve, reject) => {
        if(id) {
          Rating.findByIdAndUpdate({_id: id}, {userId, restaurantId, itemId, value}, options, (err, rating) => {
            console.log('findByIdAndUpdate', rating)
            if(err) reject(err)
            resolve(rating)
          })
        } else {
          Rating.create({userId, restaurantId, itemId, value}, (err, rating) => {
            console.log('create', rating)
            if(err) reject(err)
            resolve(rating)
          })
        }
      })
    },
    loginUser: (_, {email, name, photoURL, providerId, token}) => {
      console.log('\nloginUser\n')
      return new Promise((resolve, reject) => {
        User.findOne({email}, (err, user) => {
          console.log('findOne', user)
          if(err) reject(err)
          if(user) resolve(user)
          else {
            User.create({email, name, photoURL, providerId, token}, (err, user) => {
              console.log('create', user)
              if(err) reject(err)
              resolve(user)
            })
          }
        })
      })
    },
    setInstagramHandle: (_, {id, instagramHandle}) => {
      console.log('\setInstagramHandle\n')
      return new Promise((resolve, reject) => {
        User.findByIdAndUpdate({_id: id}, {instagramHandle}, options, (err, user) => {
          console.log('findByIdAndUpdate', user)
          if(err) reject(err)
          resolve(user)
        })
      })
    },
    setTwitterHandle: (_, {id, twitterHandle}) => {
      console.log('\setTwitterHandle\n')
      return new Promise((resolve, reject) => {
        User.findByIdAndUpdate({_id: id}, {twitterHandle}, options, (err, user) => {
          console.log('findByIdAndUpdate', user)
          if(err) reject(err)
          resolve(user)
        })
      })
    }
  }
}

module.exports = resolvers
