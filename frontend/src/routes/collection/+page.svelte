<script lang="ts">
    import type { Card } from "./+page.js";
    import CardTable from "./CardTable.svelte";
    import DeckbuilderContainer from "./DeckbuilderContainer.svelte";
    let { data } = $props();
    let cards: Card[] = data.cards;
</script>

<div id="useful-container">
    <CardTable {cards} />
    <DeckbuilderContainer />
</div>

<style>
#useful-container {
  border: 2px dotted rgb(96 139 168);
  display: flex;
  justify-content: space-between;
}

#useful-container > * {
  border: 2px solid rgb(96 139 168);
  border-radius: 5px;
  background-color: rgb(96 139 168 / 0.2);
  padding: 1em;
}
</style>