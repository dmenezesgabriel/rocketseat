import { describe, it, expect, beforeEach } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let GymsRepository: InMemoryGymsRepository;
let searchGymsUseCase: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    GymsRepository = new InMemoryGymsRepository();
    searchGymsUseCase = new SearchGymsUseCase(GymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await GymsRepository.create({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    await GymsRepository.create({
      title: "Typescript Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    const { gyms } = await searchGymsUseCase.execute({
      query: "Javascript",
      page: 1,
    });

    await expect(gyms).toHaveLength(1);
    await expect(gyms).toEqual([
      await expect.objectContaining({ title: "Javascript Gym" }),
    ]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await GymsRepository.create({
        title: `Javascript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });
    }

    const { gyms } = await searchGymsUseCase.execute({
      query: "Javascript",
      page: 2,
    });

    await expect(gyms).toHaveLength(2);
    await expect(gyms).toEqual([
      await expect.objectContaining({ title: "Javascript Gym 21" }),
      await expect.objectContaining({ title: "Javascript Gym 22" }),
    ]);
  });
});
