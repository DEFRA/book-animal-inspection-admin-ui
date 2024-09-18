import {
  shedOpeningTimingController,
  updateShedOpeningTimingController
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
          method: ['GET'],
          path: '/updateShedOpeningTiming',
          ...updateShedOpeningTimingController
        }
      ])
    }
  }
}
