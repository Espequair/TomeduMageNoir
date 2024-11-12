<script>
  let {data} = $props();
  console.log(data.card)
</script>

<h2>{data.card.name}</h2>
<p>{data.card.effect}</p>
<h3>Notes</h3>
<ol>
{#each data.card.notes as note, index}
<li>{note}</li>
{/each}
</ol>
