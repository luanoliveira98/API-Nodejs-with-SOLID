import { expect, describe, it, beforeEach } from 'vitest'
import { CreateGymUseCase } from './create-gym.use-case'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'

describe('Create Gym Use Case', () => {
  let sut: CreateGymUseCase
  let gymsRepository: InMemoryGymsRepository

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -31.7493791,
      longitude: -52.4010805,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
