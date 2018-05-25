const {restaurantsData, itemsData, ratingsData, usersData} = require('../../data')

const resolvers = {
  Query: {
    restaurant: (_, {id}) => restaurantsData.find(r => r.id == id),
    restaurants: () => restaurantsData,
    items: () => itemsData,
    ratings: () => ratingsData,
    users: () => usersData
  },
  Restaurant: {
    items: (restaurant) => itemsData.filter(i => i.restaurantId == restaurant.id)
  },
  Item: {
    overallRating: (item) => {
      let length = 0;
      const sum = ratingsData.reduce((total, r) => {
        if (r.itemId === item.id) {
          total += r.rating
          length++
        }
        return total
      }, 0)
      return sum === 0 ? null : Math.round(sum / length * 100) / 100
    }
  },
  Mutation: {
    addRating: (_, {id, itemId, rating}) => {
      if(rating < 0 || rating > 5) {
        throw new Error(`Invalid rating of ${rating}`)
      }
      let newRating;
      ratingsData.forEach(r => {
        if(r.id === id) {
          r.rating = rating
          newRating = r;
        }
      })
      if(!newRating) {
        newRating = {
          id: ratingsData.length + 1,
          itemId,
          rating
        }
        ratingsData.push(newRating)
      }
      return newRating
    },
    loginUser: (_, {email, name, provider, providerId, providerPic, token}) => {
      let user;
      usersData.forEach(u => {
        if(u.email === email) {
          user = u
        }
      })
      if(!user) {
        user = {
          email,
          name,
          provider,
          providerId,
          providerPic,
          token
        }
        usersData.push(user)
      }
      return user
    }
  }
}

module.exports = resolvers
