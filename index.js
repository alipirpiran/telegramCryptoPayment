const app = require('./app')

const CryptoPayment = require('./cryptoPayment')
const Invoice = require('./invoice')
const Currency = require('./currency')

const token = '3170:AABVGxxCSb7IvxO3eHN5BY41rPCDejmLlys'
const appName = 'app'



async function main() {
  const res = await app.connect(token, true)

  //console.log(CryptoPayment.instance)
  // const res = await cp.createInvoice({
  //   asset: 'TON',
  //   amount: '2',
  //   description: 'test desc',

  // })

  //const res = await cp.confirmPayment(123)
  //const res = await cp.getPayments()
  // const inc = new Invoice({
  //   asset: 'TON',
  //   amount: '2',
  // })
  // const res = await inc.create()
  //console.log(await app.getBalance())
  console.log(await Invoice.find())
}

//main()

module.exports = {
  app,
  CryptoPayment,
  Invoice,
  Currency
};
