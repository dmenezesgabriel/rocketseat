import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby Gyms  (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "Some description",
        phone: "11999999999",
        latitude: 30.3076877,
        longitude: -98.0675685,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Typescript Gym",
        description: "Some description",
        phone: "11999999999",
        latitude: 64.8283558,
        longitude: -147.8248821,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        latitude: 30.3076877,
        longitude: -98.0675685,
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    await expect(response.statusCode).toEqual(200);
    await expect(response.body.gyms).toHaveLength(1);
    await expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Javascript Gym",
      }),
    ]);
  });
});
