const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    thumbnail: String!
    reviews: Review
    offers: [Offer]
  }
  type Review {
    productId: Int!
    count: Int
    average: Float
  }
  type Offer {
    productId: Int!
    reseller: String
    price: Float
  }
  type Query {
    products: [Product]
    product(id: Int!): Product
  }
  type Mutation {
    addOffer(productId: Int!, reseller: String, price: Float): Offer
  }
`;

module.exports = typeDefs;
