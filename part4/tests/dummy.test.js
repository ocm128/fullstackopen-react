const listHelper = require('../utils/list_helper')

test('dummy returns two', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(2)
})