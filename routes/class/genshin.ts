import { Context } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { drawElements, randInt } from "../../utils.ts";
import characters from "../../data/characters.js";
import weapons from "../../data/weapons.js";

function drawTenCards() {
    const charactersNumber = randInt(0,11);
    const weaponsNumber = 10 - charactersNumber;
    const drawnCharacters = drawElements(characters, charactersNumber).map(character => ({
        name: character,
        src: `/static/images/characters/${character}.png`
    }));
    const drawnWeapons = drawElements(weapons, weaponsNumber)
    .map(weapon => ({
        name: weapon.name,
        src: `/static/images/weapons/${weapon.src}`
    }));
    return [
        ...drawnCharacters,
        ...drawnWeapons
    ];
}

function genshin(context: Context, _next: () => Promise<unknown>) {
    context.response.body = drawTenCards();
}

export default genshin;
