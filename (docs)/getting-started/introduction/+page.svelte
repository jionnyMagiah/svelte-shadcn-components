<script lang="ts">
    import { page } from '$app/state';
    import { state } from '$lib/state.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        state.state.crumbs = [
            { text: 'Getting Started' },
            { text: 'Introduction', url: page.url.pathname }
        ];
    });
</script>

<svelte:head>
    <title>Introduction - svelte-shadcn-components</title>
</svelte:head>
<h1>Request a component</h1>

To request a component you can either submit a PR or open an issue.
