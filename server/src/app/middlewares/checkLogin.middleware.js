const jwt = require('jsonwebtoken')

function checkLogin(req, res, next) {
	const authHeader = req.header('authorization')
	const accessToken = authHeader && authHeader.split(' ')[1] 

	if (!accessToken) {
		res.status(401).json({
			success: false,
			message: "You must to login"
		})
	} else {
		try {
			const decoded = jwt.verify(accessToken, process.env.SECRET_SIGNATURE)
			req.userId = decoded
			next()
		} catch (error) {
			console.log(error)	
			res.status(403).json({
				success: false,
			})
		}
	}
}

module.exports = checkLogin