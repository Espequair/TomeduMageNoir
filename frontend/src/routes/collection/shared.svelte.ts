import type { Card } from "./+page.js";

export class Deck {
    name: string;
    cards: Map<Card, number>;

    constructor(name: string | null = null) {
        this.name = name == null ? "New deck" : name;
        this.cards = new Map<Card, number>();
    }

    get length() {
        return this.cards.size;
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
export const activeDeck = $state(
    {
        cards: [],
        name: "New Deck"
    });

