import { describe, it, expect } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    const password = "123456";

    await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: await hash(password, 6),
    });

    const { user } = await authenticateUseCase.execute({
      email: "john.doe@example.com",
      password: password,
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
