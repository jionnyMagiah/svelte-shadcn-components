<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    export type StatusIndicatorProps = HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
    let { class: className, ...indicatorProps }: StatusIndicatorProps =
        $props();
</script>

<div
    data-slot="status-indicator"
    {...indicatorProps}
    class={cn(
        'relative flex size-2 shrink-0 rounded-full',
        'before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-inherit',
        'after:absolute after:inset-0.5 after:rounded-full after:bg-inherit',
        className
    )}
></div>
