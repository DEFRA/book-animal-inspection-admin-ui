import { getShedOpeningTiming } from '~/src/server/shedOpeningTiming/helpers/database/get-shed-opening-timing.js'
import { updateShedOpeningTiming } from '~/src/server/shedOpeningTiming/helpers/database/update-shed-opening-timing.js'
import { validators } from '~/src/server/common/validations/validations.js'

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
          html: `<a href="updateShedOpeningTiming?Id=${entry._id}&From=${entry.From}&To=${entry.To}&Day=${entry.Day}&Shedname=${entry.ShedName.split(':')[0].trim()}">Change</a>`
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
    let inputParams
    let error = null

    if (request.method === 'post') {
      inputParams = request.payload

      error = validators.validateTime(inputParams.From, inputParams.To)

      if (error === null) {
        return h.redirect(
          `/confirmShedOpeningTiming?Id=${inputParams.Id}&From=${inputParams.From}&To=${inputParams.To}&Day=${inputParams.Day}&Shedname=${inputParams.Shedname}`
        )
      }
    } else {
      inputParams = request.query
    }

    return h.view('shedOpeningTiming/updateShedOpeningTiming', {
      pageTitle: 'Shed Opening Timing',
      heading: 'shedOpeningTiming',
      id: inputParams.Id,
      from: inputParams.From,
      to: inputParams.To,
      day: inputParams.Day,
      shedName: inputParams.Shedname,
      backUrl: 'shedOpeningTiming',
      error
    })
  }
}

const confirmShedOpeningTimingController = {
  handler: async (request, h) => {
    let inputParams

    if (request.method === 'post') {
      inputParams = request.payload

      const result = await updateShedOpeningTiming(
        inputParams.Id,
        inputParams.From,
        inputParams.To
      )
      if (result?.response.ok) {
        return h.redirect('shedOpeningTiming')
      }
    } else {
      inputParams = request.query
    }

    return h.view('shedOpeningTiming/confirmShedOpeningTiming', {
      pageTitle: 'Confirm Shed Opening Timing',
      heading: 'shedOpeningTiming',
      id: inputParams.Id,
      from: inputParams.From,
      to: inputParams.To,
      day: inputParams.Day,
      shedName: inputParams.Shedname,
      backUrl: 'shedOpeningTiming'
    })
  }
}

export {
  shedOpeningTimingController,
  updateShedOpeningTimingController,
  confirmShedOpeningTimingController
}
