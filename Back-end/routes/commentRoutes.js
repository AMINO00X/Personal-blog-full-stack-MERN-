const express = require('express');
const router = express.Router();
const { createComment, getCommentsByPost, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/:postId', authMiddleware, createComment);

router.get('/:postId', getCommentsByPost);

router.delete('/delete/:id', authMiddleware, deleteComment);

module.exports = router;