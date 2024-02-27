const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
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