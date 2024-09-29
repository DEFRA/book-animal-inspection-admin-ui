import { config } from '~/src/config/index.js'
import { fetcher } from '~/src/server/common/helpers/fetch/fetcher.js'

async function getInspectionLength(siteId) {
  const endpoint =
    config.get('liveAnimalBookingServiceApiUrl') +
    `/getInspectionLengthBySiteId/${siteId}`

  const result = await fetcher(endpoint)

  if (!result) {
    throw new Error('Failed to fetch inspection length data')
  }

  const { json } = result

  return json.result
}

export { getInspectionLength }
