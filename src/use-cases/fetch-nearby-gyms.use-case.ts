import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms.repository.interface'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
  page: number
}

interface FetchNearbyGymsUserCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
    page,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUserCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      page,
    )

    return {
      gyms,
    }
  }
}
