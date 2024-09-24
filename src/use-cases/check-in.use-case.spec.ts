import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in.use-case'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins.repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms.repository'
import { MaxDistanceError } from './errors/max-distance.error'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins.error'

describe('Check-in Use Case', () => {
  let sut: CheckInUseCase
  let checkInsRepository: InMemoryCheckInsRepository
  let gymsRepository: InMemoryGymsRepository

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: -31.7622969,
      longitude: -52.3294118,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -31.7622969,
      userLongitude: -52.3294118,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -31.7622969,
      userLongitude: -52.3294118,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -31.7622969,
        userLongitude: -52.3294118,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -31.7622969,
      userLongitude: -52.3294118,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -31.7622969,
      userLongitude: -52.3294118,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    await gymsRepository.create({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: -31.7493791,
      longitude: -52.4010805,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -31.7622969,
        userLongitude: -52.3294118,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
