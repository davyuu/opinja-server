const _ = require('lodash');
const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');
const data = require('./data/data');

const RestaurantType = new GraphQLObjectType({
  name: "Restaurant",
  description: "This represent an restaurant",
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    items: {
      type: new GraphQLList(ItemType),
      resolve: (restaurant) {
        return restaurant.item
      }
    }
  })
});

const ItemType = new GraphQLObjectType({
  name: "Post",
  description: "This represent a Post",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    body: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve: function(post) {
        return _.find(Authors, a => a.id == post.author_id);
      }
    }
  })
});

// This is the Root Query
const BlogQueryRootType = new GraphQLObjectType({
  name: 'BlogAppSchema',
  description: "Blog Application Schema Query Root",
  fields: () => ({
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of all Authors",
      resolve: function() {
        return Authors
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      description: "List of all Posts",
      resolve: function() {
        return Posts
      }
    }
  })
});

// This is the schema declaration
const BlogAppSchema = new GraphQLSchema({
  query: BlogQueryRootType
  // If you need to create or updata a datasource,
  // you use mutations. Note:
  // mutations will not be explored in this post.
  // mutation: BlogMutationRootType
});

module.exports = BlogAppSchema;
