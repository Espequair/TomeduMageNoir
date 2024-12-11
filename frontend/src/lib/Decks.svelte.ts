import { SvelteMap } from "svelte/reactivity";
import { browser } from "$app/environment";
import { sanitizeString } from "./utils.js";

export class CardCatalog {
    static catalog: Map<string, Card> = new Map();

    static async loadCards(): Promise<void> {
        const cards = await fetch("./assets.cards_catalog.json").then((res) => res.json());
        cards.forEach((cardData: any) => {
            const card = new Card(cardData);
            this.catalog.set(card.slug, card);
        });
    }

    static getCard(slug: string): Card | undefined {
        return this.catalog.get(slug);
    }
}

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

    static fromName(slug: string) {
        return CardCatalog.getCard(slug)
    }
}

export class Deck {
    name: string = $state("");
    cards: SvelteMap<string, [Card, number]>;
    uuid: string;

    // Const
    constructor(name?: string, cards?: any, uuid?: string) {
        this.uuid = uuid || crypto.randomUUID();
        this.name = name || "New deck";
        this.cards = new SvelteMap(cards?.map(([slug, count]: [string, number]) => [slug, [Card.fromName(slug), count]]))
        console.log("deck " + this.name)
        console.log(this.cards)
    }

    static fromPlainObject(plainDeck: Partial<Deck>) {
        return new Deck(plainDeck.name, plainDeck.cards, plainDeck.uuid)
    }

    getCardCount() {
        return [...this.cards.entries()].reduce((acc, curr) => (acc + curr[1][1]), 0)
    }

    getAllcards() {
        return [...this.cards].toSorted((a, b) => a[1][0].name.localeCompare(b[1][0].name));
    }

    get cardList() {
        let ret: Card[] = [];
        [...this.cards].map(([card, [number, count]]) => { for (let x = 0; x < count; x++) { ret.push(number) } })
        return ret;
    }

    get componentsHelper() {
        // Returns {"component": [needed, inDeck]}
        const ret: Map<string, [number, number]> = new Map();

        // Initialize components in the map with [0, 0]
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
                if (card.name.toLowerCase().includes(component.toLowerCase())) {
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
        this.cards.delete(card.name);
    }

    modCard(card: Card, diff: number) {
        let foundTuple = this.cards.get(card.slug);
        if (foundTuple == undefined) {
            this.cards.set(card.slug, [card, 1]);
            return;
        }
        this.cards.set(card.slug, [card, Math.min(Math.max(foundTuple[1] + diff, 0), 4)]);
    }
    toJSON() {
        return {
            name: this.name,
            cards: Array.from(this.cards.entries()).map(([slug, [card, count]]) => [slug, count]),
            uuid: this.uuid,
        };
    }
    get exportableDecklist() {
        let exp: string = "";
        for (let cardTuple of this.getAllcards()) {
            let [slug, [card, count]]: [string, [Card, number]] = cardTuple;
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
        console.log("plainObjects")
        console.log(plainObjects)
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