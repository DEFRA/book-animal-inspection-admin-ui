import {
  inspectionLengthController,
  updateInspectionLengthController,
  confirmInspectionLengthController
} from '~/src/server/inspectionLength/controller.js'

export const inspectionLength = {
  plugin: {
    name: 'inspectionLength',
    register(server) {
      server.route([
        {
          method: ['GET', 'POST'],
          path: '/inspectionLength',
          ...inspectionLengthController
        },
        {
          method: ['GET', 'POST'],
          path: '/updateInspectionLength',
          ...updateInspectionLengthController
        },
        {
          method: ['GET', 'POST'],
          path: '/confirmInspectionLength',
          ...confirmInspectionLengthController
        }
      ])
    }
  }
}
