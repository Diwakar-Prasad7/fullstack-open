const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name:1 } )
  response.json(blog)
  // Blog.find({}).then(blogs => {
  //   console.log(blogs)
  //   response.json(blogs)
  // })
})

blogsRouter.post('/', async (request, response) => {
  const { title, url, author, likes } = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if ( !decodedToken.id ) {
    return response.status(401).json({ error: 'token invalid' })
  }

  if (!title || !url) {
    return response.status(400).json({ error: 'Bad Request' })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(400).json( { error: 'UserId missing or not valid' } )
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
  // blog.save()
  //   .then(result => response.status(201).json(result))
  //   .catch(error => next(error))
})

blogsRouter.delete('/:id', async (req, res) => {
  console.log('REQ.TOKEN:', req.token)

  if (!req.token) return res.status(401).json({ error: 'token missing' })

  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(404).json({ error: 'blog not found' })

  let decodedToken
  try {
    decodedToken = jwt.verify(req.token, process.env.SECRET)
  } catch {
    return res.status(401).json({ error: 'token invalid' })
  }

  if (decodedToken.id.toString() !== blog.user.toString()) {
    return res.status(401).json({ error: 'cannot delete this blog' })
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})


blogsRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body

  const updatedBlog = {
    title,
    author,
    url,
    likes
  }

  const result = await Blog.findByIdAndUpdate(
    req.params.id,
    updatedBlog,
    { new: true, runValidators: true }
  )

  if (!result) {
    return res.status(404).json({ error: 'blog not found' })
  }

  res.status(200).json(result)
})



module.exports = blogsRouter