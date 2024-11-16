<script>
    let { data } = $props();
    let elements = ["Végétal", "Feu", "Air", "Eau", "Minéral", "Arcane"];
    //console.log(data.cards)
</script>

<nav id="searchbar">
    <div class="search-category">
        {#each elements as element}
            <div class="search-element">
                <input type="checkbox"/>{element}
            </div>
        {/each}
    </div>
    <div class="search-category">
        {#each elements as element}
            <div class="search-element">
                {element} <input id="{element}-comparison" type="text">
            </div>
        {/each}
    </div>
    <div class="search-category">
        <div class="search-element">
            Terme de recherche <input id="search-bar" type="text">
        </div>
    </div>
    <div class="search-category">
        <input id="search-button" class="search-element" type="submit" value="Search">
    </div>
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
