<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import type { HTMLTimeAttributes } from 'svelte/elements';

    export type TimelineTimeProps = HTMLTimeAttributes & {
        children?: Snippet;
    };
</script>

<script lang="ts">
    const {
        children,
        class: className,
        ...timeProps
    }: TimelineTimeProps = $props();
</script>

<time
    data-slot="timeline-time"
    {...timeProps}
    class={cn('text-xs text-muted-foreground', className)}
    >{@render children?.()}
</time>
