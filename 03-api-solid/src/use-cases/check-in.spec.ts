import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";

describe("Check In Use Case", () => {
  it("should be able to register", async () => {
    const checkInsRepository = new InMemoryCheckInsRepository();
    const checkInUseCase = new CheckInUseCase(checkInsRepository);

    const { checkIn } = await checkInUseCase.execute({
      userId: "user-01",
      gymId: "gym-01",
    });

    await expect(checkIn.id).toEqual(expect.any(String));
  });
});
