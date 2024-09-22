import { aboutController } from '~/src/server/about/controller.js'

describe('aboutController', () => {
  let mockH

  beforeEach(() => {
    // Mock the h.view method
    mockH = {
      view: jest.fn().mockReturnThis() // mock chainable method
    }
  })

  it('should return the about view with the correct data', () => {
    // Create a mock request object
    const mockRequest = {
      method: 'GET',
      url: '/about',
      headers: {},
      auth: {},
      app: {},
      params: {},
      query: {}
    }

    // Call the controller handler
    const result = aboutController.handler(mockRequest, mockH)

    // Assert that h.view was called with the correct parameters
    expect(mockH.view).toHaveBeenCalledWith('about/index', {
      pageTitle: 'About',
      heading: 'About',
      breadcrumbs: [{ text: 'Home', href: '/' }, { text: 'About' }]
    })

    // Assert the result of the handler
    expect(result).toBe(mockH) // Assuming h.view returns h
  })
})
