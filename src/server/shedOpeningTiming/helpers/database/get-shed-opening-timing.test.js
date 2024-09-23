// @ts-nocheck
import { getShedOpeningTiming } from '~/src/server/shedOpeningTiming/helpers/database/get-shed-opening-timing.js'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher.js'
import { config } from '~/src/config/index.js'

jest.mock('~/src/server/common/helpers/fetch/fetcher.js')
jest.mock('~/src/server/common/helpers/logging/logger.js', () => ({
  createLogger: jest.fn(() => ({
    info: jest.fn(),
    error: jest.fn()
  }))
}))
jest.mock('~/src/config/index.js', () => ({
  config: {
    get: jest.fn()
  }
}))

describe('getShedOpeningTiming', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch and return shed opening timing for a given siteId', async () => {
    const siteId = '123'
    const expectedTiming = '08:00 AM - 05:00 PM'

    config.get.mockReturnValue('http://mockapi.com')
    fetcher.mockResolvedValue({
      json: {
        shedOpeningTiming: expectedTiming
      }
    })

    const result = await getShedOpeningTiming(siteId)

    expect(fetcher).toHaveBeenCalledWith(
      `http://mockapi.com/shedOpeningTimingBySiteId/${siteId}`
    )
    expect(result).toBe(expectedTiming)
  })

  it('should throw an error if fetching shed opening timing fails', async () => {
    const siteId = '123'

    config.get.mockReturnValue('http://mockapi.com')
    fetcher.mockResolvedValue(null)

    await expect(getShedOpeningTiming(siteId)).rejects.toThrow(
      'Failed to fetch shed opening timing'
    )
  })
})
