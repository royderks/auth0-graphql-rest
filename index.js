const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const fetch = require("node-fetch");

const typeDefs = require("./typeDefs.js");

const baseURL = `http://demo9458524.mockable.io/`;

const resolvers = {
  Query: {
    products: (_, args) => {
      return fetch(`${baseURL}products`).then(res => res.json());
    },
    product: (parent, args) => {
      const { id } = args;
      return fetch(`${baseURL}products/${id}`).then(res => res.json());
    }
  },
  Mutation: {
    addOffer: (parent, args) => {
      const { productId, reseller, price } = args;
      return fetch(`${baseURL}products/${id}/offers`).then(res => res.json());
    }
  },
  Product: {
    reviews: (parent) => {
      const { id } = parent;
      return fetch(`${baseURL}products/${id}/reviews`).then(res => res.json());
    },
    offers: (parent) => {
      const { id } = parent;
      return fetch(`${baseURL}products/${id}/offers`).then(res => res.json());
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>{
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
});
