const Comment = require('../models/comment');


const createComment = async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: 'Comment content required' });

  const comment = await Comment.create({
    content,
    post: req.params.postId,
    author: req.user.id
  });

  res.status(201).json(comment);
};




const getCommentsByPost = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username').sort({ createdAt: -1 });
  res.status(200).json(comments);
};




const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  if (comment.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });

  await comment.deleteOne();
  res.status(200).json({ message: 'Comment deleted' });
};



module.exports = { createComment, getCommentsByPost, deleteComment };
