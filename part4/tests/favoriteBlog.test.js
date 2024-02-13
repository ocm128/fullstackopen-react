const listHelper = require('../utils/list_helper')
const blogs = require('./initialBlogs')

describe('favorite Blog', () => {

  test('Canonical string reduction is the blog most liked', () => {
    const result = listHelper.favoriteBlog(blogs)
    console.log(result)
    expect(result).toEqual(
      { _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
      }
    )
  })
})