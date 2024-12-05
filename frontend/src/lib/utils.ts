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