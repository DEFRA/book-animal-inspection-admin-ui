import { siteOperationsController } from '~/src/server/siteOperations/controller.js'

describe('siteOperationsController', () => {
  let h

  beforeEach(() => {
    h = {
      view: jest.fn().mockReturnValue('rendered view')
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the site operations view with correct page title and heading', () => {
    const request = {}

    const result = siteOperationsController.handler(request, h)

    // Assert that the correct view and parameters are being passed
    expect(h.view).toHaveBeenCalledWith('siteOperations/index', {
      pageTitle: 'Site Operations',
      heading: 'SiteOperations'
    })

    // Check that the result is the mocked "rendered view"
    expect(result).toBe('rendered view')
  })
})
