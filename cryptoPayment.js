const APIClient = require('./core/api');
const Invoice = require('./invoice.js');
const Currency = require('./currency.js');

const config = require('./config');


class CryptoPayment {

	constructor(token, test = false) {
		const url = test ? config.API_URL.testnet : config.API_URL.mainnet;

		this.apiClient = new APIClient(url, token);
	}

	static async connect(token, test) {
		const cp = new CryptoPayment(token, test);
		await cp.getMe();

		Invoice.cryptoPaymentInstance = cp;

		return cp;
	}


	getMe() {
		return this.apiClient.getMe();
	}

	async getCurrencies() {
		const res = await this.apiClient.getCurrencies();

		const currencies = res.map(val => {
			return Currency.fromJson(val);
		});

		return currencies;
	}

	createInvoice(body) {
		const {
			asset,
			amount,
			description,
			paid_btn_name,
			paid_btn_url,
			payload
		} = body;

		return this.apiClient.createInvoice({
			asset,
			amount,
			description,
			paid_btn_name,
			paid_btn_url,
			payload
		});

	}

	async getInvoices({
											asset,
											invoice_ids = [],
											status = 'all',
											offset,
											count,
										} = {}) {

		let _invoice_ids = invoice_ids.join(',');

		if (status == 'all') {
			status = undefined;
		}

		if (_invoice_ids.trim() == '')
			_invoice_ids = undefined;


		const res = await this.apiClient.getInvoices({
			asset,
			invoice_ids: _invoice_ids,
			status,
			offset,
			count,
		});

		const invoices = res.items.map(val => {
			return Invoice.fromJson(val);
		});

		return invoices;
	}


	getPayments({
								offset,
								count
							} = {}) {
		return this.apiClient.getPayments({
			offset,
			count
		});
	}

	async confirmPayment(invoice_id) {
		console.log(invoice_id);
		return this.apiClient.confirmPayment(invoice_id);
	}

	async getBalance() {
		return this.apiClient.getBalance();
	}

	async getExchangeRates() {
		return this.apiClient.getExchangeRates();
	}
}

module.exports = CryptoPayment;
