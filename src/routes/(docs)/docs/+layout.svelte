<script lang="ts">
    import DocsLayout from '$lib/components/docs-layout.svelte';
    import { navigation } from '$lib/navigation';

    let { children } = $props();
</script>

<DocsLayout {navigation}>
    {@render children?.()}
</DocsLayout>
