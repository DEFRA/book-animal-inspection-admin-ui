// @ts-nocheck
// Import the function and dependencies
import { updateInspectionLength } from '~/src/server/inspectionLength/helpers/database/update-inspection-length.js'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher.js'
import { config } from '~/src/config/index.js'

// Mock the dependencies
jest.mock('~/src/server/common/helpers/fetch/fetcher.js')
jest.mock('~/src/config/index.js')
jest.mock('~/src/server/common/helpers/logging/logger.js')

describe('updateInspectionLength', () => {
  const mockApiUrl = 'http://mock-api-url.com'

  beforeAll(() => {
    // Mock the config to return a specific API URL
    config.get.mockReturnValue(mockApiUrl)
  })

  afterEach(() => {
    jest.clearAllMocks() // Clear mocks after each test to avoid interference
  })

  it('should successfully update inspection length and return the result', async () => {
    const mockInspectionLengthObject = { _id: '1', TotalInspectionLength: 30 }
    const mockResponse = { response: { ok: true } }

    // Mock fetcher to return a successful response
    fetcher.mockResolvedValue(mockResponse)

    const result = await updateInspectionLength(mockInspectionLengthObject)

    expect(fetcher).toHaveBeenCalledWith(
      `${mockApiUrl}/updateInspectionLengthById`,
      {
        method: 'POST',
        body: JSON.stringify({
          inspectionLengthObject: mockInspectionLengthObject
        })
      }
    )
    expect(result).toEqual(mockResponse)
  })
})
