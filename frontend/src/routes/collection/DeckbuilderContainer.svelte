<script lang="ts">
    // Imports
    import DeckbuilderRow from "./ DeckbuilderRow.svelte";
    import type { Decks } from "$lib/Decks.svelte.js";
    import { page } from "$app/stores";

    // Variables
    let decks: Decks = $page.data.decks;
    $inspect(decks);
    // Functions
    function pushToClipboard(text: string) {
        navigator.clipboard.writeText(text);
    }
</script>

<div id="root-container">
    <div id="deck-selector" style="display: inline;">
        <button type="button" onclick={() => decks.saveDecksToLocalStorage()}>
            Save All Decks
        </button>
        <br />
        <button type="button" onclick={() => decks.addNewEmptyDeck()}>
            Create New Deck
        </button>
        <select bind:value={decks.activeDeckNum}>
            {#each decks.list as deck, index (deck.uuid)}
                <option value={index}>
                    {index + 1} : {deck.name}
                </option>
            {/each}
        </select>
        <input type="text" bind:value={decks.activeDeck.name} />
        <button type="button" onclick={() => decks.pop()}>Delete deck</button>
    </div>
    <div id="deck-builder">
        <div id="table-header">
            <br />
            <button
                type="button"
                onclick={() =>
                    pushToClipboard(decks.activeDeck.exportableDecklist)}
            >
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
