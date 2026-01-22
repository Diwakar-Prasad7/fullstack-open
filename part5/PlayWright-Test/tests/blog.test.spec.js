const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Diwakar',
        username: 'diwakar',
        password: 'secret'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    const textboxes = page.getByRole('textbox')
    await expect(textboxes).toHaveCount(2)
    await expect(textboxes.first()).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'diwakar', 'secret')
      await expect(page.getByText('Diwakar logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'diwakar', 'wrong')
      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'diwakar', 'secret')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'testing blog creation', 'diwakar prasad', 'www.example.com')
      await expect(page.getByText('testing blog creation by diwakar prasad')).toBeVisible()
    })

    test('user can like a blog', async ({ page }) => {
      await createBlog(page, 'testing blog creation', 'diwakar prasad', 'www.example.com')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('creator can delete a blog', async ({ page }) => {
      await createBlog(page, 'My first blog', 'Diwakar', 'www.example.com')
      const blog = page.locator('.blog', { hasText: 'My first blog Diwakar' })
      
      page.on('dialog', dialog => dialog.accept())
      await blog.getByRole('button', { name: 'view' }).click()
      await blog.getByRole('button', { name: 'remove' }).click()
      
      await expect(blog).toHaveCount(0)
    })
  })
})
