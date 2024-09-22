// @ts-nocheck
import { updateShedOpeningTiming } from '~/src/server/shedOpeningTiming/helpers/database/update-shed-opening-timing.js'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher.js'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'

jest.mock('~/src/server/common/helpers/fetch/fetcher.js')
jest.mock('~/src/config/index.js')
jest.mock('~/src/server/common/helpers/logging/logger.js')

describe('updateShedOpeningTiming', () => {
  let logger

  beforeEach(() => {
    // Mock logger and config
    logger = {
      error: jest.fn()
    }
    createLogger.mockReturnValue(logger)

    // Mock config
    config.get = jest.fn().mockReturnValue('https://example.com/api')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call fetcher with the correct endpoint and options on success', async () => {
    // Mock successful response from fetcher
    const mockResponse = { response: { ok: true } }
    fetcher.mockResolvedValue(mockResponse)

    const result = await updateShedOpeningTiming('1', '08:00', '17:00')

    const expectedEndpoint =
      'https://example.com/api/updateShedOpeningTimingById'
    const expectedOptions = {
      method: 'POST',
      body: JSON.stringify({
        id: '1',
        from: '08:00',
        to: '17:00'
      })
    }

    expect(fetcher).toHaveBeenCalledWith(expectedEndpoint, expectedOptions)
    expect(result).toEqual(mockResponse)
  })
})
