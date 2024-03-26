const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

/* blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
}) */

// Exercise 4.19
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

blogsRouter.post('/', async (request, response) => {
  const { title, author, likes, url } = request.body
  const user = request.user

  if(!user){
    return response.status(401).json({ error: 'token missing ooor invalid' })
  }
  if (!url) {
    return response.status(400).json({ error: 'url not found' })
  } else if (!title) {
    return response.status(400).json({ error: 'title not found' })
  } else {

    const blog = {
      'title': title,
      'author': author,
      'url': url,
      'likes': likes,
      'user': user.id
    }

    const newBlog = new Blog(blog)
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog.toJSON())
  }
})

// Exercise 4.13 (Blog list expansion)
/* blogsRouter.delete('/:id', async(request, response, next) => {
  const id = request.params.id
  try {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
}) */

// Exercise 4.21
blogsRouter.delete('/:id', async(request, response, next) => {
  const user = request.user
  if(!user){
    return response.status(401).json({ error: 'token or user invalid' })
  }
  try {
    const blog = await Blog.findById(request.params.id)
    if(blog.user.toString() === request.user.id){

      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).json({ error: 'Unauthorized to delete this blog' })
    }
  } catch (error) {
    next(error)
  }
})

// Exercise 4.14 (Blog list expansion)
blogsRouter.put('/:id', async(request, response, next) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    //title: body.title,
    //author: body.author,
    //url: body.url
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