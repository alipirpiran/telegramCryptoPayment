const Client = require('./network')
const Invoice = require('./invoice')
class APIClient {
  static instance;

  constructor(url, token) {

    this.client = new Client(url, token)

    APIClient.instance = this
  }

  getMe() {
    return this.client.post('/getMe')
  }
  getCurrencies() {
    return this.client.post('/getCurrencies')
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

module.exports = APIClient
