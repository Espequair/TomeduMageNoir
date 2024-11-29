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
export class Decks {
    decks: Deck[] = $state([]);
    activeDeckNum: number = $state(0)
    activeDeck: Deck = $derived(this.decks[this.activeDeckNum])

    constructor() {
        this.activeDeckNum = 0
        this.decks=[new Deck()]
        /*
        if (typeof window !== 'undefined') {
            console.log("Loading: window found")
            let storedValue = localStorage.getItem('magenoir_deckbuilder');
            console.log("value of localstorage is " + storedValue)
            if (storedValue == null || storedValue == "undefined") {
                this.decks = [new Deck()]; // localstorage exists but no key
            } else {
                this.decks = JSON.parse(storedValue); // found a key
            }
        } else {
            console.log("Loading: window not found")
            this.decks = [new Deck()]; // localstorage does not exist
        }*/
    }

    saveDecksToLocalStorage() {
        /*
        if (typeof window !== 'undefined') {
            console.log("Saving: window found")
            console.log("value of localstorage is " + localStorage.getItem("magenoir_deckbuilder"))
            console.log("printing snapsot of deck " + $state.snapshot(this.decks))
            console.log("printing JSON of snapshot " + JSON.stringify($state.snapshot(this.decks)))
            localStorage.setItem("magenoir_deckbuilder", JSON.stringify(this.decks))
            console.log("value of localstorage is " + localStorage.getItem("magenoir_deckbuilder"))
        } else {
            alert("NO WINDOW");
        }*/
       alert("not implemented yet")
    }

    getDecksfromLocalStorage(): Deck[] {
        if (typeof window !== 'undefined') {
            let storedValue = localStorage.getItem('key') || 'default value';
            console.log("inside");
            return [new Deck()];
        }
        console.log("outside");
        return [new Deck()];
    }

    get list(): Deck[] {
        return this.decks;
    }

    pop() {
        this.decks.splice(this.activeDeckNum, 1)
    }

    push(deck: Deck) {
        this.decks.push(deck);
    }

}

export let decks: Decks = $state(new Decks());