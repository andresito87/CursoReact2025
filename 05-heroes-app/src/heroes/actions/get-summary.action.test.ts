import { describe, expect, test } from "vitest";
import { getSummaryAction } from "./get-summary.action";

describe('getSummaryAction', () => {

    test('should fetch summary and return complete information', async () => {

        const summary = await getSummaryAction();
        console.log({ summary });

        expect(summary).toStrictEqual({
            "heroCount": expect.any(Number),
            "smartestHero": expect.objectContaining({
                "alias": expect.any(String),
                "category": expect.any(String),
                "description": expect.any(String),
                "durability": expect.any(Number),
                "firstAppearance": expect.any(String),
                "id": expect.any(String),
                "image": expect.any(String),
                "intelligence": expect.any(Number),
                "name": expect.any(String),
                "powers": expect.any(Array),
                "slug": expect.any(String),
                "speed": expect.any(Number),
                "status": expect.any(String),
                "strength": expect.any(Number),
                "team": expect.any(String),
                "universe": expect.any(String),
            }),
            "strongestHero": expect.objectContaining({
                "alias": expect.any(String),
                "category": expect.any(String),
                "description": expect.any(String),
                "durability": expect.any(Number),
                "firstAppearance": expect.any(String),
                "id": expect.any(String),
                "image": expect.any(String),
                "intelligence": expect.any(Number),
                "name": expect.any(String),
                "powers": expect.any(Array),
                "slug": expect.any(String),
                "speed": expect.any(Number),
                "status": expect.any(String),
                "strength": expect.any(Number),
                "team": expect.any(String),
                "universe": expect.any(String),
            }),
            "totalHeroes": expect.any(Number),
            "villainCount": expect.any(Number),
        });

    });

});