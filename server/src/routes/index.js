const authenRouter = require('./authentication')
const postRouter = require('./post')
const checkLogin = require('../app/middlewares/checkLogin.middleware')

function route(app) {
	app.use('/post', checkLogin, postRouter)
	app.use('/authen', authenRouter)
}

module.exports = route