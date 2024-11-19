    <script lang="ts">
        import EqualitySelector from "./EqualitySelector.svelte";

        let { data } = $props();
        let filter = $state("")
        let sort_order : string= $state("element")
        const sorts = {
            "name" : "name",
            "element" : "element"
        }
        const elements = ["Végétal", "Feu", "Air", "Eau", "Minéral", "Arcane"];
        function updateFilter(){
            filter = document.getElementById("myInput")?.value;
        }
        function removeAccents(toBeCleaned: string){
            return toBeCleaned.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        }
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
                    {element} 
                    <EqualitySelector/>
                    <input id="{element}-comparison" type="text" pattern="[0-9]*|[xX]" size="4">
                </div>
            {/each}
        </div>
        <div class="search-category">
            <div class="search-element">
                Terme de recherche <input id="myInput" onkeyup={updateFilter} type="text">
            </div>
        </div>
        <div class="search-category">
            <input id="search-button" class="search-element" type="submit" value="Search">
        </div>
    </nav>

    <h1>Ma collection</h1>

    <table id="cardsTable">
        <thead>
            <tr class="header">
            <th>Name</th>
            <th>Element</th>
            <th>Mana</th>
            <th>Components</th>
            </tr>
        </thead>
        <tbody>
            {#each data.cards.toSorted((card_a, card_b) => (card_a[sort_order].localeCompare(card_b[sort_order]))) as card}
            {#if removeAccents(card.name).toUpperCase().includes(removeAccents(filter.toUpperCase()))}
            <tr>
                <td>
                    {card.name}
                </td>
                <td>
                    {card.element}
                </td>
                <td>
                    
                    <ul style="list-style-type:none">
                    {#each Object.entries(card.mana_cost) as [a, b]}
                        <li>
                        {b} {a}
                        </li>
                    {/each}
                    </ul>
                </td>
                <td>
                    <ul style="list-style-type:none">
                    {#each Object.entries(card.components) as [a, b]}
                        <li>{b} {a}</li>
                    {/each}
                    </ul>
                </td>
                
            </tr>
            {/if}
        {/each}
        </tbody>
    </table>

    <style>
        @import "./styles.css";
    </style>