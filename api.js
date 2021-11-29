const Client = require('./network')
const Invoice = require('./invoice')
class APIClient {
  static instance;

  constructor(url, token) {
    this.client = new Client(url, token)
    APIClient.instance = this
  }


  createInvoice(body) {
    const {
      asset,
      amount,
      description,
      paid_btn_name,
      paid_btn_url,
      payload
    } = body

    return this.client.post('/createInvoice', {
      asset,
      amount,
      description,
      paid_btn_name,
      paid_btn_url,
      payload
    })

  }

  async getInvoices({
    asset,
    invoice_ids,
    status,
    offset,
    count,
  }) {
    const res = await this.client.post('/getInvoices', {
      asset,
      invoice_ids,
      status,
      offset,
      count,
    })
    return res
  }


  getPayments({
    offset,
    count
  } = {}) {
    return this.client.post('/getPayments', {
      offset,
      count
    })
  }

  confirmPayment(invoice_id) {
    return this.client.post('/confirmPayment', {
      invoice_id
    })
  }

  getMe() {
    return this.client.post('/getMe')
  }

  getCurrencies() {
    return this.client.post('/getCurrencies')
  }

  getBalance() {
    return this.client.post('/getBalance')
  }

  getExchangeRates() {
    return this.client.post('/getExchangeRates')
  }
}

module.exports = APIClient
