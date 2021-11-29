const axios = require('axios')
const CryptoPayError = require('./error')

class Client {
  constructor(url, token) {
    this.baseUrl = `${url}/app${token}`
    this.client = axios.default.create({
      baseURL: this.baseUrl,
      url: this.baseUrl,
      validateStatus: false
    })
  }

  async request(method, path, data) {
    // delete undefined fields
    if (data)
      Object.keys(data).forEach(key => data[key] === undefined ? delete data[key] : {});

    const res = await this.client.request({
      method,
      url: path,
      data
    })


    if (!res.data.ok) {
      throw new CryptoPayError({
        error_code: res.data.error.code,
        name: res.data.error.name
      })
    }

    return res.data.result
  }

  async post(path, data) {
    const res = await this.request('POST', path, data)

    return res
  }

  async get(path) {
    const res = await this.request('GET', path)

    return res
  }

}

module.exports = Client
