<script>
    let { data } = $props();
    let cards = data.cards;
    let filter_options = $state({ name: "", effect: "" });
    /**
     * @param {string} accented_string
     */
    function removeAccents(accented_string) {
        return accented_string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    /**
     * @param {string} unsanitized_element
     */
     function sanitize_element(unsanitized_element){
        let san = removeAccents(unsanitized_element).toLowerCase();
        if (Object.keys(slug_translator).includes(san)){
            return slug_translator[san];
        } else {
            return san;
        }
    }
    const slug_translator = {
        "eau": "water",
        "feu": "fire",
        "mineral": "mineral",
        "vegetal": "vegetal",
        "arcane": "arcane",
        "air": "air",
    };
    const type_list = cards.reduce(
        (collection, card) => collection.add(card.type),
        new Set(),
    );
    let subtype_list = cards.reduce(
        (collection, card) => collection.add(card.subtype),
        new Set(),
    );
    subtype_list.delete("");
    const element_list = cards.reduce(
        (collection, card) => collection.add(card.element),
        new Set(),
    );

    const mana_cost_list = cards.reduce((collection, card) => {
        for (const cost in card.mana_cost) {
            collection.add(sanitize_element(cost));
        }
        return collection;
    }, new Set());
    const comp_cost_list = cards.reduce((collection, card) => {
        for (const cost in card.components) {
            collection.add(sanitize_element(cost));
        }
        return collection;
    }, new Set());
    console.log(comp_cost_list)

    mana_cost_list.delete(null);
    function filter_card(card) {
        let is_included = true;
        is_included &= removeAccents(card.effect)
            .toUpperCase()
            .includes(removeAccents(filter_options["effect"].toUpperCase()));
        is_included &= removeAccents(card.name)
            .toUpperCase()
            .includes(removeAccents(filter_options["name"].toUpperCase()));
        is_included &=
            card.type === filter_options["type"] ||
            filter_options["type"] === "everything";
        is_included &=
            card.element === filter_options["element"] ||
            filter_options["element"] === "everything";
            is_included &=
            Object.keys(card.mana_cost).map(cost=>sanitize_element(cost)).includes(filter_options["mana_cost"]) ||
            filter_options["mana_cost"] === "everything";
            /*is_included &=
            Object.keys(card.comp_cost).map(cost=>sanitize_element(cost)).includes(filter_options["comp_cost"]) ||
            filter_options["comp_cost"] === "everything";*/
        return is_included;
    }
</script>

<table id="myTable">
    <thead id="searchGroup">
        <tr>
            <th
                >Name
                <input
                    type="text"
                    class="myInput"
                    id="myEffectInput"
                    bind:value={filter_options["name"]}
                    placeholder="Search for names.."
                />
            </th>
            <th>
                Type <select bind:value={filter_options["type"]}>
                    <option value="everything" selected> All Types </option>
                    {#each type_list as type}
                        <option value={type}>{type}</option>
                    {/each}
                </select>
            </th>
            <th>
                Element
                <select bind:value={filter_options["element"]}>
                    <option value="everything" selected> All Elements </option>
                    {#each element_list as element}
                        <option value={element}>{element}</option>
                    {/each}
                </select>
            </th>
            <th>
                Mana Cost
                <select bind:value={filter_options["mana_cost"]}>
                    <option value="everything" selected> Any mana cost </option>
                    {#each mana_cost_list as mana_cost}
                        <option value={mana_cost}>{mana_cost}</option>
                    {/each}
                </select>
            </th>
            <th>Components
            <select bind:value={filter_options["comp_cost"]}>
                <option value="everything" selected> Any component cost </option>
                {#each comp_cost_list as comp_cost}
                    <option value={comp_cost}>{comp_cost}</option>
                {/each}
            </select>
            </th>
            <th>
                Effect
                <input
                    type="text"
                    class="myInput"
                    id="myTextInput"
                    bind:value={filter_options["effect"]}
                    placeholder="Search for text.."
                />
            </th>
        </tr>
    </thead>
    <tbody>
        {#each cards.toSorted((a, b) => a.name.localeCompare(b.name)) as card}
            {#if filter_card(card)}
                <tr>
                    <td>
                        <a
                            href="https://magenoir.com/collection/FR/{sanitize_element(card.element)}/{card.slug}.html"
                            target="_blank">{card.name}</a
                        >
                    </td>
                    <td>
                        {card.type}
                        {card.subtype}
                    </td>

                    <td>
                        {card.element}
                    </td>
                    <td>
                        <ul class="noBullets">
                            {#each Object.entries(card.mana_cost) as [a, b]}
                                <li>
                                    {b}
                                    {a}
                                </li>
                            {/each}
                        </ul>
                    </td>
                    <td>
                        <ul class="noBullets">
                            {#each Object.entries(card.components) as [a, b]}
                                <li>{b} {a}</li>
                            {/each}
                        </ul>
                    </td>
                    <td>
                        {card.effect}
                    </td>
                </tr>
            {/if}
        {/each}
    </tbody>
</table>

<style>
    @import "./styles.css";
</style>
