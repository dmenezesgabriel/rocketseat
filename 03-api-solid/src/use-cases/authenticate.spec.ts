import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./error/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
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

    await expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: "john.doe@example.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const password = "123456";

    await usersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: await hash(password, 6),
    });

    await expect(() =>
      authenticateUseCase.execute({
        email: "john.doe@example.com",
        password: "123123",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
