const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose= require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)
const in_blogs = [
  {
    'title': 'My First Blog',
    'author': 'Alice',
    'url': 'https://example.com',
    'likes': 10
  },
  {
    'title': 'My Blog',
    'author': 'deee',
    'url': 'https://exampele.com',
    'likes': 4
  }
]

const tst_users = [
  {
    username: 'root',
    name: 'Superuser',
    password: 'salainen',
  },
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    password: 'salainen',
  }
]

describe('Initial Blogs are saved in the database', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(in_blogs)
  })

  test('Exercise 4.8- Blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Exercise 4.8- Checking the length of Blogs', async () => {
    const res = await api.get('/api/blogs')
    assert.strictEqual(res.body.length, in_blogs.length)
  })

  test('Exercise 4.9- Blog posts have id property', async() => {
    const res = await api.get('/api/blogs')
    res.body.forEach(blog => {
      assert.ok(blog.id)
      assert.strictEqual(blog._id, undefined)
    })
  })

  // test('Exercise 4.10- POST request test', async () => {
  //   const newBlog = {
  //     'title': 'My addition Blog',
  //     'author': 'Diwakar prasad',
  //     'url': 'https://localhost3003.com',
  //     'likes': 12
  //   }
  //   await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
  //   const res = await api.get('/api/blogs')
  //   assert.strictEqual(res.body.length, in_blogs.length+1)
  //   const title = res.body.map(blog => blog.title)
  //   assert(title.includes('My addition Blog'))
  // })

  // test('Exercise 4.11- if likes property is missing, it defaults to 0', async () => {
  //   const newBlog = {
  //     title: 'Blog without likes',
  //     author: 'manjeet',
  //     url: 'https://nolikes.com'
  //   }

  //   const response = await api
  //     .post('/api/blogs')
  //     .send(newBlog)
  //     .expect(201)
  //     .expect('Content-Type', /application\/json/)

  //   assert.strictEqual(response.body.likes, 0)
  // })

  test('Exercise 4.12- title or url missing-', async() => {
    const newBlog1 = {
      author: 'deepak uniyal',
      url: 'https://localhost12.com'
    }

    const newBlog2 = {
      title: 'Blog withot url',
      author: 'devi prasad',
    }
    await api.post('/api/blogs').send(newBlog1).expect(400)
    await api.post('/api/blogs').send(newBlog2).expect(400)
  })

  test('Exercise 4.13- deletion test', async() => {
    const dlt_blog = (await api.get('/api/blogs')).body
    await api.delete(`/api/blogs/${dlt_blog[0].id}`).expect(204)
    const dlted_blog = (await api.get('/api/blogs')).body
    assert.strictEqual(dlted_blog.length, in_blogs.length - 1)
  })

  test('Exercise 4.14 - a blog can be updated', async () => {
    const blogsAtStart = (await api.get('/api/blogs')).body
    const blogToUpdate = blogsAtStart[0]

    const updatedData = {
      title: 'Updated title',
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 5
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)


    assert.strictEqual(response.body.likes, updatedData.likes)
    assert.strictEqual(response.body.title, updatedData.title)

    const blogsAtEnd = (await api.get('/api/blogs')).body
    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

    assert.strictEqual(updatedBlog.likes, updatedData.likes)
  })

})

describe('Blog tests with user relation', () => {
  let testUser

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const user = new User({
      username: 'bloguser',
      name: 'Blog Tester',
      passwordHash: 'dummyhash'
    })

    testUser = await user.save()

    const blogsWithUser = in_blogs.map(blog => ({
      ...blog,
      user: testUser._id
    }))

    await Blog.insertMany(blogsWithUser)
  })

  test('Exercise 4.10- POST request test', async () => {
    const newBlog = {
      title: 'My addition Blog',
      author: 'Diwakar prasad',
      url: 'https://localhost3003.com',
      likes: 12,
      userId: testUser._id.toString()
    }

    await api.post('/api/blogs').send(newBlog).expect(201)
  })

  test('Exercise 4.11- if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'manjeet',
      url: 'https://nolikes.com',
      userId: testUser._id.toString()
    }

    const res = await api.post('/api/blogs').send(newBlog).expect(201)
    assert.strictEqual(res.body.likes, 0)
  })
})


describe('User related tests- ', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(tst_users)
  })

  test('all users are returned', async () => {
    const res = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)
    assert.strictEqual(res.body.length, tst_users.length)
  })

  test('valid user is created', async () => {
    const newUser = {
      username: 'diwakar',
      name: 'Diwakar Prasad',
      password: 'secret123'
    }

    const user = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await User.find({})
    assert.strictEqual(users.length, tst_users.length + 1)

    assert.deepStrictEqual(user.body.username, 'diwakar')
  })
})
after(async () => {
  await mongoose.connection.close()
})