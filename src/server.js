const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let customers = [];

//all customers
app.get('/customer', (req, res) => {
	res.json(customers);
});

//create new customers
app.put('/customer', (req, res) => {
	const fullName = req.body.fullName;
	const email = req.body.email;
	const birthDate = req.body.birthDate;
	const notes = req.body.notes;
	if (!fullName.match(/^[a-zA-Z ]*$/) || fullName.split(' ').length < 2 || !email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
		return res.status(400).send();
	}
	customers.push({
		id: customers.length + 1,
		fullName: fullName,
		email: email,
		birthDate: birthDate,
		notes: notes,
		created: new Date().toDateString()
	});
	res.status(201).json(customers);
});

//delete spesific customer
app.delete('/customer/:id', (req, res) => {
	const requestedCustomer = customers.find(customer => {
		return customer.id === parseInt(req.params.id);
	});

	if (!requestedCustomer) {
		res.sendStatus(404);
		return;
	}

	const index = customers.indexOf(requestedCustomer);
	customers.splice(index, 1);
	res.json(requestedCustomer);
});

//edit specific customer
app.post('/customer/:id', (req, res) => {
	console.log('hey spesific customer');
	console.log(customers);
	const requestedCustomer = customers.find(customer => {
		return customer.id === parseInt(req.params.id);
	});

	if (!requestedCustomer) {
		res.sendStatus(404);
		return;
	}

	const index = customers.indexOf(requestedCustomer);
	customers[index] = {
		id: req.body.id,
		fullName: req.body.fullName,
		email: req.body.email,
		birthDate: req.body.birthDate,
		notes: req.body.notes,
		created: req.body.created
	};
	res.json(customers[index]);
});

app.listen(port, () => {
	console.log('App is listening on port ' + port);
});
