<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    export type TimelineTitleProps = HTMLAttributes<HTMLDivElement> & {
        ref?: HTMLDivElement;
        children?: Snippet;
    };
</script>

<script lang="ts">
    const {
        children,
        class: className,
        ...titleProps
    }: TimelineTitleProps = $props();
</script>

<div
    data-slot="timeline-title"
    {...titleProps}
    class={cn('leading-none font-semibold', className)}
>
    {@render children?.()}
</div>
