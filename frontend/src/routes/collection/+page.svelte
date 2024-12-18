<script lang="ts">
    import CardTable from "./CardTable.svelte";
    import DeckbuilderContainer from "./DeckbuilderContainer.svelte";
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
        display: flex;
        justify-content: space-between;
        padding: 10px;
    }
</style>
