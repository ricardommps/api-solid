import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Joana Foltz Gym',
      description: null,
      telefone: null,
      latitude: -27.4226683,
      longitude: -48.4050094,
    })

    await gymsRepository.create({
      title: 'Teste New Gym',
      description: null,
      telefone: null,
      latitude: -27.4226683,
      longitude: -48.4050094,
    })

    const { gyms } = await sut.execute({
      query: 'Joana',
      page: 1,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Joana Foltz Gym' }),
    ])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym Test ${i}`,
        description: null,
        telefone: null,
        latitude: -27.4226683,
        longitude: -48.4050094,
      })
    }
    const { gyms } = await sut.execute({
      query: 'Gym Test',
      page: 2,
    })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Gym Test 21' }),
      expect.objectContaining({ title: 'Gym Test 22' }),
    ])
  })
})
