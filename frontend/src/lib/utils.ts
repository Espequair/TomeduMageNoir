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

export function insertIcons(str: string): string {
    return str;
    const regexMap = {
        air: /\bair\b/gi,
        fire: /\bf(ire|eu)\b/gi,
        mineral: /\bmin(é|e)ral\b/gi,
        vegetal: /\b(v(égé|ege)tal)\b/gi,
        arcane: /\b(arcane)\b/gi,
        water: /\b(eau|water)\b/gi,
    };
    Object.entries(regexMap).forEach(([element, regex]) => {
        const pictStyle =
            "style='height: 1em; background: black; padding:5px;border-radius: 50%;'";
        str = str.replace(
            regex,
            "$&<img class='pict' " +
                pictStyle +
                " src='/pict/" +
                element +
                "_icon.png' alt='$&' />",
        );
    });
    return str;
}

export function pickRandomItems<T>(array: T[], x: number): T[] {
    if (x > array.length) {
        throw new Error("Cannot pick more items than are in the array");
    }

    const shuffled = array.slice(); // Create a shallow copy to avoid modifying the original array
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Pick a random index
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }

    return shuffled.slice(0, x); // Take the first `x` items
}