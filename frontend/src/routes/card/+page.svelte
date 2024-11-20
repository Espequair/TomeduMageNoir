<script>
  let {data} = $props();
  let card = data.card
</script>

<h2>{card.name}</h2>
<img src="{card.mn_image_link}" alt="{card.name}" width=20%/>
<h3>{card.element}</h3>
<h4>Mana Cost</h4>
<ul>
    {#each Object.entries(card.mana_cost) as [cost_type, cost_quantity]}
        <li>{cost_quantity} {cost_type}</li>
    {/each}
</ul>
<h4>Mana Components</h4>
<ul>
    {#each Object.entries(card.components) as [cost_type, cost_quantity]}
        <li>{cost_quantity} {cost_type}</li>
    {/each}
</ul>
<h4>Effects</h4>

<p>{card.effect}</p>
<h4>Notes</h4>
<ol>
{#each card.notes as note}
<li>{note}</li>
{/each}
</ol>
