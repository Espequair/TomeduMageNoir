<script lang="ts">
    import DeckbuilderRow from "./ DeckbuilderRow.svelte";
    import {Deck, activeDeck} from "./shared.svelte.js"
    let r = $derived(activeDeck)
</script>

<div id="root-container">
    <div id="deck-selector"></div>
    <div id="deck-builder">
        <table style="width:max-content;">
            <tbody>
                {#each r.cards.entries() as [card, count]}
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
    tr:nth-child(odd) {
        background-color: #deeafe;
    }
    tr:hover {
        background-color: rgb(127, 127, 247);
    }
</style>
