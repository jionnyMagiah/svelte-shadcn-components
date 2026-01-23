<script lang="ts">
    import { page } from '$app/state';
    import { state } from '$lib/state.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        state.state.crumbs = [{ text: 'Dice UI', url: page.url.pathname }];
    });
</script>

DICE UI home
