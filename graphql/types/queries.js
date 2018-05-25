const queries = `
  type Query {
    restaurant(id: Int!): Restaurant
    restaurants: [Restaurant]
    items: [Item]
    ratings: [Rating]
    users: [User]
  }
`

module.exports = queries
