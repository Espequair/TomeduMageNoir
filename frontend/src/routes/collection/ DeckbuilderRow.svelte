<script>
    // @ts-ignore
    import { activeDeck } from "./shared.svelte.ts";
    let { number, card } = $props();
</script>

<td
    ><button type="button" onclick={() => activeDeck.delCard(card)}>🗑️</button
    ></td
>
<td>
    <button type="button" onclick={() => activeDeck.modCard(card, -1)}>-</button
    >
    {number}
    <button type="button" onclick={() => activeDeck.modCard(card, 1)}>+</button>
</td>
<td>
    {card.name}
</td>

<style>
</style>
