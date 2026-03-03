import { describe, expect, test } from "vitest";
import { heroApi } from "./hero.api";

const BASE_URL = import.meta.env.VITE_API_URL;

describe("Hero API", () => {
    test("should be configure pointing to the testing server", async () => {
        expect(heroApi).toBeDefined();
        expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
        expect(BASE_URL).contains('3001');
    });
});