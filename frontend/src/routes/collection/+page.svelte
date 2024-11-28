<script lang="ts">
    import type { Card } from "./+page.js";
    import CardTable from "./CardTable.svelte";
    import DeckbuilderContainer from "./DeckbuilderContainer.svelte";
    let { data } = $props();
    let cards: Card[] = data.cards;
    import { Pane, Splitpanes } from "svelte-splitpanes";
</script>

<div id="useful-container">
    <Splitpanes>
        <Pane minSize={2} size={30}>
            <DeckbuilderContainer />
        </Pane>
        <Pane>
            <CardTable {cards} />
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
