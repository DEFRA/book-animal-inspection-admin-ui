// @ts-nocheck
// Import necessary dependencies and the controllers
// @ts-ignore
import {
  inspectionLengthController,
  updateInspectionLengthController,
  confirmInspectionLengthController
} from '~/src/server/inspectionLength/controller.js'
import { getInspectionLength } from '~/src/server/inspectionLength/helpers/database/get-inspection-length.js'
import { updateInspectionLength } from '~/src/server/inspectionLength/helpers/database/update-inspection-length.js'
import { validators } from '~/src/server/common/validations/validations.js'

// Mock dependencies
jest.mock(
  '~/src/server/inspectionLength/helpers/database/get-inspection-length.js'
)
jest.mock(
  '~/src/server/inspectionLength/helpers/database/update-inspection-length.js'
)
jest.mock('~/src/server/common/validations/validations.js')

describe('Inspection Length Controllers', () => {
  let h, request

  beforeEach(() => {
    // Initialize h and request objects before each test
    h = {
      redirect: jest.fn(),
      view: jest.fn()
    }
    request = {
      method: 'get',
      payload: {},
      yar: {
        set: jest.fn(),
        get: jest.fn().mockReturnValue(null)
      }
    }
  })

  describe('inspectionLengthController', () => {
    beforeEach(() => {
      // Mock the return value of getInspectionLength
      // @ts-ignore
      getInspectionLength.mockResolvedValue([
        {
          _id: '1',
          ShedId: 'shed1',
          ShedName: 'Shed 1',
          AnimalType: 'Dog',
          Marshalling: 5,
          Unloading: 10,
          Inspection: 15,
          LoadingAndCleanUp: 5,
          TotalInspectionLength: 35
        },
        {
          _id: '2',
          ShedId: 'shed2',
          ShedName: 'Shed 2',
          AnimalType: 'Cat',
          Marshalling: 6,
          Unloading: 9,
          Inspection: 14,
          LoadingAndCleanUp: 4,
          TotalInspectionLength: 33
        }
      ])
    })

    it('should render the inspection length view with data', async () => {
      // @ts-ignore
      await inspectionLengthController.handler(request, h)
      expect(getInspectionLength).toHaveBeenCalledWith(1)
      expect(h.view).toHaveBeenCalledWith('inspectionLength/index', {
        pageTitle: 'Inspection Length',
        heading: 'InspectionLength',
        inspectionLengthData: expect.any(Array),
        backUrl: 'siteOperations',
        error: null
      })
    })

    it('should handle post request with valid selected items', async () => {
      request.method = 'post'
      request.payload = { selectedItems: '1,2' }
      // @ts-ignore
      validators.validateAnimalSelection.mockReturnValue(null) // Simulate no validation error

      // @ts-ignore
      await inspectionLengthController.handler(request, h)

      expect(validators.validateAnimalSelection).toHaveBeenCalledWith('1,2')
      expect(h.redirect).toHaveBeenCalledWith('/updateInspectionLength')
      expect(request.yar.set).toHaveBeenCalledWith(
        'selectedAnimalTypes',
        'Dog, Cat'
      )
      expect(request.yar.set).toHaveBeenCalledWith('selectedItems', '1,2')
    })

    it('should return an error when validation fails', async () => {
      request.method = 'post'
      request.payload = { selectedItems: '1,2' }

      validators.validateAnimalSelection.mockReturnValue('Validation Error') // Simulate a validation error

      await inspectionLengthController.handler(request, h)

      expect(h.view).toHaveBeenCalledWith(
        'inspectionLength/index',
        expect.objectContaining({
          error: 'Validation Error'
        })
      )
    })
  })

  describe('updateInspectionLengthController', () => {
    it('should handle post request and redirect on valid input', async () => {
      request.method = 'post'
      request.payload = {
        marshalling: '5',
        setup: '10',
        inspection: '15',
        cleanUp: '5',
        selectedItems: '1,2',
        selectedAnimalTypes: 'Dog, Cat'
      }

      validators.validateInspectionLength.mockReturnValue(null) // No validation error

      await updateInspectionLengthController.handler(request, h)

      expect(validators.validateInspectionLength).toHaveBeenCalledWith(
        '5',
        '10',
        '15',
        '5'
      )
      expect(request.yar.set).toHaveBeenCalledWith('marshalling', '5')
      expect(request.yar.set).toHaveBeenCalledWith('setup', '10')
      expect(h.redirect).toHaveBeenCalledWith('/confirmInspectionLength')
    })

    it('should handle errors and return the view with errors', async () => {
      request.method = 'post'
      request.payload = {
        marshalling: 'invalid',
        setup: '10',
        inspection: '15',
        cleanUp: '5'
      }

      validators.validateInspectionLength.mockReturnValue('Validation Error') // Simulate validation error

      await updateInspectionLengthController.handler(request, h)

      expect(h.view).toHaveBeenCalledWith(
        'inspectionLength/updateInspectionLength',
        expect.objectContaining({
          error: 'Validation Error',
          inputClass: 'govuk-input--width-5 govuk-input--error',
          formGroupClass: 'govuk-form-group govuk-form-group--error'
        })
      )
    })
  })

  describe('confirmInspectionLengthController', () => {
    it('should handle post request and redirect on successful update', async () => {
      request.method = 'post'
      request.payload = {
        marshalling: '5',
        setup: '10',
        inspection: '15',
        cleanUp: '5',
        selectedItems: '1,2'
      }
      request.yar.get
        .mockReturnValueOnce('5')
        .mockReturnValueOnce('10')
        .mockReturnValueOnce('15')
        .mockReturnValueOnce('5') // Mock return values for yar.get

      updateInspectionLength.mockResolvedValue({ response: { ok: true } }) // Simulate successful update

      await confirmInspectionLengthController.handler(request, h)

      expect(h.redirect).toHaveBeenCalledWith('inspectionLength')
    })

    it('should return an error when update fails', async () => {
      request.method = 'post'
      request.payload = {
        marshalling: '5',
        setup: '10',
        inspection: '15',
        cleanUp: '5',
        selectedItems: '1,2'
      }

      updateInspectionLength.mockResolvedValue({ response: { ok: false } }) // Simulate failed update

      await confirmInspectionLengthController.handler(request, h)

      expect(h.view).toHaveBeenCalledWith(
        'inspectionLength/confirmInspectionLength',
        expect.objectContaining({
          error: 'Failed to update the records.'
        })
      )
    })
  })
})
