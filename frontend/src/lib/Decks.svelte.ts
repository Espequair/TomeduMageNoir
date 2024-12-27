import { SvelteMap } from "svelte/reactivity";
import { browser } from "$app/environment";
import { sanitizeString } from "./utils.js";

export class Card {
    transmutables!: string;
    full_name!: string;
    slug!: string;
    mn_image_link!: string;
    language!: string;
    competitive_limit!: number;
    other_languages!: object;
    name!: string;
    element!: string;
    type!: string;
    subtype!: string;
    lifepoints!: number | string | null;
    mana_cost: SvelteMap<string, string | number>;
    components: SvelteMap<string, string | number>;
    effect!: string;
    illustration!: string;
    flavor_text!: string;
    extension!: string;
    notes!: string[];

    constructor(init: Card) {
        Object.assign(this, init);

        // Ensure mana_cost and components are SvelteMaps
        this.mana_cost = new SvelteMap(Object.entries(init.mana_cost || {}));
        this.components = new SvelteMap(Object.entries(init.components || {}));
    }
    toJSON() {
        return {
            ...this,
            mana_cost: Object.fromEntries(this.mana_cost.entries()),
            components: Object.fromEntries(this.components.entries())
        };
    }


}

export class Deck {
    static fromPlainObject(plainDeck: Partial<Deck>) {
        return new Deck(plainDeck.name, plainDeck.cards, plainDeck.uuid)
    }

    uuid: string;
    name: string = $state("");
    cards: SvelteMap<Card, number>;

    // Const
    constructor(name?: string, cards?: any, uuid?: string) {
        this.uuid = uuid || crypto.randomUUID();
        this.name = name || "New deck";
        this.cards = new SvelteMap<Card, number>(cards?.map(([card, count]: [Card, number]) => [new Card(card), count]))
    }

    getCardCount() {
        return [...this.cards.entries()].reduce((acc, curr) => (acc + curr[1]), 0)
    }

    getAllcards() {
        return [...this.cards].toSorted((a, b) => a[0].name.localeCompare(b[0].name));
    }

    get cardList() {
        let ret: Card[] = [];
        [...this.cards].map(([card, count]) => { for (let x = 0; x < count; x++) { ret.push(card) } })
        return ret;
    }

    get componentsHelper() : Map<string, [number, number]> {
        // Returns ["component": [needed, inDeck]]
        const ret: Map<string, [number, number]> = new Map();

        // Initialize components in the map with [0, 0]
        // We do this because we have to know what components are in the deck before we check the full name
        // console.log(this.cardList)
        for (const card of this.cardList) {
            for (const component of card.components.keys()) {
                if (!ret.has(component)) {
                    ret.set(component, [0, 0]);
                }
            }
        }

        // Update the map with needed and inDeck counts
        for (const card of this.cardList) {
            // Increment "inDeck" count for matching components
            for (const [component, counts] of ret.entries()) {
                if (card.full_name.toLowerCase().includes(component.toLowerCase())) {
                    counts[1] += 1; // Increment inDeck
                }
            }

            // Increment "needed" count based on card's components
            for (const [component, componentCount] of card.components.entries()) {
                if (typeof componentCount === "number") {
                    const counts = ret.get(component) || [0, 0];
                    counts[0] += componentCount; // Increment needed
                    ret.set(component, counts);
                }
            }
        }
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
        // console.log("printing deck as i save")
        // console.log([...this.cards.entries()])
        return {
            name: this.name,
            cards: [...this.cards.entries()].map(([card, count]) => [card.toJSON(), count]),
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
        return plainObjects.map((plainDeck: any) => Deck.fromPlainObject(plainDeck));

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

    addNewEmptyDeck() {
        this.decks.push(new Deck())
        this.activeDeckNum = this.decks.length - 1
    }

}