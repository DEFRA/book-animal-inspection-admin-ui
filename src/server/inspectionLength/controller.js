import { getInspectionLength } from '~/src/server/inspectionLength/helpers/database/get-inspection-length.js'
import { updateShedOpeningTiming } from '~/src/server/shedOpeningTiming/helpers/database/update-shed-opening-timing.js'
import { validators } from '~/src/server/common/validations/validations.js'

const inspectionLengthController = {
  handler: async (request, h) => {
    let error = null

    if (request.method === 'post') {
      const { selectedItems } = request.payload

      error = validators.validateAnimalSelection(selectedItems)

      if (error === null) {
        request.yar.set('test', selectedItems)
        return h.redirect('/updateInspectionLength')
      }
    }

    const inspectionLengthData = await getInspectionLength(1)

    const inspectionLength = {}

    inspectionLengthData.forEach((entry) => {
      if (!inspectionLength[entry.ShedId]) {
        inspectionLength[entry.ShedId] = {
          shedName: entry.ShedName,
          inspectionLengthRows: []
        }
      }

      inspectionLength[entry.ShedId].inspectionLengthRows.push([
        { id: entry._id },
        { AnimalType: entry.AnimalType },
        { Marshalling: entry.Marshalling },
        { Unloading: entry.Unloading },
        { Inspection: entry.Inspection },
        { LoadingAndCleanUp: entry.LoadingAndCleanUp },
        { TotalInspectionLength: entry.TotalInspectionLength }
      ])
    })

    return h.view('inspectionLength/index', {
      pageTitle: 'Inspection Length',
      heading: 'InspectionLength',
      inspectionLengthData: Object.values(inspectionLength),
      backUrl: 'siteOperations',
      error
    })
  }
}

const updateInspectionLengthController = {
  handler(request, h) {
    let selectedItems

    if (request.method === 'post') {
      selectedItems = request.payload
    } else {
      selectedItems = request.yar.get('test')
    }

    return h.view('inspectionLength/updateInspectionLength', {
      pageTitle: 'Update Inspection Length',
      heading: 'UpdateInspectionLength',
      marshalling: '',
      Unloading: '',
      Inspection: '',
      loadingAndCleanUp: '',
      totalInspectionLength: '',
      backUrl: 'shedOpeningTiming',
      selectedItems
    })
  }
}

const confirmInspectionLengthController = {
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

    return h.view('inspectionLength/confirmInspectionLength', {
      pageTitle: 'Confirm Inspection Length',
      heading: 'ConfirmInspectionLength',
      marshalling: '',
      Unloading: '',
      Inspection: '',
      loadingAndCleanUp: '',
      totalInspectionLength: '',
      backUrl: 'shedOpeningTiming'
    })
  }
}

export {
  inspectionLengthController,
  updateInspectionLengthController,
  confirmInspectionLengthController
}
