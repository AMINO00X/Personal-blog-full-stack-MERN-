const Post = require('../models/post')

const createPost = async (req, res) => {
     const { title, content, image } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content required' });

  const newPost = await Post.create({
    title,
    content,
    image,
    author: req.user.id,  // نأخذ المستخدم من التوكن بعد التحقق
  });

  res.status(201).json(newPost);
}


const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
  res.status(200).json(posts);
};



const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'username');
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.status(200).json(post);
};



const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedPost);
};




const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });

  await post.deleteOne();
  res.status(200).json({ message: 'Post deleted' });
};



module.exports = { createPost, getAllPosts, getSinglePost, updatePost, deletePost };


