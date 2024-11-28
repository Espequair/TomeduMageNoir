<script lang="ts">
    import DeckbuilderRow from "./ DeckbuilderRow.svelte";
    import type { Card } from "./+page.js";
    import { Deck, activeDeck } from "./shared.svelte.js";
    function pushToClipboard() {
        let exp: string = "";
        for (let cardTuple of activeDeck.getAllcards()) {
            let [card, count]: [Card, number] = cardTuple;
            exp += count + " " + card.name + "\n";
        }
        navigator.clipboard.writeText(exp);
    }
    
</script>

<div id="root-container">
    <div id="deck-selector">
        <select>
        </select>
    </div>
    <div id="deck-builder">
        <div id="table-header">
            <span>Deck : {activeDeck.name}</span>
            <br />
            <button type="button" onclick={pushToClipboard}>
                Copy to Clipboard
            </button>
            <br />
            <span>Cards in deck : {activeDeck.getCardCount()}</span>
        </div>
        <table>
            <tbody>
                {#each activeDeck.getAllcards() as [card, count]}
                    <tr class="deckbuilder-row">
                        <DeckbuilderRow number={count} {card} />
                    </tr>
                {:else}
                    <tr>
                        <td> No Cards! </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    table {
        width: 100%;
        border: black 1px solid;
    }
    tr:nth-child(odd) {
        background-color: #deeafe;
    }
    tr:hover {
        background-color: rgb(127, 127, 247);
    }
    #root-container {
        white-space: nowrap;
    }
</style>
