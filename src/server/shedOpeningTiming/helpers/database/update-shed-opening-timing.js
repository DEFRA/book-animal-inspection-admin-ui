import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { config } from '~/src/config/index.js'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher.js'

const logger = createLogger()

async function updateShedOpeningTiming(id, from, to) {
  const endpoint =
    config.get('liveAnimalBookingServiceApiUrl') +
    `/updateShedOpeningTimingById`
  const options = {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      from: from,
      to: to
    })
  }

  try {
    const result = await fetcher(endpoint, options)
    return result
  } catch (error) {
    logger.error('Error updating Shed Opening Time', error)
  }
}

export { updateShedOpeningTiming }
