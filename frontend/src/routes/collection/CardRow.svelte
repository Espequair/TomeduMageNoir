<script lang="ts">
    let { card } = $props();
    import { sanitizeElement } from "$lib/utils.js";

    function insertIcons(str: string): string {
        const regexMap = {
            air: /\bair\b/gi,
            fire: /\bf(ire|eu)\b/gi,
            mineral: /\bmin(é|e)ral\b/gi,
            vegetal: /\b(v(égé|ege)tal)\b/gi,
            arcane: /\b(arcane)\b/gi,
            water: /\b(eau|water)\b/gi,
        };
        Object.entries(regexMap).forEach(([element, regex]) => {
            const pictStyle = "style='height: 1em; background: black; padding:5px;border-radius: 50%;'"
            str = str.replace(regex,"$&<img class='pict' " + pictStyle + " src='/pict/"+element+"_icon.png' alt='$&' />");
        });
        return str;
    }
</script>

<tr>
    <td>
        <div>
            <button
                class="take-all"
                type="button"
                onclick={() => console.log("toot")}
            >
                +
            </button>
        </div>
    </td>
    <td>
        <a
            href="https://magenoir.com/collection/FR/{sanitizeElement(
                card.element,
            )}/{card.slug}.html"
            target="_blank">{card.name}</a
        >
    </td>
    <td>
        {card.type}
        {card.subtype}
    </td>

    <td>
        {@html insertIcons(card.element)}
    </td>
    <td>
        <ul class="noBullets">
            {#each Object.entries(card.mana_cost).toSorted((f,s)=>(f[0].localeCompare(s[0]))) as [a, b]}
                <li>
                    {b}
                    {@html insertIcons(a)}
                </li>
            {/each}
        </ul>
    </td>
    <td>
        <ul class="noBullets">
            {#each Object.entries(card.components).toSorted((f,s)=>(f[0].localeCompare(s[0]))) as [a, b]}
                <li>
                    {b}
                    {a}
                </li>
            {/each}
        </ul>
    </td>
    <td class="preserve-linebreak">
        <b>{card.name}</b>
        <br />
        {@html insertIcons(card.effect)}
    </td>
</tr>
<style>
    .take-all {
        width: 100%; /* Make the button fill the width */
        height: 100%; /* Make the button fill the height */
        margin: 0; /* Remove extra margin */
        padding: 0; /* Remove default padding */
        display: block; /* Ensure the button behaves like a block element */
        box-sizing: border-box; /* Include borders and padding in the width/height */
    }
    .noBullets {
        list-style-type: none;
        /* Remove bullets */
        padding: 0;
        /* Remove padding */
        margin: 0;
        /* Remove margins */
    }
    td {
        border-left: 1px solid;
    }
    tr {
        /* Add a bottom border to all table rows */
        border-bottom: 2px solid #ddd;
    }

    tr:nth-child(odd) {
        /* Add a black */
        background-color: #deeafe;
    }

    tr:hover {
        /* Add a grey background color to the table header and on hover */
        background-color: #f1f1f1;
    }
    td.preserve-linebreak {
        white-space: pre-line;
    }
</style>
