import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { config } from '~/src/config/index.js'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher.js'

const logger = createLogger()

async function updateInspectionLength(inspectionLengthObject) {
  const endpoint =
    config.get('liveAnimalBookingServiceApiUrl') + `/updateInspectionLengthById`
  const options = {
    method: 'POST',
    body: JSON.stringify({
      inspectionLengthObject
    })
  }

  try {
    const result = await fetcher(endpoint, options)
    return result
  } catch (error) {
    logger.error('Error updating inspection length', error)
  }
}

export { updateInspectionLength }
