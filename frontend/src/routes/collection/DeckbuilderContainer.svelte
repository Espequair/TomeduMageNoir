<script lang="ts">
    import DeckbuilderRow from "./ DeckbuilderRow.svelte";
    import type { Card } from "./+page.js";
    import { Deck, decks } from "./shared.svelte.js";
    function pushToClipboard() {
        let exp: string = "";
        for (let cardTuple of decks.activeDeck.getAllcards()) {
            let [card, count]: [Card, number] = cardTuple;
            exp += count + " " + card.name + "\n";
        }
        navigator.clipboard.writeText(exp);
    }
    function createNewDeck() {
        decks.push(new Deck("New Deck"));
        decks.activeDeckNum = decks.decks.length - 1
    }
</script>

<div id="root-container">
    <div id="deck-selector" style="display: inline;">
        <button type="button" onclick={createNewDeck}>Create New Deck</button>
        <select bind:value={decks.activeDeckNum}>
            {#each decks.list as deck, index}
                <option value={index}>{index+1} : {deck.name}</option>
            {/each}
        </select>
        <input type="text" bind:value={decks.activeDeck.name}>
        <button type="button" onclick={()=>decks.pop()}>deleteDeck</button>

    </div>
    <div id="deck-builder">
        <div id="table-header">
            <br />
            <button type="button" onclick={pushToClipboard}>
                Copy to Clipboard
            </button>
            <br />
            <span>Cards in deck : {decks.activeDeck.getCardCount()}</span>
        </div>
        <table>
            <tbody>
                {#each decks.activeDeck.getAllcards() as [card, count]}
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
