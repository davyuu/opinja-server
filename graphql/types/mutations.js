const Mutations = `
  type Mutation {
    addRating(id: Int, itemId: Int!, rating: Float!): Rating
    loginUser(email: String, name: String, provider: String, providerId: String, providerPic: String, token: String): User
  }
`

module.exports = Mutations
