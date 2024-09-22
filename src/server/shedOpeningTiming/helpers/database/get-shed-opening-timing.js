import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { config } from '~/src/config/index.js'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher.js'

const logger = createLogger()

async function getShedOpeningTiming(siteId) {
  const endpoint =
    config.get('liveAnimalBookingServiceApiUrl') +
    `/shedOpeningTimingBySiteId/${siteId}`

  logger.info(`::::::::::::: getShedOpeningTiming SiteId ::::::::::: ${siteId}`)

  logger.info(
    `::::::::::::: getShedOpeningTiming endpoint ::::::::::: ${endpoint}`
  )

  const result = await fetcher(endpoint)

  if (!result) {
    throw new Error('Failed to fetch shed opening timing')
  }

  const { json } = result

  return json.shedOpeningTiming
}

export { getShedOpeningTiming }
