import { describe, expect, test } from "vitest";
import { getHero } from "./get-hero.action";

describe('getHeroAction', () => {

    test('should fetch hero data and return with complete image url', async () => {

        const result = await getHero('clark-kent');

        expect(result.image).toBe('http://localhost:3001/images/1.jpeg');

    });

    test('should throw an error if hero is not found', async () => {
        const idSlug = 'clark-kent2';

        const result = await getHero(idSlug).catch((error) => {

            expect(error).toBeDefined();
            expect(error.message).toBe('Request failed with status code 404');

        });

        expect(result).toBeUndefined();
    });

});