<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    type ActionBarSelectionProps = HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
    const {
        class: className,
        children,
        ...selectionProps
    }: ActionBarSelectionProps = $props();
</script>

<div
    data-slot="action-bar-selection"
    {...selectionProps}
    class={cn(
        'flex items-center gap-1 rounded-sm border px-2 py-1 text-sm font-medium tabular-nums',
        className
    )}
>
    {@render children?.()}
</div>
