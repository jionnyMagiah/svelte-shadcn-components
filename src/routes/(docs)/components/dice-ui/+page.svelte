<script lang="ts">
    import { resolve } from '$app/paths';
    import { page } from '$app/state';
    import { state } from '$lib/state.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        state.state.crumbs = [
            { text: 'Components', url: resolve('/components/') },
            { text: 'Dice UI', url: page.url.pathname }
        ];
    });
</script>

DICE UI home
