export const prerender = true;
import cards from "$lib/assets/cards_catalog.json" with { type: "json" };
import { Decks, type Card } from "$lib/Decks.js"

export async function load(args){
    let decks: Decks = new Decks();
    return { cards: cards, decks: decks};
}