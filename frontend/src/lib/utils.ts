export const slug_translator: Record<string, string> = {
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

export function sanitizeString(unsanitized_string: string): string {
    return removeAccents(unsanitized_string).toLowerCase();
}

export function sanitizeElement(unsanitized_element: string): string {
    let san = sanitizeString(unsanitized_element);
    if (Object.keys(slug_translator).includes(san)) {
        return slug_translator[san];
    } else {
        return san;
    }
}