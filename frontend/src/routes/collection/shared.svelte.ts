import { SvelteMap } from "svelte/reactivity";
import type { Card } from "./+page.js";

export class Deck {
    name: string;
    cards: SvelteMap<Card, number>;

    constructor(name: string | null = null) {
        this.name = name == null ? "New deck" : name;
        this.cards = new SvelteMap<Card, number>();
    }

    getCardCount() {
        return [...this.cards.entries()].reduce((acc, curr) => (acc + curr[1]), 0)
    }

    getAllcards() {
        return [...this.cards].toSorted((a, b) => a[0].name.localeCompare(b[0].name));
    }

    delCard(card: Card) {
        this.cards.delete(card);
    }

    modCard(card: Card, diff: number) {
        let cardCount: number | undefined = this.cards.get(card);
        if (cardCount == undefined) {
            this.cards.set(card, 1);
            return;
        }
        this.cards.set(card, Math.min(Math.max(cardCount + diff, 0), 4));
    }
}
export const activeDeck = $state(new Deck());