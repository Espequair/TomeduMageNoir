import { SvelteMap } from "svelte/reactivity";
import { browser } from "$app/environment";
import { sanitizeString } from "./utils.js";

export type Card = {
    transmutables: string;
    full_name: string;
    slug: string,
    mn_image_link: string,
    language: string,
    competitive_limit: number,
    other_languages: object,
    name: string,
    element: string,
    type: string,
    subtype: string,
    lifepoints: number | string | null,
    mana_cost: Record<string, string | number | undefined>,
    components: Record<string, string | number | undefined>,
    effect: string,
    illustration: string,
    flavor_text: string,
    extension: string
    notes: string[],
}

export class Deck {
    uuid: string;
    name: string = $state("");
    cards: SvelteMap<Card, number>;

    // Const
    constructor(name?: string, cards?: any) {
        this.uuid = crypto.randomUUID();
        this.name = name || "New deck";
        this.cards = new SvelteMap<Card, number>(cards?.map(([card, count]: [Card, number]) => [card as Card, count]))
    }

    getCardCount() {
        return [...this.cards.entries()].reduce((acc, curr) => (acc + curr[1]), 0)
    }

    getAllcards() {
        return [...this.cards].toSorted((a, b) => a[0].name.localeCompare(b[0].name));
    }
    
    get cardList() {
        let ret: Card[] = [];
        [...this.cards].map(([card, count])=>{for (let x = 0; x < count; x++) {ret.push(card)}})
        return ret;
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
            cards: Array.from(this.cards.entries()),
            uuid: this.uuid,
        };
    }
    get exportableDecklist() {
        let exp: string = "";
        for (let cardTuple of this.getAllcards()) {
            let [card, count]: [Card, number] = cardTuple;
            exp += count + " " + sanitizeString(card.name) + "\n";
        }
        return exp;
    }
}

export class Decks {
    decks: Deck[] = $state([]);
    activeDeckNum = $state(0);

    constructor() {
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
        this.decks.push(deck); //if no new deck was given, put an empty one
    }

    addNewEmptyDeck(){
        this.decks.push(new Deck())
        this.activeDeckNum = this.decks.length - 1
    }

}