const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
const path = require('path')
const db = require('./config/db')
const morgan = require('morgan')
const route = require('./routes')

// use process env variables
require('dotenv').config()

// use static file 
app.use(express.static(path.join(__dirname, 'public')))

// Connect database
db.connect()

// Morgan request logger
app.use(morgan('combined'))

// use cross origin
app.use(cors())

app.use(express.json())
app.use(express.urlencoded())

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
})

route(app)