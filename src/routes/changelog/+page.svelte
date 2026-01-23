<script lang="ts">
    import { page } from '$app/state';
    import { state } from '$lib/state.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        state.state.crumbs = [
            { text: 'Getting Started' },
            { text: 'Changelog', url: page.url.pathname }
        ];
    });
</script>

<svelte:head><title>Changelog</title></svelte:head>
