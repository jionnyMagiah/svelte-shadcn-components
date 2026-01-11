<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    export type TimelineDescriptionProps = HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement;
        children?: Snippet;
    };
</script>

<script lang="ts">
    const {
        children,
        class: className,
        ...descriptionProps
    }: TimelineDescriptionProps = $props();
</script>

<div
    data-slot="timeline-description"
    {...descriptionProps}
    class={cn('text-sm text-muted-foreground', className)}
>
    {@render children?.()}
</div>
