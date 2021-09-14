const mongoose = require('mongoose')
require('dotenv').config()

async function connect() {
	try {
		await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-app.enjr0.mongodb.net/Facebook?retryWrites=true&w=majority`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		console.log('Connect database sucessfully')
	}
	catch(error) {
		console.log(error.message)
		console.log('Some error occured!!!')
	}
}

module.exports = { connect }