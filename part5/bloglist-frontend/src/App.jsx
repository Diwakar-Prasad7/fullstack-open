import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    }
    )
  }, [])

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setError('wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
      console.log('wrong credentials')
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username
              <input type="text" required value={username} onChange={({ target }) => setUsername(target.value)}/>
            </label>
          </div>
          <div>
            <label>Password
              <input type="password" required value={password} onChange={({ target }) => setPassword(target.value)} />
            </label>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
  }

  const handleDlt = async (blog) => {
    if (!window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
      return
    } try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch(error) {
      setError('error deleting the blog')
      console.log(error)
    }
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        {[...blogs]
          .sort((a,b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDlt={handleDlt} />
          )}
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const res = await blogService.create(newBlog)
      setBlogs(blogs.concat(res))
      setError(`a new blog ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setError(null)
      }, 5000)
    } catch {
      setError('problems adding blog')
      setTimeout(() => {
        setError(null)
      }, 5000)
      console.log('error in adding')
    }
  }

  return (
    <div>
      <Notification msg={error} />
      {!user && loginForm()}
      {user && (
        <div>
          <span>{user.name} logged in</span>
          <button onClick={handleLogout}>logOut</button>
          <Togglable buttonLabel1='create new blog' buttonLabel2='cancel' ref={blogFormRef} >
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogList()}
        </div> )}
    </div>
  )
}

export default App