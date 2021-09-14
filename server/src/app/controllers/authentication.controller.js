const User = require('../models/User')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
require('dotenv').config()

// register
// [POST] authen/register
async function register(req, res, next) {
	req.body.password = md5(req.body.password)
	const {
		firstname, 
		lastname, 
		email,
		password,
		birthday = `${req.body.day}/${req.body.month}/${req.body.year}`,
		gender,
	} = req.body
	try {
		const user = await User.findOne({ email: email })

		if (user) { // if email already exists
			res.status(400).json({
				success: false,
				message: "Email này đã tồn tại. Vui lòng nhập email khác.",
				errorCode: "email"
			})
		} else {
			// Save user
			const user = new User({
				firstname,
				lastname, 
				email,
				password,
				birthday,
				gender,
			})
			await user.save()

			// Return access token
			const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_SIGNATURE, { expiresIn: '15m' })
			res.status(200).json({
				success: true,
				message: "User created sucessfully",
				accessToken
			})
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}

// [POST] authen/login
async function login(req, res, next) {
	try {
		console.log(md5(req.body.password))
		const user = await User.findOne({ email: req.body.email })

		if (user) {
			if (user.password === md5(req.body.password)) {
				const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_SIGNATURE, { expiresIn: 86400 })
				res.status(200).json({
					success: true,
					message: "User logined successfully",
					accessToken
				})
			} else {
				res.status(401).json({
					success: false,
					message: 'Sai email hoặc mật khẩu.'
				})
			}
		} else {
			res.status(401).json({
				success: false,
				message: 'Sai email hoặc mật khẩu.'
			})
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message
		})
	}
	
}

module.exports = { register, login }