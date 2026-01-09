<script lang="ts" module>
    import Button from '$lib/components/ui/button/button.svelte';
    import Separator from '$lib/components/ui/separator/separator.svelte';
    import type { Snippet } from 'svelte';

    export type ActionBarSelectionProps = {
        children?: Snippet;
    };
</script>

<script lang="ts">
    let { children }: ActionBarSelectionProps = $props();
</script>

<div
    class="flex items-center gap-1 rounded-sm border px-2 py-1 text-sm font-medium tabular-nums"
    data-slot="action-bar-selection"
>
    {@render children?.()}
</div>
