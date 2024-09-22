import { homeController } from '~/src/server/home/controller.js'

describe('homeController', () => {
  let mock

  beforeEach(() => {
    mock = {
      view: jest.fn().mockReturnThis()
    }
  })

  it('should return the home view with the correct data', () => {
    const mockRequest = {
      method: 'GET',
      url: '/home',
      headers: {},
      auth: {},
      app: {},
      params: {},
      query: {}
    }

    homeController.handler(mockRequest, mock)

    expect(mock.view).toHaveBeenCalledWith('home/index', {
      pageTitle: 'Home',
      heading: 'Home'
    })
  })
})
