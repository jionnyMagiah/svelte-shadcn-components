<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    type StatLabelProps = HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
    let { class: className, children, ...props }: StatLabelProps = $props();
</script>

<div
    data-slot="stat-label"
    class={cn('text-sm font-medium text-muted-foreground', className)}
    {...props}
>
    {@render children?.()}
</div>
