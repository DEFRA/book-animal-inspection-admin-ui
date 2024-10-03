// Import the function and dependencies
import { getInspectionLength } from '~/src/server/inspectionLength/helpers/database/get-inspection-length.js'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher.js'
import { config } from '~/src/config/index.js'

// Mock the dependencies
jest.mock('~/src/server/common/helpers/fetch/fetcher.js')
jest.mock('~/src/config/index.js')

describe('getInspectionLength', () => {
  const mockApiUrl = 'http://mock-api-url.com'

  beforeAll(() => {
    // Mock the config to return a specific API URL
    // @ts-ignore
    config.get.mockReturnValue(mockApiUrl)
  })

  afterEach(() => {
    jest.clearAllMocks() // Clear mocks after each test to avoid interference
  })

  it('should fetch inspection length data successfully', async () => {
    const siteId = 1
    const mockResponse = { json: { result: [{ _id: '1', AnimalType: 'Dog' }] } }

    // Mock fetcher to return a successful response
    // @ts-ignore
    fetcher.mockResolvedValue(mockResponse)

    const result = await getInspectionLength(siteId)

    expect(fetcher).toHaveBeenCalledWith(
      `${mockApiUrl}/getInspectionLengthBySiteId/${siteId}`
    )
    expect(result).toEqual(mockResponse.json.result)
  })

  it('should throw an error when fetching data fails', async () => {
    const siteId = 2

    // Mock fetcher to return no result
    // @ts-ignore
    fetcher.mockResolvedValue(null)

    await expect(getInspectionLength(siteId)).rejects.toThrow(
      'Failed to fetch inspection length data'
    )
  })

  it('should throw an error when fetcher throws an error', async () => {
    const siteId = 3
    const errorMessage = 'Failed to fetch inspection length data'

    // Mock fetcher to throw an error
    // @ts-ignore
    fetcher.mockRejectedValue(new Error(errorMessage))

    await expect(getInspectionLength(siteId)).rejects.toThrow(
      'Failed to fetch inspection length data'
    )
  })
})
