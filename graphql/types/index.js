const queries = require('./queries')
const restaurant = require('./restaurant')
const item = require('./item')
const rating = require('./rating')
const user = require('./user')
const mutations = require('./mutations')

const types = `
  ${queries}
  ${restaurant}
  ${item}
  ${rating}
  ${user}
  ${mutations}
`

module.exports = types


/*
`
  type Query {
    restaurant(id: Int!): Restaurant
    restaurants: [Restaurant]
    items: [Item]
    ratings: [Rating]
    users: [User]
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
  type User {
    email: String
    name: String
    provider: String
    providerId: String
    providerPic: String
    token: String
  }
  type Mutation {
    addRating(id: Int, itemId: Int!, rating: Float!): Rating
    loginUser(email: String, name: String, provider: String, providerId: String, providerPic: String, token: String): User
  }
`
*/
