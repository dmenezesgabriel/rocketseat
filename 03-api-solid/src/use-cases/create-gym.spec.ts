import { describe, it, expect, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    createGymUseCase = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create a gym", async () => {
    const { gym } = await createGymUseCase.execute({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    });

    await expect(gym.id).toEqual(expect.any(String));
  });
});
