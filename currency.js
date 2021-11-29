class Currency {
  constructor({
    is_blockchain,
    is_stablecoin,
    name,
    code,
    decimals
  }
  ) {

    this.is_blockchain = is_blockchain
    this.is_stablecoin = is_stablecoin
    this.name = name
    this.code = code
    this.decimals = decimals
  }


  static fromJson(body) {
    let currency = new Currency({
      is_blockchain: body.is_blockchain,
      is_stablecoin: body.is_stablecoin,
      name: body.name,
      code: body.code,
      decimals: body.decimals
    })
    Object.seal(currency)

    return currency
  }
}

module.exports = Currency
