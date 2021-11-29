const CryptoPayment = require('./cryptoPayment')

async function connect(token, test = false) {
  return CryptoPayment.connect(token, test)

}
async function getBalance() {
  const instance = CryptoPayment.instance
  return instance.getBalance()
}

async function getExchangeRates() {
  const instance = CryptoPayment.instance
  return instance.getExchangeRates()
}

async function getCurrencies() {
  const instance = CryptoPayment.instance
  return instance.getCurrencies()
}

module.exports = {
  connect,
  getBalance,
  getExchangeRates,
  getCurrencies
}
