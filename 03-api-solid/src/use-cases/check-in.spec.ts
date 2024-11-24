import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let checkInUseCase: CheckInUseCase;

describe("Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-01",
      title: "Javascript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    vi.isFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await checkInUseCase.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(() =>
      checkInUseCase.execute({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await checkInUseCase.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await checkInUseCase.execute({
      userId: "user-01",
      gymId: "gym-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(checkIn.id).toEqual(expect.any(String));
  });
});
