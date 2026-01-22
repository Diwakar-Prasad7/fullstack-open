import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { expect } from 'vitest'

test('5.13: renders title and author but not url or likes by default', () => {
  const blog = {
    title: 'this is exercise 5.13',
    author: 'Diwakar Prasad',
    url: 'http://www.example.com',
    likes: 10
  }

  const { container } = render(<Blog blog={blog} />)

  const blogDiv = container.querySelector('.blog')
  expect(blogDiv).toHaveTextContent('this is exercise 5.13')
  expect(blogDiv).toHaveTextContent('Diwakar Prasad')

  expect(blogDiv).not.toHaveTextContent('http://www.example.com')
  expect(blogDiv).not.toHaveTextContent('10')

})


test('5.14: blog url and likes are shown after clicking the view button', async () => {
  const blog = {
    title: 'React testing',
    author: 'Diwakar Prasad',
    url: 'http://example.com',
    likes: 7,
    user: [
      {
        name: 'Test User'
      }
    ]
  }

  const handleLike = vi.fn()
  const handleDlt = vi.fn()

  const user = userEvent.setup()

  render(
    <Blog
      blog={blog}
      handleLike={handleLike}
      handleDlt={handleDlt}
    />
  )

  const button = screen.getByText('view')
  await user.click(button)


  expect(screen.getByText('http://example.com')).toBeInTheDocument()
  expect(screen.getByText('likes 7')).toBeInTheDocument()
})

test('5.15: clicking the like button twice calls event handler twice', async () => {
  const blog = {
    title: 'Testing likes',
    author: 'Tester',
    url: 'http://example.com',
    likes: 0,
    user: [{ name: 'Tester' }]
  }

  const mockLikeHandler = vi.fn()

  render(
    <Blog blog={blog} handleLike={mockLikeHandler} handleDlt={() => {}} />
  )

  const user = userEvent.setup()


  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  //   expect(mockLikeHandler).toHaveBeenCalledTimes(2)
  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})


test('5.16: BlogForm calls event handler with correct details', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const submitButton = screen.getByText('Create')

  await user.type(titleInput, 'New Blog Title')
  await user.type(authorInput, 'New Author')
  await user.type(urlInput, 'http://newblog.com')

  await user.click(submitButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'New Blog Title',
    author: 'New Author',
    url: 'http://newblog.com'
  })
})

