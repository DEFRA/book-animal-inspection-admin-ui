import {
  shedOpeningTimingController,
  updateShedOpeningTimingController,
  confirmShedOpeningTimingController
} from '~/src/server/shedOpeningTiming/controller.js'

export const shedOpeningTiming = {
  plugin: {
    name: 'shedOpeningTiming',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/shedOpeningTiming',
          ...shedOpeningTimingController
        },
        {
          method: ['GET', 'POST'],
          path: '/updateShedOpeningTiming',
          ...updateShedOpeningTimingController
        },
        {
          method: ['GET', 'POST'],
          path: '/confirmShedOpeningTiming',
          ...confirmShedOpeningTimingController
        }
      ])
    }
  }
}
