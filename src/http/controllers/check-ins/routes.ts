import { verifyJwtMiddleware } from '@/http/middlewares/verify-jwt.middleware'
import { FastifyInstance } from 'fastify'
import { createController } from './create.controller'
import { validateController } from './validate.controller'
import { historyController } from './history.controller'
import { metricsController } from './metrics.controller'
import { verifyUserRoleMiddleware } from '@/http/middlewares/verify-user-role.middleware'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwtMiddleware)

  app.get('/check-ins/history', historyController)
  app.get('/check-ins/metrics', metricsController)

  app.post('/gyms/:gymId/check-ins', createController)

  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRoleMiddleware('ADMIN')] },
    validateController,
  )
}
