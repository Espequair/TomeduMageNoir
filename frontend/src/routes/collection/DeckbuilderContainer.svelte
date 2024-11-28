<script lang="ts">
    import DeckbuilderRow from "./ DeckbuilderRow.svelte";
    import {Deck, activeDeck} from "./shared.svelte.js"
</script>

<div id="root-container">
    <div id="deck-selector"></div>
    <div id="deck-builder">
        <div id="table-header">
            <span>Deck : {activeDeck.name}</span>
            <br/>
            <span>Cards in deck : {activeDeck.getCardCount()}</span>
        </div>
        <table >
            <tbody>
                {#each activeDeck.getAllcards() as [card, count]}
                    <tr class="deckbuilder-row">
                        <DeckbuilderRow number={count} card={card} />
                    </tr>
                {:else}
                    <tr>
                        <td>
                            No Cards!
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    table{
        width: 100%;
        border: black 1px solid;
    }
    tr:nth-child(odd) {
        background-color: #deeafe;
    }
    tr:hover {
        background-color: rgb(127, 127, 247);
    }
</style>
