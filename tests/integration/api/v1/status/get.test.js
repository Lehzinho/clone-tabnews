import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");

      expect(response.status).toBe(200);

      const respoonseBody = await response.json();

      const parseUpdatedAt = new Date(respoonseBody.updated_at).toISOString();
      expect(respoonseBody.updated_at).toEqual(parseUpdatedAt);
      expect(respoonseBody.dependencies.database.version).toEqual("16.0");
      expect(respoonseBody.dependencies.database.max_connections).toEqual(100);
      expect(respoonseBody.dependencies.database.opened_connections).toEqual(1);
    });
  });
});
