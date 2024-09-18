import { getShedOpeningTiming } from '~/src/server/shedOpeningTiming/helpers/database/get-shed-opening-timing.js'

const shedOpeningTimingController = {
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
          html: `<a href="updateShedOpeningTiming?_id=${entry._id}&From=${entry.From}&To=${entry.To}&Day=${entry.Day}&Shedname=${entry.ShedName.split(':')[0].trim()}">Change</a>`
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

const updateShedOpeningTimingController = {
  handler(request, h) {
    const { _id, From, To, Day, Shedname } = request.query

    return h.view('shedOpeningTiming/updateShedOpeningTiming', {
      pageTitle: 'Shed Opening Timing',
      heading: 'shedOpeningTiming',
      id: _id,
      from: From,
      to: To,
      day: Day,
      shedName: Shedname,
      backUrl: 'shedOpeningTiming'
    })
  }
}

export { shedOpeningTimingController, updateShedOpeningTimingController }
