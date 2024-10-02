import { verifyJwtMiddleware } from '@/http/middlewares/verify-jwt.middleware'
import { FastifyInstance } from 'fastify'
import { createGymController } from './create-gym.controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwtMiddleware)

  app.post('/gyms', createGymController)
}
