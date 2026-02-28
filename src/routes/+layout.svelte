<script lang="ts">
    import favicon from '$lib/assets/favicon.svg';
    import { ModeWatcher } from 'mode-watcher';
    import './layout.css';
    import SearchDoc from '$lib/components/search-doc.svelte';
    let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
<SearchDoc />

<div class="h-screen">{@render children()}</div>
