const User = require('../models/User')
const Post = require('../models/Post')

// [POST] /post/create
// create post
async function createPost(req, res, next) {
	if (req.file) {
		req.file.path = req.file.path.split('/').slice(2).join('/')
		req.body.image = req.file
		console.log(req.body.image)
	}

	req.body.author = req.userId.id
	const newPost = new Post(req.body)

	try {
		const savedPost = await newPost.save()
		const user = await User.findOneAndUpdate(
			{ _id: savedPost.author},
			{ $push: { posts: savedPost._id}} 
			)
		const userPost = await User.findOne({ _id: user._id })
		console.log(userPost.posts)
		res.json(savedPost)
	} catch (error) {
		console.log(error)	
		res.status(500).json({
			success: false,
			message: "Bài đăng không thành công"
		})
	}
}

// [GET] /post/:id
// get one post
async function getPost(req, res, next) {
	try {
		const post = await Post.findOne({ _id: req.params.id })
		if (post) {
			res.json(post)
		} else {
			res.status(400).json({
				success: false,
				message: 'Post not found'
			})
		}
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: error.message
		})
	}	
}

// [GET] /post/all
// get all post
async function getAllPost(req, res, next) {
	try {
		const allPost = await Post.find({}).sort({createdAt: -1})
		if (allPost) {
			res.json(allPost)
		} else {
			res.status(400).json({
				success: false,
				message: 'Post not found'
			})
		}
	} catch (error) {
		console.log(error)	
		res.status(500).json({
			success: false,
			message: error.message
		})
	}
}

module.exports = {
	createPost,
	getPost,
	getAllPost,
}