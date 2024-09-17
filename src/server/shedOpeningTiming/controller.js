import { getShedOpeningTiming } from '~/src/server/shedOpeningTiming/helpers/database/get-shed-opening-timing.js'

export const shedOpeningTimingController = {
  handler: async (request, h) => {
    const shedOpeningTimingData = await getShedOpeningTiming(1)

    const sheds = {}

    shedOpeningTimingData.forEach((entry) => {
      if (!sheds[entry.ShedId]) {
        sheds[entry.ShedId] = {
          shedName: entry.ShedName,
          shedOpeningRows: []
        }
      }

      // Push day, from-to and HTML change link
      sheds[entry.ShedId].shedOpeningRows.push([
        { text: entry.Day },
        { text: `${entry.From} to ${entry.To}` },
        {
          html: `<a href="inspection-details.html?_id=${entry._id}&from=${entry.From}&To=${entry.To}&Day=${entry.Day}">Change</a>`
        }
      ])
    })

    return h.view('shedOpeningTiming/index', {
      pageTitle: 'Shed Opening Timing',
      heading: 'SehdOpeningTiming',
      shedOpeningTimingData: Object.values(sheds),
      backUrl: 'siteOperations'
    })
  }
}
