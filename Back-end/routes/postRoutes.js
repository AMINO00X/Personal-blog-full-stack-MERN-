const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getSinglePost, updatePost, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');



router.get('/', getAllPosts);

router.get('/:id', getSinglePost);

router.post('/', authMiddleware, createPost);

router.put('/:id', authMiddleware, updatePost);

router.delete('/:id', authMiddleware, deletePost);

module.exports = router;