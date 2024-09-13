import { siteOperationsController } from '~/src/server/siteOperations/controller.js'

export const siteOperations = {
  plugin: {
    name: 'siteOperations',
    register(server) {
      server.route([
        {
          method: 'GET',
          path: '/siteOperations',
          ...siteOperationsController
        }
      ])
    }
  }
}
