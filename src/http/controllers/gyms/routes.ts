import { verifyJwtMiddleware } from '@/http/middlewares/verify-jwt.middleware'
import { FastifyInstance } from 'fastify'
import { createController } from './create.controller'
import { searchController } from './search.controller'
import { nearbyController } from './nearby.controller'
import { verifyUserRoleMiddleware } from '@/http/middlewares/verify-user-role.middleware'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwtMiddleware)

  app.get('/gyms/search', searchController)
  app.get('/gyms/nearby', nearbyController)

  app.post(
    '/gyms',
    { onRequest: [verifyUserRoleMiddleware('ADMIN')] },
    createController,
  )
}
