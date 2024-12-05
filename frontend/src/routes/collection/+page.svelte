<script lang="ts">
    import type { Card } from "$lib/Decks.js"
    import CardTable from "./CardTable.svelte";
    import DeckbuilderContainer from "./DeckbuilderContainer.svelte";
    let { cards, decks } = $props();
    import { Pane, Splitpanes } from "svelte-splitpanes";
</script>

<div id="useful-container">
    <Splitpanes>
        <Pane minSize={2} size={30}>
            <DeckbuilderContainer/>
        </Pane>
        <Pane>
            <CardTable/>
        </Pane>
    </Splitpanes>
</div>

<style>
    #useful-container {
        border: 2px dotted rgb(96 139 168);
        display: flex;
        justify-content: space-between;
    }
</style>
