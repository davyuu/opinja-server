const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const express_graphql = require('express-graphql')
const {makeExecutableSchema} = require('graphql-tools')
const {restaurantsData, itemsData, recommendationsData} = require('./data/data')

const PORT = process.env.PORT || 4000

const typeDefs = `
  type Query {
    restaurant(id: Int!): Restaurant
    restaurants: [Restaurant]
  }
  type Mutation {
    updateRecommend(restaurantId: Int!, itemId: Int!, recommend: Int!): Item
  }
  type Restaurant {
    id: Int!
    name: String
    items: [Item]
  }
  type Item {
    id: Int!
    name: String
    recommendation: Float
  }
`

const resolvers = {
  Query: {
    restaurant: (_, {id}) => restaurantsData.find(r => r.id == id),
    restaurants: () => restaurantsData
  },
  Restaurant: {
    items: (restaurant) => itemsData.filter(i => i.restaurantId == restaurant.id)
  },
  Item: {
    recommendation: (item) => {
      let length = 0;
      const sum = recommendationsData.reduce((total, r) => {
        if (r.itemId === item.id) {
          total += r.recommendation
          length++
        }
        return total
      }, 0)
      return sum / length
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
