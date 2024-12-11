export const prerender = true;
import plainCards from "$lib/assets/cards_catalog.json" with { type: "json" };
import { Decks, Card, CardCatalog} from "$lib/Decks.svelte.js"

export async function load(args){
    await CardCatalog.loadCards()
    let decks: Decks = new Decks();
    let cards = plainCards.map(plainCard => new Card(plainCard as Card))
    return { cards: cards, decks: decks};
}