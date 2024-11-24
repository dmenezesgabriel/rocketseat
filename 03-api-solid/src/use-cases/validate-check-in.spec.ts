import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./error/resource-not-found-error";
import { LateCheckInValidationError } from "./error/late-check-in-validation-error";

let checkInsRepository: InMemoryCheckInsRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe("Check-In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    });

    await expect(checkIn.validated_at).toEqual(expect.any(Date));
    await expect(checkInsRepository.items[0].validated_at).toEqual(
      expect.any(Date),
    );
  });

  it("should not be able to validate an inexistent check-in", async () => {
    expect(
      async () =>
        await validateCheckInUseCase.execute({
          checkInId: "inexistent-check-in-id",
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able to validate the check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 13, 40)); // utc

    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    await expect(
      async () =>
        await validateCheckInUseCase.execute({
          checkInId: createdCheckIn.id,
        }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
