<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';

    export type StatusLabelProps = HTMLAttributes<HTMLDivElement> & {
        children?: Snippet;
    };
</script>

<script lang="ts">
    let {
        children,
        class: className,
        ...labelProps
    }: StatusLabelProps = $props();
</script>

<div
    data-slot="status-label"
    {...labelProps}
    class={cn('leading-none', className)}
>
    {@render children?.()}
</div>
