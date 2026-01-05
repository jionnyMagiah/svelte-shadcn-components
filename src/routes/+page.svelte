<script lang="ts">
    import { UseToc, type Heading } from '$lib/hooks/toc.svelte';

    const toc = new UseToc();
</script>

<div bind:this={toc.ref}>
    <h2>Installation</h2>
    <h3>CLI</h3>
    <h3>Manual</h3>
    <h2>Usage</h2>
</div>
<ul>
    {#each toc.current as item}
        <li>
            {@render renderHeading(item)}
        </li>
    {/each}
</ul>

{#snippet renderHeading(h: Heading, level = 0)}
    {h.label}
    {#if h.children.length > 0}
        <ul>
            {#each h.children as item}
                <li>
                    {@render renderHeading(item, level + 1)}
                </li>
            {/each}
        </ul>
    {/if}
{/snippet}
