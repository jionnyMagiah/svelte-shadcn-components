<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    interface StatDescriptionProps extends HTMLAttributes<HTMLDivElement> {}
</script>

<script lang="ts">
    let {
        class: className,
        children,
        ...props
    }: StatDescriptionProps = $props();
</script>

<div
    data-slot="stat-description"
    class={cn('text-xs text-muted-foreground', className)}
    {...props}
>
    {@render children?.()}
</div>
