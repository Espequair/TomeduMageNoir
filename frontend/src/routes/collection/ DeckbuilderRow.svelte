<script lang="ts">
    import { page } from "$app/stores";
    import { sanitizeElement } from "$lib/utils.js";
    let { number, card } = $props();
    let decks = $page.data.decks;
</script>

<td class="minimize"
    ><button type="button" onclick={() => decks.activeDeck.delCard(card)}>
        🗑️
    </button>
</td>
<td class="minimize">
    <button type="button" onclick={() => decks.activeDeck.modCard(card, -1)}>
        -
    </button>
    {number}
    <button type="button" onclick={() => decks.activeDeck.modCard(card, 1)}>
        +
    </button>
</td>
<td class="name">
    <a
        href="https://magenoir.com/collection/FR/{sanitizeElement(
            card.element,
        )}/{card.slug}.html"
        target="_blank"
    >
        {card.name}
        {#if card.transmutables.length > 0}
            ({card.transmutables.substring(1)})
        {/if}
    </a>
</td>

<style>
    td.minimize {
        width: 10px;
    }
    td.name a {
        display: block;
        text-transform: lowercase;
    }
    td.name a::first-letter {
        text-transform: capitalize;
    }
</style>
