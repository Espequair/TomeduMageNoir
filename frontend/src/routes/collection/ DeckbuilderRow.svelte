<script lang="ts">
    import { sanitizeElement } from "$lib/utils.js";
    // @ts-ignore
    import { decks } from "./shared.svelte.ts";
    let { number, card } = $props();
</script>

<td
    ><button type="button" onclick={() => decks.activeDeck.delCard(card)}
        >🗑️</button
    ></td
>
<td>
    <button type="button" onclick={() => decks.activeDeck.modCard(card, -1)}
        >-</button
    >
    {number}
    <button type="button" onclick={() => decks.activeDeck.modCard(card, 1)}
        >+</button
    >
</td>
<td>
    <a
        href="https://magenoir.com/collection/FR/{sanitizeElement(
            card.element,
        )}/{card.slug}.html"
        target="_blank"
        >{card.name}
        {#if card.transmutables.length > 0}
            ({card.transmutables.substring(1)})
        {/if}</a
    >
</td>

<style>
</style>
