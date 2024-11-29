<script>
    // @ts-ignore
    import { decks } from "./shared.svelte.ts";
    let { number, card } = $props();
</script>

<td
    ><button type="button" onclick={() => decks.activeDeck.delCard(card)}>🗑️</button
    ></td
>
<td>
    <button type="button" onclick={() => decks.activeDeck.modCard(card, -1)}>-</button
    >
    {number}
    <button type="button" onclick={() => decks.activeDeck.modCard(card, 1)}>+</button>
</td>
<td>
    {card.name}
</td>

<style>
</style>
