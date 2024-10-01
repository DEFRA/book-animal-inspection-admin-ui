import { getInspectionLength } from '~/src/server/inspectionLength/helpers/database/get-inspection-length.js'
import { updateInspectionLength } from '~/src/server/inspectionLength/helpers/database/update-inspection-length.js'
import { validators } from '~/src/server/common/validations/validations.js'

const inspectionLengthController = {
  handler: async (request, h) => {
    let error = null

    const inspectionLengthData = await getInspectionLength(1)

    if (request.method === 'post') {
      const { selectedItems } = request.payload

      error = validators.validateAnimalSelection(selectedItems)

      if (error === null) {
        const idArray = selectedItems.split(',')

        // Filter the data based on the input IDs and return AnimalTypes
        const animalTypes = inspectionLengthData
          .filter((item) => idArray.includes(item._id))
          .map((item) => item.AnimalType)

        const selectedAnimalTypes = animalTypes.join(', ')
        request.yar.set('selectedAnimalTypes', selectedAnimalTypes)
        request.yar.set('selectedItems', selectedItems)
        return h.redirect('/updateInspectionLength')
      }
    }

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
    // let selectedItems
    // let selectedAnimalTypes

    // if (request.method === 'post') {
    //   selectedItems = request.payload
    // }

    return h.view('inspectionLength/updateInspectionLength', {
      pageTitle: 'Update Inspection Length',
      heading: 'UpdateInspectionLength',
      backUrl: 'inspectionLength',
      selectedItems: request.yar.get('selectedItems'),
      selectedAnimalTypes: request.yar.get('selectedAnimalTypes')
    })
  }
}

const confirmInspectionLengthController = {
  handler: async (request, h) => {
    let error = null
    if (request.method === 'post') {
      const {
        marshalling,
        setup,
        inspection,
        cleanUp,
        selectedItems,
        selectedAnimalTypes,
        update
      } = request.payload

      const totalInspectionLength = [
        marshalling,
        setup,
        inspection,
        cleanUp
      ].reduce((sum, val) => sum + parseInt(val, 10), 0)

      if (update === 'true') {
        const ids = selectedItems.split(',')

        const updateObj = ids.map((id) => ({
          _id: id,
          Marshalling: marshalling,
          Unloading: setup,
          Inspection: inspection,
          LoadingAndCleanUp: cleanUp,
          TotalInspectionLength: totalInspectionLength
        }))

        const result = await updateInspectionLength(updateObj)
        if (result?.response.ok) {
          return h.redirect('inspectionLength')
        } else {
          error = 'Failed to update the records.'
        }
      }

      return h.view('inspectionLength/confirmInspectionLength', {
        pageTitle: 'Confirm Inspection Length',
        heading: 'ConfirmInspectionLength',
        marshalling,
        setup,
        inspection,
        cleanUp,
        selectedItems,
        selectedAnimalTypes,
        totalInspectionLength,
        backUrl: 'inspectionLength',
        error
      })
    }
  }
}

export {
  inspectionLengthController,
  updateInspectionLengthController,
  confirmInspectionLengthController
}
