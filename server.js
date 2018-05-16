const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const express_graphql = require('express-graphql')
const {makeExecutableSchema} = require('graphql-tools')
const {restaurantsData, itemsData, ratingsData} = require('./data/data')

const PORT = process.env.PORT || 4000

const typeDefs = `
  type Query {
    restaurant(id: Int!): Restaurant
    restaurants: [Restaurant]
    items: [Item]
    ratings: [Rating]
  }
  type Restaurant {
    id: Int!
    name: String
    items: [Item]
  }
  type Item {
    id: Int!
    name: String
    overallRating: Float
  }
  type Rating {
    id: Int!
    itemId: Int
    rating: Float
  }
  type Mutation {
    addRating(id: Int, itemId: Int!, rating: Float!): Rating
  }
`

const resolvers = {
  Query: {
    restaurant: (_, {id}) => restaurantsData.find(r => r.id == id),
    restaurants: () => restaurantsData,
    items: () => itemsData,
    ratings: () => ratingsData
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
          itemId: itemId,
          rating: rating
        }
        ratingsData.push(newRating)
      }
      return newRating
    }
  }
}

const schema = makeExecutableSchema({typeDefs, resolvers})

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/graphql', express_graphql({
  schema: schema,
  graphiql: true
}))

app.get('/', (req, res) => res.send('Hello World'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
