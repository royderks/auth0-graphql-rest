const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const fetch = require("node-fetch");

const typeDefs = require("./typeDefs.js");
const ProductsAPI = require("./products.js");

const resolvers = {
  Query: {
    products: (_, args, context) => {
      const { dataSources } = context;
      return dataSources.productsAPI.getProducts();
    },
    product: (parent, args, context) => {
      const { dataSources } = context;
      const { id } = args;
      return dataSources.productsAPI.getProduct(id);
    }
  },
  Mutation: {
    addOffer: (parent, args, context) => {
      const { dataSources } = context;
      const { productId, reseller, price } = args;
      return dataSources.productsAPI.addProductOffer(productId, reseller, price);
    }
  },
  Product: {
    reviews: (parent, args, context) => {
      const { dataSources } = context;
      const { id } = parent;
      return dataSources.productsAPI.getProductReviews(id);
    },
    offers: (parent, args, context) => {
      const { dataSources } = context;
      const { id } = parent;
      return dataSources.productsAPI.getProductOffers(id);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    productsAPI: new ProductsAPI
  })
});

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>{
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
});
