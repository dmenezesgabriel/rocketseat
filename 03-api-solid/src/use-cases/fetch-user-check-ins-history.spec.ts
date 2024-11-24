import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let fetchUserCheckInsHistoryUseCase: FetchUserCheckInsHistoryUseCase;

describe("Fetch User Check-In History Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(
      checkInsRepository,
    );
  });

  it("should be able to fetch check-in history", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      userId: "user-01",
      page: 1,
    });

    await expect(checkIns).toHaveLength(2);
    await expect(checkIns).toEqual([
      await expect.objectContaining({ gym_id: "gym-01" }),
      await expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("should be able to fetch paginated user check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
      userId: "user-01",
      page: 2,
    });

    await expect(checkIns).toHaveLength(2);
    await expect(checkIns).toEqual([
      await expect.objectContaining({ gym_id: "gym-21" }),
      await expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
