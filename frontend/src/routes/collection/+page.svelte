<script lang="ts">
    import { type Card } from "./+page.js";
    let { data } = $props();
    let cards: Card[] = data.cards;

    let filter_options: { [k: string]: any } = $state({
        name: "",
        effect: "",
    });
    let sort_order: [property: keyof Card, ascending: boolean] = $state([
        "name",
        true,
    ]);
    const slug_translator: Record<string, string> = {
        eau: "water",
        feu: "fire",
        mineral: "mineral",
        vegetal: "vegetal",
        arcane: "arcane",
        air: "air",
    };
    let filtered_card_list = $derived(
        cards.filter((card) => filter_card(card)),
    );
    let type_list = $derived(
        filtered_card_list.reduce(
            (collection, card) => collection.add(card.type),
            new Set(),
        ),
    );
    let element_list = $derived(
        filtered_card_list.reduce(
            (collection, card) => collection.add(card.element),
            new Set(),
        ),
    );
    let mana_cost_list = $derived(
        filtered_card_list.reduce((collection, card) => {
            for (const cost in card.mana_cost) {
                collection.add(sanitize_element(cost));
            }
            return collection;
        }, new Set()),
    );
    let comp_cost_list = $derived(
        [
            ...filtered_card_list.reduce((collection, card) => {
                for (const cost in card.components) {
                    collection.add(sanitize_element(cost));
                }
                return collection;
            }, new Set()),
        ].toSorted((a, b) => String(a).localeCompare(String(b))),
    );

    function removeAccents(accented_string: string): string {
        return accented_string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function sanitize_string(unsanitized_string: string): string {
        return removeAccents(unsanitized_string).toLowerCase();
    }

    function sanitize_element(unsanitized_element: string): string {
        let san = sanitize_string(unsanitized_element);
        if (Object.keys(slug_translator).includes(san)) {
            return slug_translator[san];
        } else {
            return san;
        }
    }

    function filter_card(card: Card): boolean {
        let is_included = true;
        is_included &&= sanitize_string(card.effect).includes(
            sanitize_string(filter_options["effect"]),
        );
        is_included &&= sanitize_string(card.name).includes(
            sanitize_string(filter_options["name"]),
        );
        is_included &&=
            card.type === filter_options["type"] ||
            filter_options["type"] === "everything";
        is_included &&=
            card.element === filter_options["element"] ||
            filter_options["element"] === "everything";
        is_included &&=
            Object.keys(card.mana_cost)
                .map((cost) => sanitize_element(cost))
                .includes(filter_options["mana_cost"]) ||
            filter_options["mana_cost"] === "everything";
        is_included &&=
            Object.keys(card.components)
                .map((cost) => sanitize_element(cost))
                .includes(filter_options["comp_cost"]) ||
            filter_options["comp_cost"] === "everything";
        return is_included;
    }
    function change_sort_order(property: string) {
        return () => {
            if (!sort_order[0].localeCompare(property)) {
                sort_order[1] = !sort_order[1];
            } else {
                sort_order = [property as keyof Card, true];
            }
        };
    }
    function sum_costs(card: Card, property: keyof Card): number {
        return Object.values(card[property] as typeof slug_translator).reduce(
            (accumulator: number, cost: number | string | undefined) => {
                if (!(typeof cost).localeCompare("number")) {
                    return accumulator + (cost as number);
                } else {
                    return accumulator + 100;
                }
            },
            0,
        ) as number;
    }
    function sort_card_list_function() {
        if (
            !sort_order[0].localeCompare("name") ||
            !sort_order[0].localeCompare("type") ||
            !sort_order[0].localeCompare("element")
        ) {
            return (card_a: Card, card_b: Card) =>
                (sort_order[1] ? -1 : 1) *
                (card_a[sort_order[0] as keyof Card] as string).localeCompare(
                    card_b[sort_order[0]] as string,
                );
        } else if (
            !sort_order[0].localeCompare("mana_cost") ||
            !sort_order[0].localeCompare("components")
        ) {
            return (card_a: Card, card_b: Card) => {
                let x =
                    sum_costs(card_a, sort_order[0]) -
                    sum_costs(card_b, sort_order[0]);
                return x * (sort_order[1] ? -1 : 1);
            };
        }
    }
    function display_correct_symbol(property: string) {
        if (!property.localeCompare(sort_order[0])) {
            return sort_order[1] ? "▲" : "▼";
        }
    }
</script>

<h2>Results {filtered_card_list.length}</h2>
<h2>Sort {sort_order[0]} {sort_order[1] ? "ascending" : "descending"}</h2>
Cliquer sur le titre d'une colonne pour changer la façon dont les colonnes sont ordonnés
<table id="myTable">
    <thead id="searchGroup">
        <tr>
            <th>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <h2 onclick={change_sort_order("name")}>
                    Name {display_correct_symbol("name")}
                </h2>
                <input
                    type="text"
                    class="myInput"
                    id="myEffectInput"
                    bind:value={filter_options["name"]}
                    placeholder="Search for names.."
                />
            </th>
            <th>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <h2 onclick={change_sort_order("type")}>
                    Type {display_correct_symbol("type")}
                </h2>
                <select bind:value={filter_options["type"]}>
                    <option value="everything" selected> All Types </option>
                    {#each type_list as type}
                        <option value={type}>{type}</option>
                    {/each}
                </select>
            </th>
            <th>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <h2 onclick={change_sort_order("element")}>
                    Element {display_correct_symbol("element")}
                </h2>
                <select bind:value={filter_options["element"]}>
                    <option value="everything" selected> All Elements </option>
                    {#each element_list as element}
                        <option value={element}>{element}</option>
                    {/each}
                </select>
            </th>
            <th>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <h2 onclick={change_sort_order("mana_cost")}>
                    Mana Cost {display_correct_symbol("mana_cost")}
                </h2>
                <select bind:value={filter_options["mana_cost"]}>
                    <option value="everything" selected> Any mana cost </option>
                    {#each mana_cost_list as mana_cost}
                        <option value={mana_cost}>{mana_cost}</option>
                    {/each}
                </select>
            </th>
            <th>
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <h2 onclick={change_sort_order("components")}>
                    Components {display_correct_symbol("components")}
                </h2>
                <select bind:value={filter_options["comp_cost"]}>
                    <option value="everything" selected>
                        Any component cost
                    </option>
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
        {#each filtered_card_list.toSorted(sort_card_list_function()) as card}
            <tr>
                <td>
                    <a
                        href="https://magenoir.com/collection/FR/{sanitize_element(
                            card.element,
                        )}/{card.slug}.html"
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
        {/each}
    </tbody>
</table>

<style>
    @import "./styles.css";
</style>
