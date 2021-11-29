class Invoice {
	static cryptoPaymentInstance;

	constructor({
								asset,
								amount,
								description,
								paid_btn_name,
								paid_btn_url,
								payload
							} = {}
	) {

		this.asset = asset;
		this.amount = amount;
		this.description = description;
		this.paid_btn_name = paid_btn_name;
		this.paid_btn_url = paid_btn_url;
		this.payload = payload;

		this.invoice_id = 0;
		this.status = '';
		this.hash = '';
		this.pay_url = '';
		this.created_at = '';
		this.allow_comments = true;
		this.allow_anonymous = true;
		this.is_confirmed = false;


	}

	get is_active() {
		return this.status == 'active';
	}

	static async create({
												asset,
												amount,
												description,
												paid_btn_name,
												paid_btn_url,
												payload
											}) {

		const res = await this.cryptoPaymentInstance.createInvoice({
			asset,
			amount,
			description,
			paid_btn_name,
			paid_btn_url,
			payload
		});

		return Invoice.fromJson(res);
	}

	static async find({
											asset,
											invoice_ids = [],
											status = 'all',
											offset,
											count,
										} = {}) {

		return this.cryptoPaymentInstance.getInvoices({
			asset,
			invoice_ids,
			status,
			offset,
			count,
		});
	}

	static async findOne({
												 asset,
												 invoice_ids = [],
												 status = 'all',
												 offset,
												 count,
											 } = {}) {

		const invoices = await this.cryptoPaymentInstance.getInvoices({
			asset,
			invoice_ids,
			status,
			offset,
			count,
		});

		return invoices[0];
	}

	static async findById(invoice_id) {

		const invoices = await this.cryptoPaymentInstance.getInvoices({
			invoice_ids: [invoice_id],
		});

		return invoices[0];
	}

	static fromJson(body) {
		let invoice = new Invoice();
		Object.assign(invoice, body);

		invoice = Object.seal(invoice);

		return invoice;
	}

	async confirmPayment() {
		const res = await Invoice.cryptoPaymentInstance.confirmPayment(this.invoice_id);
		return Invoice.fromJson(res);
	}
}

module.exports = Invoice;
