import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms.use-case'

describe('Fetch Nearby Gyms Use Case', () => {
  let sut: FetchNearbyGymsUseCase
  let gymsRepository: InMemoryGymsRepository

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -31.7622969,
      longitude: -52.3294118,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -31.7634007,
      longitude: -52.4814824,
    })

    const { gyms } = await sut.execute({
      userLatitude: -31.7622969,
      userLongitude: -52.3294118,
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Near Gym ${i}`,
        latitude: -31.7622969,
        longitude: -52.3294118,
      })
    }

    const { gyms } = await sut.execute({
      userLatitude: -31.7622969,
      userLongitude: -52.3294118,
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Near Gym 21' }),
      expect.objectContaining({ title: 'Near Gym 22' }),
    ])
  })
})
