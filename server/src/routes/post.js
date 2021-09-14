const PostController = require('../app/controllers/post.controller')
const router = require('express').Router()
const multer = require('multer')

const multerConfig = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'src/public/img')
	},
	filename: (req, file, callback) => {
		const ext = file.mimetype.split('/')[1]
		const oriName = file.originalname.split('.')[0]
		callback(null, `${oriName}-${Date.now()}.${ext}`)
	}
})

const isImage = (req, file, callback) => {
	if (file.mimetype.startsWith('image')) {
		callback(null, true)
	} else {
		callback(new Error('Only image accepted!'))
	}
}

const upload = multer({
	storage: multerConfig,
	fileFilter: isImage,
})

router.post('/create', upload.single('image'), PostController.createPost)
router.get('/all', PostController.getAllPost)
router.get('/:id', PostController.getPost)

module.exports = router
