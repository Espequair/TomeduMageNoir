<script lang="ts">
    import { page } from "$app/stores";
    let data = $props();
    let card = $derived(data.card);
    let decks = $page.data.decks
    import { sanitizeElement, insertIcons } from "$lib/utils.js";
</script>

<tr>
    <td class="add-card">
        <button
            class="take-all"
            type="button"
            onclick={() => decks.activeDeck.modCard(card, 1)}
        >
            +
        </button>
    </td>
    <td class="name">
        <a
            href="https://magenoir.com/collection/FR/{sanitizeElement(
                card.element,
            )}/{card.slug}.html"
            target="_blank"
            >{card.name}<span class="dont-show">{card.transmutables}</span></a
        >
    </td>
    <td class="type">
        {card.type}
        {card.subtype}
        {#if card.type == "Permanent" && card.lifepoints !== null}
            <br />
            PV : {card.lifepoints}
        {/if}
    </td>

    <td class="element">
        {@html insertIcons(card.element)}
    </td>
    <td class="mana-cost">
        <ul class="noBullets">
            {#each Object.entries(card.mana_cost).toSorted( (f, s) => f[0].localeCompare(s[0]), ) as [a, b]}
                <li>
                    {b}
                    {@html insertIcons(a)}
                </li>
            {/each}
        </ul>
    </td>
    <td class="components">
        <ul class="noBullets">
            {#each Object.entries(card.components).toSorted( (f, s) => f[0].localeCompare(s[0]), ) as [a, b]}
                <li>
                    {b}
                    {a}
                </li>
            {/each}
        </ul>
    </td>
    <td class="effect preserve-linebreak">
        {@html insertIcons(card.effect)}
    </td>
</tr>

<style>
    td.name a {
        display: block;
        text-transform: lowercase;
    }
    td.name a::first-letter {
        text-transform: capitalize;
    }
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
        padding: 0; /* Remove default cell padding */
    }

    tr {
        /* Add a bottom border to all table rows */
        border-bottom: 2px solid #ddd;
    }
    @media (hover: hover) {
        .dont-show {
            visibility: hidden;
        }
        .name:hover .dont-show {
            visibility: visible;
        }
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
