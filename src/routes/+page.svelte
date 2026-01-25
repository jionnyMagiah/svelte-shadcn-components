<script lang="ts">
    import { state } from '$lib/state.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        state.state.crumbs = [];
    });
</script>

<svelte:head>
    <title>svelte-shadcn-components</title>
</svelte:head>
home page
