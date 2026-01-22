import { useState } from 'react'
const BlogForm = ( { createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>Create a New Blog</h2>
        <div>
          <label>Title
            <input type="text" placeholder='title' required value={title} onChange={({ target }) => setTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>Author
            <input type="text" placeholder='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>Url
            <input type="text" placeholder='url' required value={url} onChange={({ target }) => setUrl(target.value)} />
          </label>
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm