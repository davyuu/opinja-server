const types = `
  type Query {
    restaurant(id: String!): Restaurant
    restaurants: [Restaurant]
    categories: [Category]
    items: [Item]
    ratings: [Rating]
    users: [User]
  }
  type Restaurant {
    id: String!
    name: String
    location: String
    items: [Item]
  }
  type Category {
    id: String!
    name: String
  }
  type Item {
    id: String!
    name: String
    category: Category
    description: String
    price: Float
    overallRating: Float
  }
  type Rating {
    id: String!
    item: Item
    user: User
    value: Float
  }
  type User {
    id: String
    email: String
    name: String
    provider: String
    providerId: String
    providerPic: String
    token: String
  }
  type Mutation {
    addRating(id: String, itemId: String!, userId: String, value: Float!): Rating
    loginUser(email: String, name: String, provider: String, providerId: String, providerPic: String, token: String): User
  }
`

/*
`
  ${queries}
  ${restaurant}
  ${item}
  ${rating}
  ${user}
  ${mutations}
`
*/

module.exports = types
