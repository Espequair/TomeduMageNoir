<script>
    // @ts-ignore
    import { activeDeck } from "./shared.svelte.ts";
    let { number, card } = $props();
    function decrementValue() {
        number = Math.max(0, number - 1);
    }
    function incrementValue() {
        number = Math.min(4, number + 1);
    }
</script>

<td
    ><button type="button" onclick={() => activeDeck.delCard(card)}>🗑️</button
    ></td
>
<td>
    <button type="button" onclick={decrementValue}>-</button>
    {number}
    <button type="button" onclick={incrementValue}>+</button>
</td>
<td>
    {card.name}
</td>

<style>
</style>
