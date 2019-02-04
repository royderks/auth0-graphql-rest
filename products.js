const { RESTDataSource } = require("apollo-datasource-rest");
// const fetch = require("node-fetch");

class ProductsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://demo9458524.mockable.io';
  }

  async getProducts() {
    return await this.get(`products`);
    //return await fetch(`${this.baseURL}/products`).then(res => res.json());
  }

  async getProduct(id) {
    return await this.get(`products/${id}`);
  }

  async getProductReviews(productId) {
    return await this.get(`products/${productId}/reviews`);
  }

  async getProductOffers(productId) {
    return await this.get(`products/${productId}/offers`);
  }

  async addProductOffer(productId, reseller, price) {
    return await this.post(
      `products/${productId}/offers`,
      {
        productId,
        reseller,
        price
      }
    )
  }
}

module.exports = ProductsAPI;
