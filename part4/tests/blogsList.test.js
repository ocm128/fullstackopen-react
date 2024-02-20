/*
  way to check a only test
  npm test -- -t "HTTP or http"
*/
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const iB = require('./initialBlogs')

beforeEach(async () => {

  // Create blogs
  //console.log(iB, 'BLOOOOOOGS')
  await Blog.deleteMany({})

  const blogObjects = iB.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('HTTP GET /api/blogs ', () => {
  test('returns the exact number of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(iB.length)
  })
})


// Exercise 4.9
describe('HTTP id and not _id  ', () => {
  test('The unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('HTTP id and not _id  ', () => {
  test('The unique identifier property of the blog posts is by default _id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})

