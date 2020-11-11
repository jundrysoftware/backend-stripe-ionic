const stripe = require('stripe')('YOUR-KEY');
const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
const app = express();
app.use(express.static('.'));
// parse application/json
app.use(bodyParser.json())

app.use(cors())

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-charge', async function (req, res){
  
   const customer = await stripe.customers.create({
	  description: 'Cliente Nuevo por AppMovil',
	  name: req.body.name,
	  email: req.body.email
	}).then(function (customer) {
		const charge =  stripe.charges.create({
		    amount: req.body.amount,
		    currency: 'usd',
		    source: req.body.token,
		    description: 'Pago Carrito de compras APP MOVIL',
		    receipt_email: req.body.email,
		    customer: customer.id
		}).then(function (charge) {
			res.json({charge});
		})		
	});
});

app.listen(4242, () => console.log('Running on port 4242'));