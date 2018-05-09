const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    restaurant(id: Int!): Restaurant
    restaurants(topic: String): [Restaurant]
  },
  type Restaurant {
    id: Int
    name: String
    items: [String]
  }
`);

const restaurantData = [
    {
        id: 1,
        name: 'Restaurant1',
        items: [
          'item1',
          'item2',
          'item3',
        ],
    },
    {
        id: 2,
        name: 'Restaurant2',
        items: [
          'item1',
          'item2',
          'item3',
        ],
    },
    {
        id: 3,
        name: 'Restaurant3',
        items: [
          'item1',
          'item2',
          'item3',
        ],
    }
]

const getRestaurant = (args) => {
  const id = args.id;
  return restaurantData.filter(restaurant => {
    return restaurant.id == id;
  })[0];
}

const getRestaurants = (args) => {
  if (args.topic) {
    const topic = args.topic;
    return restaurantData.filter(restaurant => restaurant.topic === topic);
  } else {
    return restaurantData;
  }
}

const root = {
  restaurant: getRestaurant,
  restaurants: getRestaurants
};

const app = express();

app.use('/graphql', express_graphql({
	schema: schema,
  rootValue: root,
	graphiql: true
}));

app.listen(4000, () => console.log('Server running on port 4000'));
