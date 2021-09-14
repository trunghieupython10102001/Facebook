const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
	author: { 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	state: { 
		type: String, 
		enum: ['public', 'private', 'friend'], 
		default: 'public'
	},
	content: { type: String, },
	image: { type: Array },
	video: { type: Array },
	comments: { type: Array, default: [] },
	share: { type: Array }, 
	emotions: { type: Array, default: [] }
}, {
	timestamps: true,
})

module.exports = mongoose.model('Post', Post)