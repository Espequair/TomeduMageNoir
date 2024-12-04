import { SvelteMap } from "svelte/reactivity";
import type { Card } from "./+page.js";
import { browser } from "$app/environment";

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
        if (browser) {
            let plainValue = localStorage.getItem('magenoir_deckbuilder');
            if (plainValue) {
                let plainObjects = JSON.parse(plainValue)
                let decks: Deck[] = []
                for (let plainDeck of plainObjects) {
                    let deck = new Deck(plainDeck.name)
                    for (let plainCard of plainDeck.cards) {
                        deck.cards.set(plainCard[0] as Card, plainCard[1])
                    }
                    decks.push(deck);
                }
                return decks;
            }
        }
        return [new Deck()];
    }

    get activeDeck() {

        return this.decks[this.activeDeckNum]
    }

    get list(): Deck[] {
        return this.decks;
    }

    saveDecksToLocalStorage() {
        if (browser) {
            const serializedDecks = this.decks.map(deck => deck.toJSON());
            localStorage.setItem("magenoir_deckbuilder", JSON.stringify(serializedDecks));
        } else {
            alert("NO WINDOW");
        }
    }

    pop() {
        if (this.decks.length > 1) {
            this.decks.splice(this.activeDeckNum, 1);
            this.activeDeckNum = Math.max(0, this.activeDeckNum - 1)
        } else {
            alert("Can't have less than one deck");
        }
    }

    push(deck: Deck) {
        this.decks.push(deck);
    }

}

export let decks: Decks = $state(new Decks());