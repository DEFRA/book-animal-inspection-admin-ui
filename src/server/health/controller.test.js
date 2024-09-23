import { healthController } from '~/src/server/health/controller.js'

describe('healthController', () => {
  let mock

  beforeEach(() => {
    mock = {
      response: jest.fn().mockReturnThis(),
      code: jest.fn()
    }
  })

  it('should return a success message with a 200 status code', () => {
    const mockRequest = {
      method: 'GET',
      url: '/health',
      headers: {},
      auth: {},
      app: {},
      params: {},
      query: {}
    }

    healthController.handler(mockRequest, mock)

    expect(mock.response).toHaveBeenCalledWith({ message: 'success' })
    expect(mock.code).toHaveBeenCalledWith(200)
  })
})
