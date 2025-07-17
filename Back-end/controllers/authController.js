const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password ) return res.status(400).json({message: 'All fields required'})
    

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
    username,
    email,
    password: hashedPassword
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
}



  const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });


  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid email' });



  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid password' });


  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });


  res.status(200).json({ token });
};


const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json(user);
};



module.exports = { registerUser, loginUser, getCurrentUser };



