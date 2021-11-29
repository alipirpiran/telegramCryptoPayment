const app = require('./app')

const CryptoPayment = require('./cryptoPayment')
const Invoice = require('./invoice')
const Currency = require('./currency')

const token = '3170:AABVGxxCSb7IvxO3eHN5BY41rPCDejmLlys'
const appName = 'app'



async function main() {
  const cp = new CryptoPayment(token, true)
  const res = await cp.getCurrencies()
  console.log(res)
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
}

main()

module.exports = {
  app,
  CryptoPayment,
  Invoice,
  Currency
};
