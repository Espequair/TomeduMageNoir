<script lang="ts">
    let { card } = $props();
    import { sanitize_element } from "$lib/utils.js"
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
    <td>
        {card.effect}
    </td>
</tr>

<!-- svelte-ignore css_unused_selector -->
<style>
    @import "./styles.css";
</style>
