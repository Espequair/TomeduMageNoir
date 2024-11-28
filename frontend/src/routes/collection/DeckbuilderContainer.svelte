<script lang="ts">
    import DeckbuilderRow from "./ DeckbuilderRow.svelte";
    let activeDeck = [
        { card: { element: "this" }, count: 1 },
        { card: { element: "that" }, count: 2 },
        { card: { element: "the other thing" }, count: 3 },
    ];
</script>

<div id="root-container">
    <div id="deck-selector"></div>
    <div id="deck-builder">
        <table>
            <tbody>
                {#each activeDeck as row}
                    <tr class="deckbuilder-row">
                        <DeckbuilderRow number={row.count} card={row.card} />
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    tr:nth-child(odd) {
        background-color: #deeafe;
    }
    tr:hover {
        background-color: rgb(127, 127, 247);
    }
</style>
