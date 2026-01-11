<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    export type TimelineHeaderProps = HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement;
        children?: Snippet;
    };
</script>

<script lang="ts">
    const {
        children,
        class: className,
        ...headerProps
    }: TimelineHeaderProps = $props();
</script>

<div
    data-slot="timeline-header"
    {...headerProps}
    class={cn('flex flex-col gap-1', className)}
>
    {@render children?.()}
</div>
