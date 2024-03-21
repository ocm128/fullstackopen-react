const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/* blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
}) */


/* const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
} */

// Exercise 4.17
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

/* blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
}) */

/* blogsRouter.post('/', async (request, response) => {
  const { title, author, likes } = request.body
  const token = request.token
  console.log(token, ' token')
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  if (!request.body.url) {
    return response.status(400).json({ error: 'url not found' })
  } else if (!title) {
    return response.status(400).json({ error: 'Title not found' })
  } else {
    const user = await User.findById(decodedToken.id)

    const blog = {
      'title': title,
      'author': author,
      'likes': likes,
      'user': user.id
    }

    const newBlog = new Blog(blog)

    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
  }
}) */

blogsRouter.post('/', async (request, response) => {

  // response.status(400)
  if (request.body.title === undefined) {
    response.status(400).json('title not found')
  }
  else if (request.body.url === undefined) {
    response.status(400).json('url not found')
  }
  else if (request.token === undefined) {
    console.log(request.token, ' token 1')
    response.status(401).json('token missing or invalid 1')
  }
  else {
    const body = request.body
    const token = request.token
    console.log(token, ' token')
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid 2' })
    }
    const user = await User.findById(decodedToken.id)

    // const user = await User.findById(body.userId)

    const newBlog = {
      'title': body.title,
      'author': body.author,
      'likes': body.likes,
      'user': user.id
    }
    const blog = new Blog(newBlog)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()


    response.json(savedBlog.toJSON())
  }
})

// Exercise 4.13 (Blog list expansion)
blogsRouter.delete('/:id', async(request, response, next) => {
  const id = request.params.id
  try {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// Exercise 4.14 (Blog list expansion)
blogsRouter.put('/:id', async(request, response, next) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    likes: body.likes
  }
  try {
    const blogUpdated = await Blog.findByIdAndUpdate(id, blog, { new: true })
    response.json(blogUpdated.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter