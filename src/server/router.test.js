// @ts-nocheck
import inert from '@hapi/inert'
import { router } from '~/src/server/router.js'
import { health } from '~/src/server/health/index.js'
import { home } from '~/src/server/home/index.js'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files.js'
import { about } from '~/src/server/about/index.js'
import { siteOperations } from '~/src/server/siteOperations/index.js'
import { shedOpeningTiming } from '~/src/server/shedOpeningTiming/index.js'

// Mocking the dependencies
jest.mock('@hapi/inert')
jest.mock('~/src/server/health/index.js')
jest.mock('~/src/server/home/index.js')
jest.mock('~/src/server/common/helpers/serve-static-files.js')
jest.mock('~/src/server/about/index.js')
jest.mock('~/src/server/siteOperations/index.js')
jest.mock('~/src/server/shedOpeningTiming/index.js')

describe('router plugin', () => {
  let server

  beforeEach(() => {
    // Mock server object with the register method
    server = {
      register: jest.fn().mockResolvedValue()
    }
  })

  afterEach(() => {
    jest.clearAllMocks() // Clear mock calls after each test
  })

  it('should register all routes and plugins correctly', async () => {
    // Call the register function of the router plugin
    await router.plugin.register(server)

    // Assert that the register function was called with the expected plugins
    expect(server.register).toHaveBeenCalledWith([inert])
    expect(server.register).toHaveBeenCalledWith([health])
    expect(server.register).toHaveBeenCalledWith([
      home,
      about,
      siteOperations,
      shedOpeningTiming
    ])
    expect(server.register).toHaveBeenCalledWith([serveStaticFiles])
  })

  it('should register the health-check route for platform monitoring', async () => {
    await router.plugin.register(server)

    // Ensure health route is registered
    expect(server.register).toHaveBeenCalledWith([health])
  })
})
