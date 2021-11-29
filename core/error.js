class CryptoPayError extends Error {
	constructor({error_code, name}) {
		super(`${error_code}: ${name}`);
	}
}

module.exports = CryptoPayError;
