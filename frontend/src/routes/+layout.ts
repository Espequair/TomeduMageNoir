export const prerender = true;
import plainCards from "$lib/assets/cards_catalog.json" with { type: "json" };
import { Decks, Card } from "$lib/Decks.svelte.js"

export async function load(args){
    let decks: Decks = new Decks();
    let cards = plainCards.map(card => new Card(card as Card))
    return { cards: cards, decks: decks};
}