const CryptoPayment = require('./cryptoPayment')

class Invoice {
  static cryptoPaymentInstance;
  constructor({
    asset,
    amount,
    description,
    paid_btn_name,
    paid_btn_url,
    payload
  }
  ) {
    if (typeof created_at == 'string') {
      created_at = new Date(created_at)
    }

    this.asset = asset;
    this.amount = amount;
    this.description = description;
    this.paid_btn_name = paid_btn_name
    this.paid_btn_url = paid_btn_url
    this.payload = payload

    this.is_created = false

  }

  get is_active() {
    return this.status == 'active'
  }

  getCPInstance() {
    return CryptoPayment.instance
  }

  async confirmPayment() {
    const instance = CryptoPayment.instance

    return instance.confirmPayment(this.invoice_id)
  }

  static async create({
    asset,
    amount,
    description,
    paid_btn_name,
    paid_btn_url,
    payload
  }) {
    const instance = CryptoPayment.instance

    return instance.createInvoice({
      asset,
      amount,
      description,
      paid_btn_name,
      paid_btn_url,
      payload
    })
  }

  static async find({
    asset,
    invoice_ids = [],
    status = 'all',
    offset,
    count,
  } = {}) {
    const instance = this.cryptoPaymentInstance

    return instance.getInvoices({
      asset,
      invoice_ids,
      status,
      offset,
      count,
    })
  }
  static async findOne({
    asset,
    invoice_ids = [],
    status = 'all',
    offset,
    count,
  } = {}) {
    const instance = CryptoPayment.instance

    const invoices = await instance.getInvoices({
      asset,
      invoice_ids,
      status,
      offset,
      count,
    })

    return invoices[0]
  }


  static fromJson(body) {
    let invoice = new Invoice({
      invoice_id: body.invoice_id,
      status: body.status,
      hash: body.hash,
      asset: body.asset,
      amount: body.amount,
      pay_url: body.pay_url,
      description: body.description,
      created_at: new Date(body.created_at),
      is_confirmed: body.is_confirmed
    })

    invoice.is_created = true

    invoice = Object.seal(invoice)

    return invoice
  }
}

module.exports = Invoice
