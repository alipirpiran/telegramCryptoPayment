
class CryptoPayError extends Error {
  constructor({ error_code, description, name }) {
    super(`${error_code}: ${name}`)

  }

}

module.exports = CryptoPayError
