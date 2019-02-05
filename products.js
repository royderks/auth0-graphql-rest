const { RESTDataSource } = require('apollo-datasource-rest')

class ProductsAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://demo9458524.mockable.io'
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.token)
  }

  async getProducts() {
    return await this.get(`products`)
  }

  async getProduct(id) {
    return await this.get(`products/${id}`)
  }

  async getProductReviews(productId) {
    return await this.get(`products/${productId}/reviews`)
  }

  async getProductOffers(productId) {
    return await this.get(`products/${productId}/offers`)
  }

  async addProductOffer(productId, reseller, price) {
    if (this.context.user) {
      return await this.post(`products/${productId}/offers`, {
        productId,
        reseller,
        price,
      })
    }
  }
}

module.exports = ProductsAPI
