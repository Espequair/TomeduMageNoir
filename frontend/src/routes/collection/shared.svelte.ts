import { SvelteMap } from "svelte/reactivity";
import type { Card } from "./+page.js";

export class Deck {
    name: string;
    cards: SvelteMap<Card, number>;

    constructor(name: string | null = null) {
        this.name = name == null ? "New deck" : name;
        this.cards = new SvelteMap<Card, number>();
    }

    get length() {
        return this.cards.size;
    }

    getAllcards(){
        return this.cards.entries();
    } 

    delCard(card: Card){
        this.cards.delete(card);
    }

    modCard(card: Card, diff: number) {
        let cardCount: number | undefined = this.cards.get(card);
        if (cardCount == undefined) {
            this.cards.set(card, 1);
            return;
        }
        this.cards.set(card, cardCount + diff);
    }
}
export const activeDeck = $state(new Deck());