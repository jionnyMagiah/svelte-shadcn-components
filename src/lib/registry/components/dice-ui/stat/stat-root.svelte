<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    type StatRootProps = HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
    let { class: className, children, ...props }: StatRootProps = $props();
</script>

<div
    data-slot="stat"
    class={cn(
        'grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 rounded-lg border bg-card p-4 text-card-foreground shadow-sm',
        '**:data-[slot=stat-label]:col-span-1 **:data-[slot=stat-value]:col-span-1',
        '**:data-[slot=stat-indicator]:col-start-2 **:data-[slot=stat-indicator]:row-span-2 **:data-[slot=stat-indicator]:row-start-1 **:data-[slot=stat-indicator]:self-start',
        '**:data-[slot=stat-description]:col-span-2 **:data-[slot=stat-separator]:col-span-2 **:data-[slot=stat-trend]:col-span-2',
        className
    )}
    {...props}
>
    {@render children?.()}
</div>
