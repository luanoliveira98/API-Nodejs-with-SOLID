import { FastifyInstance } from 'fastify'
import { registerController } from './register.controller'
import { authenticateController } from './authenticate.controller'
import { profileController } from './profile.controller'
import { verifyJwtMiddleware } from '@/http/middlewares/verify-jwt.middleware'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)

  app.post('/sessions', authenticateController)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwtMiddleware] }, profileController)
}
