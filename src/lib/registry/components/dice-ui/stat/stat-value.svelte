<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    type StatValueProps = HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
    let { class: className, children, ...props }: StatValueProps = $props();
</script>

<div
    data-slot="stat-value"
    class={cn('text-2xl font-semibold tracking-tight', className)}
    {...props}
>
    {@render children?.()}
</div>
