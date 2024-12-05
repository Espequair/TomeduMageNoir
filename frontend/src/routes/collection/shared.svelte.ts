import { SvelteMap } from "svelte/reactivity";
import type { Card } from "./+page.js";
import { browser } from "$app/environment";

export class Deck {
    name: string;
    cards: SvelteMap<Card, number>;

    // Const
    constructor(name?: string, cards?: any) {
        this.name = name || "New deck";
        this.cards = new SvelteMap<Card, number>(cards?.map(([card, count]: [Card, number]) => [card as Card, count]))
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
    toJSON() {
        return {
            name: this.name,
            cards: Array.from(this.cards.entries())
        };
    }
}
export class Decks {
    decks: Deck[];
    activeDeckNum: number;

    constructor() {
        this.activeDeckNum = 0
        this.decks = Decks.getDecksfromLocalStorage()
    }

    static getDecksfromLocalStorage(): Deck[] {
        // If we're not in a browser environment, return a new Decklist
        if (!browser) return [new Deck()];

        const plainValue = localStorage.getItem('magenoir_deckbuilder');
        // If nothing is stored in the
        if (!plainValue) return [new Deck()];

        const plainObjects = JSON.parse(plainValue);
        // This one is rough. We're taking a JSON Object and converting it back to a Deck[] format
        return plainObjects.map((plainDeck: any) => {
            const deck = new Deck(plainDeck.name);
            deck.cards = new SvelteMap(plainDeck.cards.map(([card, count]: [Card, number]) => [card as Card, count]));
            return deck;
        });
    }

    get activeDeck() {

        return this.decks[this.activeDeckNum]
    }

    get list(): Deck[] {
        return this.decks;
    }

    saveDecksToLocalStorage() {
        if (!browser) return alert("NO WINDOW");

        const serializedDecks = this.decks.map(deck => deck.toJSON());
        localStorage.setItem("magenoir_deckbuilder", JSON.stringify(serializedDecks));
    }

    pop() {
        if (this.decks.length > 1) {
            this.decks.splice(this.activeDeckNum, 1);
            this.activeDeckNum = Math.min(this.decks.length - 1, this.activeDeckNum)
        } else {
            alert("Can't have less than one deck");
        }
    }

    push(deck: Deck) {
        this.decks.push(deck);
        this.activeDeckNum = this.decks.length - 1;
    }

}

export let decks: Decks = $state(new Decks());