import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let GymsRepository: InMemoryGymsRepository;
let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    GymsRepository = new InMemoryGymsRepository();
    fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(GymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await GymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: 30.3076877,
      longitude: -98.0675685,
    });

    await GymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: 64.8283558,
      longitude: -147.8248821,
    });

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: 30.3076877,
      userLongitude: -98.0675685,
    });

    await expect(gyms).toHaveLength(1);
    await expect(gyms).toEqual([
      await expect.objectContaining({ title: "Near Gym" }),
    ]);
  });
});
