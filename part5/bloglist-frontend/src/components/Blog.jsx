import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDlt }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const dltStyle = {
    background: 'red',
    color: 'white',
    fontWeight:'bold',
    fontAllignment:'center',
    border: 'solid-black'
  }

  return (
    <div style={blogStyle} className='blog'>
      <div className='blogTitleAuthor'>
        <div>
          {blog.title} {blog.author}
        </div>
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>

      {visible && (
        <div className="blogDetails">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog['user'][0]['name']}</div>
          <div>
            <button style={dltStyle} onClick={() => handleDlt(blog)}>remove</button>
          </div>
        </div>
      )}
    </div>
  )}

export default Blog