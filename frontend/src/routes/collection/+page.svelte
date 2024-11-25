<script lang="ts">
    import type { Card } from "./+page.js";
    import CardTable from "./CardTable.svelte";
    let { data } = $props();
    let cards : Card[] = data.cards
</script>
<CardTable {cards}/>