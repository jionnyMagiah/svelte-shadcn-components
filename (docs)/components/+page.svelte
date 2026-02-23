<script lang="ts">
    import { resolve } from '$app/paths';
    import { navigation } from '$lib';
    import { state } from '$lib/state.svelte';
    import { onMount } from 'svelte';

    let groups = navigation['components'].groups;
    onMount(() => {
        state.state.crumbs = [
            { text: 'Components', url: resolve('/components/') }
        ];
    });
</script>

{#each groups as group (group.title)}
    <h1>{group.title}</h1>
    <ul class="mx-4 list-inside list-disc">
        {#each group.pages as page (page.title)}
            <li class="my-2"><a href={page.url} class="link">{page.title}</a></li>
        {/each}
    </ul>
{/each}
