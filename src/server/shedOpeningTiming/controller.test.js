// @ts-nocheck

import {
  shedOpeningTimingController,
  updateShedOpeningTimingController
} from '~/src/server/shedOpeningTiming/controller.js'
import { getShedOpeningTiming } from '~/src/server/shedOpeningTiming/helpers/database/get-shed-opening-timing.js'
import { validators } from '~/src/server/common/validations/validations.js'

jest.mock(
  '~/src/server/shedOpeningTiming/helpers/database/get-shed-opening-timing.js'
)
jest.mock('~/src/server/common/validations/validations.js')

describe('shedOpeningTimingController', () => {
  let h

  beforeEach(() => {
    // Mock response toolkit (h) for Hapi
    h = {
      view: jest.fn().mockReturnValue('rendered view')
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the correct view with formatted data', async () => {
    // Mock data returned by getShedOpeningTiming
    getShedOpeningTiming.mockResolvedValue([
      {
        ShedId: 1,
        ShedName: 'Shed 1',
        Day: 'Monday',
        From: '08:00',
        To: '17:00',
        _id: '1'
      },
      {
        ShedId: 1,
        ShedName: 'Shed 1',
        Day: 'Tuesday',
        From: '08:00',
        To: '17:00',
        _id: '2'
      }
    ])

    const request = {} // Mock request object

    const result = await shedOpeningTimingController.handler(request, h)

    // Ensure the correct data is passed to the view
    expect(h.view).toHaveBeenCalledWith('shedOpeningTiming/index', {
      pageTitle: 'Shed Opening Timing',
      heading: 'SehdOpeningTiming',
      shedOpeningTimingData: [
        {
          shedName: 'Shed 1',
          shedOpeningRows: [
            [
              { text: 'Monday' },
              { text: '08:00 to 17:00' },
              {
                html: '<a href="updateShedOpeningTiming?_id=1&From=08:00&To=17:00&Day=Monday&Shedname=Shed 1">Change</a>'
              }
            ],
            [
              { text: 'Tuesday' },
              { text: '08:00 to 17:00' },
              {
                html: '<a href="updateShedOpeningTiming?_id=2&From=08:00&To=17:00&Day=Tuesday&Shedname=Shed 1">Change</a>'
              }
            ]
          ]
        }
      ],
      backUrl: 'siteOperations'
    })

    expect(result).toBe('rendered view')
  })
})

describe('updateShedOpeningTimingController', () => {
  let h

  beforeEach(() => {
    // Mock response toolkit (h) for Hapi
    h = {
      view: jest.fn().mockReturnValue('rendered view'),
      redirect: jest.fn()
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the update view with correct data (GET request)', () => {
    const request = {
      method: 'get',
      query: {
        id: '1',
        From: '08:00',
        To: '17:00',
        Day: 'Monday',
        Shedname: 'Shed 1'
      }
    }

    const result = updateShedOpeningTimingController.handler(request, h)

    expect(h.view).toHaveBeenCalledWith(
      'shedOpeningTiming/updateShedOpeningTiming',
      {
        pageTitle: 'Shed Opening Timing',
        heading: 'shedOpeningTiming',
        id: '1',
        from: '08:00',
        to: '17:00',
        day: 'Monday',
        shedName: 'Shed 1',
        backUrl: 'shedOpeningTiming',
        error: null
      }
    )

    expect(result).toBe('rendered view')
  })

  it('should validate and redirect on valid POST request', () => {
    const request = {
      method: 'post',
      payload: {
        From: '08:00',
        To: '17:00'
      }
    }

    // No validation error
    validators.validateTime.mockReturnValue(null)

    const result = updateShedOpeningTimingController.handler(request, h)

    expect(validators.validateTime).toHaveBeenCalledWith('08:00', '17:00')
    expect(h.redirect).toHaveBeenCalledWith('/inspectionDate')
    expect(result).toBeUndefined()
  })

  it('should render the update view with validation error on invalid POST request', () => {
    const request = {
      method: 'post',
      payload: {
        From: '17:00',
        To: '08:00'
      }
    }

    // Return a validation error
    validators.validateTime.mockReturnValue('Invalid time range')

    const result = updateShedOpeningTimingController.handler(request, h)

    expect(validators.validateTime).toHaveBeenCalledWith('17:00', '08:00')
    expect(h.view).toHaveBeenCalledWith(
      'shedOpeningTiming/updateShedOpeningTiming',
      {
        pageTitle: 'Shed Opening Timing',
        heading: 'shedOpeningTiming',
        id: undefined,
        from: '17:00',
        to: '08:00',
        day: undefined,
        shedName: undefined,
        backUrl: 'shedOpeningTiming',
        error: 'Invalid time range'
      }
    )

    expect(result).toBe('rendered view')
  })
})
