import { cards } from '../card/cards_catalog.js';

export type Card = {
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

const slug_translator: Record<string, string> = {
    eau: "water",
    feu: "fire",
    mineral: "mineral",
    vegetal: "vegetal",
    arcane: "arcane",
    air: "air",
}

export function removeAccents(accented_string: string): string {
    return accented_string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function sanitize_string(unsanitized_string: string): string {
    return removeAccents(unsanitized_string).toLowerCase();
}

export function sanitize_element(unsanitized_element: string): string {
    let san = sanitize_string(unsanitized_element);
    if (Object.keys(slug_translator).includes(san)) {
        return slug_translator[san];
    } else {
        return san;
    }
}

export function load() {
    return { cards: cards , slug_translator: slug_translator };
}
