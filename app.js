const CryptoPayment = require('./cryptoPayment');
const Invoice = require('./invoice.js');


async function connect(token, test = false) {
	return CryptoPayment.connect(token, test);

}

async function getBalance() {
	const instance = Invoice.cryptoPaymentInstance;
	return instance.getBalance();
}

async function getExchangeRates() {
	const instance = Invoice.cryptoPaymentInstance;
	return instance.getExchangeRates();
}

async function getCurrencies() {
	const instance = Invoice.cryptoPaymentInstance;
	return instance.getCurrencies();
}

async function getPayments({
														 offset,
														 count
													 } = {}) {
	const instance = Invoice.cryptoPaymentInstance;
	return instance.getPayments({
		offset,
		count
	});
}

module.exports = {
	connect,
	getBalance,
	getExchangeRates,
	getCurrencies,
	getPayments
};
