const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
require('dotenv').config()

const typeDefs = require('./typeDefs.js')
const ProductsAPI = require('./products.js')

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  credentialsRequired: false,
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
})

const resolvers = {
  Query: {
    products: (_, args, context) => {
      const { dataSources } = context
      return dataSources.productsAPI.getProducts()
    },
    product: (parent, args, context) => {
      const { dataSources } = context
      const { id } = args
      return dataSources.productsAPI.getProduct(id)
    },
  },
  Mutation: {
    addOffer: (parent, args, context) => {
      const { dataSources } = context
      const { productId, reseller, price } = args
      return dataSources.productsAPI.addProductOffer(productId, reseller, price)
    },
  },
  Product: {
    reviews: (parent, args, context) => {
      const { dataSources } = context
      const { id } = parent
      return dataSources.productsAPI.getProductReviews(id)
    },
    offers: (parent, args, context) => {
      const { dataSources } = context
      const { id } = parent
      return dataSources.productsAPI.getProductOffers(id)
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    productsAPI: new ProductsAPI(),
  }),
  context: ({ req }) => ({
    user: req.user,
    token: req.headers.authorization,
  }),
})

const app = express()
app.use(jwtCheck)
server.applyMiddleware({ app })

const port = 4000

app.listen({ port }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
})
