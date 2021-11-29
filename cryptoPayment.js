
const Client = require('./network')
const APIClient = require('./api')
const config = require('./config')

const Invoice = require('./invoice')
const Currency = require('./currency')

class CryptoPayment {
  static instance;

  constructor(token, test = false) {
    const url = test ? config.API_URL.testnet : config.API_URL.mainnet

    this.client = new Client(url, token)
    this.token = token;
  }

  static async connect(token, test) {
    const cp = new CryptoPayment(token, test)
    this.instance = cp
    await this.instance.getMe()
    return this.instance
  }

  static get instance() {
    if (this.instance == null) throw new Error('CryptoPayment is not connected.')
    return this.instance
  }



  getMe() {
    return this.client.post('/getMe')
  }
  async getCurrencies() {
    const res = await this.client.post('/getCurrencies')

    const currencies = res.map(val => {
      return Currency.fromJson(val)
    })

    return currencies
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
    invoice_ids = [],
    status = 'all',
    offset,
    count,
  }) {

    let _invoice_ids = invoice_ids.join(',')

    if (status == 'all') {
      status = undefined
    }

    if (_invoice_ids.trim() == '')
      _invoice_ids = undefined


    const res = await this.client.post('/getInvoices', {
      asset,
      invoice_ids: _invoice_ids,
      status,
      offset,
      count,
    })

    const invoices = res.items.map(val => {
      return Invoice.fromJson(val)
    })

    return invoices
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
}

module.exports = CryptoPayment
