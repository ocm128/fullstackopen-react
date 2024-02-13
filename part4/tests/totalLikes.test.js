/*
  way to check a only test
  npm test -- -t 'when likes sum is zero'
*/

const listHelper = require('../utils/list_helper')
const blogs = require('./initialBlogs')

describe('total likes', () => {

  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }
  ]

  test('when likes sum is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('calculates likes sum when list has multiple blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('when list has only two blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    expect(result).toBe(17)
  })

})



