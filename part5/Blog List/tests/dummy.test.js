const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/for_testing')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})


describe('mostBlogs', () => {
  const blogs = [
    { title: 'A', author: 'Alice', likes: 5 },
    { title: 'B', author: 'Bob', likes: 10 },
    { title: 'C', author: 'Alice', likes: 7 }
  ]

  test('returns author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)

    assert.deepStrictEqual(result, {
      author: 'Alice',
      blogs: 2
    })
  })
})



describe('mostLikes', () => {
  const blogs = [
    { title: 'A', author: 'Alice', likes: 5 },
    { title: 'B', author: 'Bob', likes: 10 },
    { title: 'C', author: 'Alice', likes: 7 }
  ]

  test('returns author with most likes', () => {
    const result = listHelper.mostLikes(blogs)

    assert.deepStrictEqual(result, {
      author: 'Alice',
      likes: 12
    })
  })
})