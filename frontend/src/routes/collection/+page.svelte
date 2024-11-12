<script>
  let { data } = $props();
</script>

<h1> Ma collection </h1>

<ul>
  {#each data.cards as card}
    <li>
      <a href="/card/{card.slug}">{card.name}</a>
    </li>
  {/each}
</ul>
