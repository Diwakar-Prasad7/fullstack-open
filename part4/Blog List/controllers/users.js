const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const { username, name, password  } =  req.body

  if ( !username || !password) {
    return res.status(400).json( { error: 'username and password are required' } )
  } if ( username.length < 3 || password.length < 3 ) {
    return res.status(400).json( { error: 'username and password both should be greater than 3' } )
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })
  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = userRouter