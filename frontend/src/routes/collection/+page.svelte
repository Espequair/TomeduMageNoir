<script>
  let { data } = $props();
  //console.log(data.cards)
</script>

<h1> Ma collection </h1>

<ul>
{#each Object.entries(data.cards) as [category_name, arr]}
  <li>{category_name}</li>
  <ul>
  {#each arr as card}
    <li>
      <a href="/card/{card.slug}">{card.name}</a>
    </li>
  {:else}
    cards is empty
  {/each}
  </ul>
{:else}
categories is empty
{/each}
</ul>
