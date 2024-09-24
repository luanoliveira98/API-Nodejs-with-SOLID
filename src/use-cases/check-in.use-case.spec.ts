import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInUseCase } from './check-in.use-case'
import { CheckInsRepository } from '@/repositories/check-ins.repository.interface'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'

describe('Check-in Use Case', () => {
  let sut: CheckInUseCase
  let checkInsRepository: CheckInsRepository

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
