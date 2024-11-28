<script>
    let { number, card } = $props();
    function decrementValue() {
        number = Math.max(0, number - 1);
    }
    function incrementValue() {
        number = Math.min(4, number + 1);
    }
</script>

<tr class="deckbuilder-row">
    <td>
        <button type="button" onclick={decrementValue}>-</button>
        {number}
        <button type="button" onclick={incrementValue}>+</button>
    </td>
    <td>
        {card.element}
    </td>
</tr>

<style>
</style>
