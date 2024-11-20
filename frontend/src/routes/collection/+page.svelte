<script>
    let { data } = $props();
    let cards = data.cards;
    let filter_options = $state({ name: "", effect: "" });
    function removeAccents(toBeCleaned) {
        return toBeCleaned.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    const slug_translator = {
        eau: "water",
        feu: "fire",
        mineral: "mineral",
        vegetal: "vegetal",
        arcane: "arcane",
        air: "air",
    };
    const type_list = cards.reduce(
        (total, item) => total.add(item.type),
        new Set(),
    );
    let subtype_list = cards.reduce(
        (total, item) => total.add(item.subtype),
        new Set(),
    );
    subtype_list.delete("");
    const element_list = cards.reduce(
        (total, item) => total.add(item.element),
        new Set(),
    );
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
        return is_included;
    }
</script>

<div id="search">
    <input
        type="text"
        class="myInput"
        id="myEffectInput"
        bind:value={filter_options["name"]}
        placeholder="Search for names.."
    />
    <input
        type="text"
        class="myInput"
        id="myTextInput"
        bind:value={filter_options["effect"]}
        placeholder="Search for text.."
    />

    <select bind:value={filter_options["type"]}>
        <option value="everything" selected> All Types </option>
        {#each type_list as type}
            <option value={type}>{type}</option>
        {/each}
    </select>
    <select bind:value={filter_options["element"]}>
        <option value="everything" selected> All Elements </option>
        {#each element_list as element}
            <option value={element}>{element}</option>
        {/each}
    </select>
</div>
<table id="myTable">
    <thead>
        <tr class="header">
            <th>Name</th>
            <th>Type</th>
            <th>Element</th>
            <th>Mana</th>
            <th>Components</th>
            <th>Effect</th>
        </tr>
    </thead>
    <tbody>
        {#each cards.toSorted((a, b) => a.name.localeCompare(b.name)) as card}
            {#if filter_card(card)}
                <tr>
                    <td>
                        <a
                            href="https://magenoir.com/collection/FR/{slug_translator[
                                removeAccents(card.element).toLowerCase()
                            ]}/{card.slug}.html">{card.name}</a
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
