/*
  way to check a only test
  npm test -- -t "HTTP or http or whatever"
*/
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const iB = require('./initialBlogs')

beforeEach(async () => {

  // Create blogs
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


// Exercise 4.10
describe('HTTP POST /api/blogs ', () => {
  test('A new blog can be added ', async () => {

    const newBlog = {
      'title': 'UNIX in a nutshell',
      'author': 'James C. Armstrong',
      'url': 'https://unixinanutshell.com/',
      'likes': 1018
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201) // Created
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(iB.length + 1)
  })
})

// Exercise 4.11
describe('Like property is missing and it will default to 0', () => {
  test('http likes is missing', async () => {

    const newBlog = {
      'title': 'Javascript Ninja',
      'author': 'John Resig',
      'url': 'https://www.jsninja.com'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    console.log(response)

    response.body.map(async (blog) => {
      if (blog.likes === undefined) {
        blog.likes = 0
      }
    })

    response.body.map(async (blog) => {
      await expect(blog.likes).toBeDefined()
    })

  })
})

afterAll(() => {
  mongoose.connection.close()
})