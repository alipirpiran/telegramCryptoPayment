# telegramCryptoPayment

## Install

```
npm i tgcryptopayment
```

## How to use
#### app.connect(token, is_test)
```javascript
const {Invoice, app} = require('tgcryptopayment');

const token = '10:AABVGyyCSb7Ivx01eHaaBY41ufCDeggLlgs'

app.connect(token, true).then(() => {
	console.log("Connected!")
})
```

# API

## Invoice

### create({asset, amount, description, paid_btn_name, paid_btn_url, payload})

```javascript
const {Invoice} = require('tgcryptopayment');

Invoice.create({asset: 'TON', amount: '.2'});
/*
return:
  Promise<Invoice>
 */
```

### find({asset, invoice_ids, status, offset, count})

```javascript
const {Invoice} = require('tgcryptopayment');

Invoice.find({asset: 'TON', count: 10, status: 'all'})
/*
return:
  Promise<[Invoice]>
 */
```
### findOne({asset, invoice_ids, status, offset, count})

```javascript
const {Invoice} = require('tgcryptopayment');

Invoice.findOne({asset: 'TON'})
/*
return:
  Promise<Invoice>
 */
```

### findById(invoice_id)
```javascript
const {Invoice} = require('tgcryptopayment');

Invoice.findById(123)
/*
return:
  Promise<Invoice>
*/
```

### confirmPayment()
```javascript
const {Invoice} = require('tgcryptopayment');

...
const invoice = await Invoice.findById(123)
await invoice.confirmPayment()
/*
return:
  Promise<Invoice>
*/
```

## app

- getBalance()
- getBalance()
- getCurrencies()
- getExchangeRates()
- getPayments({ offset, count })

```javascript
const {app} = require('tgcryptopayment')

app.getBalance()
/*
return:
  Promise<Balance>
*/

app.getCurrencies()
/*
return:
  Promise<[Currency]>
*/

app.getExchangeRates()
/*
return:
  Promise<[ExchangeRate]>
*/

app.getPayments({ offset, count })
/*
return:
  Promise<Payment>
*/
```
