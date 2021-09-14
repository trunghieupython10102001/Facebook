const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type:  String, unique: true, required: true },
	phonenumber: { type: String, default: '' },
	password: { type: String, required: true },
	birthday: { type: String, require: true },
	gender: { type: String, required: true },
	friends: { type: Array, default: [] },
	avatar: { type: String },
	coverImage: { type: String },
	followers: { type: Array, default: [] },
	followings: { type: Array, default: [] },
	slogan: { type: String, default: '' },
	isAdmin: { type: Boolean, default: false },
	library: { type: Array, default: [] },
	posts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'posts',
	}]
}, {
	timestamps: true,
})

module.exports = mongoose.model('User', User)