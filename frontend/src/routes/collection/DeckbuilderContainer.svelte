<script lang="ts">
    // Imports
    import DeckbuilderRow from "./ DeckbuilderRow.svelte";
    import type { Card, Decks } from "$lib/Decks.svelte.js";
    import { page } from "$app/stores";
    import { pickRandomItems } from "$lib/utils.js";
    // Variables
    let decks: Decks = $page.data.decks;
    let mulligan: Card[] = $state([]);
    let componentHelper = $derived(decks.activeDeck.componentsHelper);
    $inspect(decks);
    // Functions
    function pushToClipboard(text: string) {
        navigator.clipboard.writeText(text);
    }
    function generateMulligan() {
        mulligan = pickRandomItems(decks.activeDeck.cardList, 10);
    }
</script>

<div id="root-container">
    <div id="deck-selector">
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
    <div id="deck-builder-helpers">
        <div id="component-helper">
            <table>
                <thead>
                    <tr>
                        <td><b>Component</b></td>
                        <td><b>Needed</b></td>
                        <td><b>Present</b></td>
                    </tr>
                </thead>
                <tbody>
                    {#each componentHelper as [component, [needed, inDeck]]}
                        <tr>
                            <td>{component}</td>
                            <td> {needed}</td>
                            <td>{inDeck}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div id="mulligan-generator">
            <button onclick={() => generateMulligan()}>Draw mulligan</button>
            {#if mulligan.length > 0}
                <div id="mulligan-container">
                    <div class="hand-container">
                        <h2>Hand 1</h2>
                        <ul class="hand">
                            {#each mulligan.slice(0, 5) as card}
                                <li class="capitalize">
                                    {card.name}
                                </li>
                            {/each}
                        </ul>
                    </div>
                    <div class="hand-container">
                        <h2>Hand 2</h2>
                        <ul class="hand">
                            {#each mulligan.slice(5) as card}
                                <li class="capitalize">
                                    {card.name}
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {:else}
                No Hand Drawn
            {/if}
        </div>
    </div>
</div>

<style>
    tr:nth-child(2n+1)
    {
        background-color: #293438!important;
    }
    tr
    {
        background-color: #1D2429;
    }
    tr:nth-child(2n+1):hover, tr:hover
    {
        background-color: #525150!important;
    }
    #root-container
    {
        background-color: #000;
        padding: 20px;
        color: white;
        display: block;
    }
    #root-container button
    {
        background-color: #292828;
        border-radius: 5px;
        border:none;
        padding: 5px;
        margin: 5px;
        color: #fff;
        min-width: 50%;
        transition: all ease 0.5s;
        cursor: pointer;
    }
    #root-container button:hover
    {
        transform: scale(0.95);
        transition: all ease 0.5s;
        background-color: #525150;
    }
    #root-container select, #root-container input 
    {
        padding: 5px;
        margin: 5px;
        border-radius: 5px;
        border: none;
        min-width: 50%;
    }
    #deck-selector, #table-header, #mulligan-generator
    {
        display: flex;
        padding-bottom: 20px;
        flex-direction: column;
        border-bottom: 3px ridge #525150;
        text-align: center;
    }
    #mulligan-container
    {
        column-gap:20%;
        width: 100%;
    }
    #mulligan-container h2
    {
        text-align: center;
    }
    #mulligan-container .hand
    {
        padding-left: 15%;
    }
    #deck-selector
    {
        margin-bottom: 20px;
    }
    #deck-builder button{
        margin-bottom: 5px ;
    }

    .capitalize {
        text-transform: lowercase; /* Convert all text to lowercase */
    }

    .capitalize::first-letter {
        text-transform: uppercase; /* Capitalize the first letter */
    }
    .hand {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    #mulligan-container {
        display: grid;
        grid-template-columns: 1fr 1fr; /* Two equal-width columns */
    }
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
