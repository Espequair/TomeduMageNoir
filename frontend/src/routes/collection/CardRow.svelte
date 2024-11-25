<script lang="ts">
    let { card } = $props();
    import { sanitize_element } from "$lib/utils.js";
</script>

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
                <li>
                    {b}
                    {a}
                </li>
            {/each}
        </ul>
    </td>
    <td class="preserve-linebreak">
        {card.effect}
    </td>
</tr>

<style>
    td {
        border-left: 1px solid;
    }
    tr {
        /* Add a bottom border to all table rows */
        border-bottom: 2px solid #ddd;
    }

    tr:nth-child(odd) {
        /* Add a black */
        background-color: #deeafe;
    }

    tr:hover {
        /* Add a grey background color to the table header and on hover */
        background-color: #f1f1f1;
    }
    td.preserve-linebreak {
        white-space: pre-line
    }
</style>
