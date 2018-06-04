const types = `
  type Query {
    restaurant(id: String!): Restaurant
    restaurants: [Restaurant]
    categories: [Category]
    items: [Item]
    ratings: [Rating]
    user(id: String!): User
    users: [User]
  }
  type Restaurant {
    id: String!
    name: String
    location: String
    items: [Item]
    numRatings: Int
  }
  type Category {
    id: String!
    name: String
    order: Int
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
    user: User
    restaurant: Restaurant
    item: Item
    value: Float
  }
  type User {
    id: String
    email: String
    name: String
    photoURL: String
    providerId: String
    token: String
    instagramHandle: String
    twitterHandle: String
    points: Int
  }
  type Mutation {
    addRating(id: String, userId: String, restaurantId: String!, itemId: String!, value: Float!): Rating
    loginUser(email: String, name: String, photoURL: String, providerId: String, token: String): User
    setInstagramHandle(id: String!, instagramHandle: String!): User
    setTwitterHandle(id: String!, twitterHandle: String!): User
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
