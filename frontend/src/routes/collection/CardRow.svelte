<script lang="ts">
    import { sanitizeElement, insertIcons } from "$lib/utils.js";
    import type { Decks } from "$lib/Decks.svelte.js";
    import { page } from "$app/stores";
    let data = $props();
    let card = $derived(data.card);
    let decks: Decks = $page.data.decks;
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
            href="https://magenoir.com/collection/{card.language.toUpperCase()}/{sanitizeElement(
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
            {#each [...card.mana_cost.entries()].toSorted( (f, s) => f[0].localeCompare(s[0]) ) as [a, b]}
                <li>
                    {b}
                    {@html insertIcons(a)}
                </li>
            {/each}
        </ul>
    </td>
    <td class="components">
        <ul class="noBullets">
            {#each [...card.components.entries()].toSorted( (f, s) => f[0].localeCompare(s[0]) ) as [a, b]}
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
    td
    {
        color: #fff;
    }
    td.name a {
        display: block;
        text-transform: lowercase;
    }
    td.name a::first-letter {
        text-transform: capitalize;
    }
    .take-all {
        width: 50px; 
        height: 50px; 
        border-radius: 10px;
        border: none;
        margin: auto;
        padding: 0; /* Remove default padding */
        display: block; /* Ensure the button behaves like a block element */
        box-sizing: border-box; /* Include borders and padding in the width/height */
        transition: all ease 0.2s;
    }
    .take-all:hover
    {
        cursor: pointer;
    }
    .take-all:active
    {
        font-size: 20px;
        font-weight: 900;
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
        border-left: 1px solid #181818;
        padding: 5px; /* Remove default cell padding */
    }

    tr {
        /* Add a bottom border to all table rows */
        border-bottom: 2px solid #181818;
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
        background-color: #1D2429;
    }

    tr:hover {
        /* Add a grey background color to the table header and on hover */
        background-color: #525150;
    }
    td.preserve-linebreak {
        white-space: pre-line;
    }
</style>
