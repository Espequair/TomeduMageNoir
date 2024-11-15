<script>
    let { data } = $props();
    let elements = ["Végétal", "Feu", "Air", "Eau", "Minéral", "Arcane"];
    //console.log(data.cards)
</script>

<nav id="searchbar">
    <div>
        {#each elements as element}
            <div id="button-{element}">
                <input type="checkbox" class="check" />{element}
            </div>
        {/each}
    </div>
    <div></div>
</nav>

<h1>Ma collection</h1>

<ul id="categories">
    {#each Object.entries(data.cards) as [category_name, arr]}
        <li>{category_name}</li>
        <ul>
            {#each arr as card}
                <li>
                    <a href="/card/{card.slug}">{card.name}</a>
                </li>
            {:else}
                category {category_name} is empty
            {/each}
        </ul>
    {:else}
        categories is empty
    {/each}
</ul>

<style>
    @import "./styles.css";
</style>
