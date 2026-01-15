<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    interface StatTrendProps extends HTMLAttributes<HTMLDivElement> {
        trend?: 'up' | 'down' | 'neutral';
    }
</script>

<script lang="ts">
    let {
        class: className,
        children,
        trend,
        ...props
    }: StatTrendProps = $props();
</script>

<div
    data-slot="stat-trend"
    data-trend={trend}
    class={cn(
        "inline-flex items-center gap-1 text-xs font-medium [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3",
        {
            'text-green-600 dark:text-green-400': trend === 'up',
            'text-red-600 dark:text-red-400': trend === 'down',
            'text-muted-foreground': trend === 'neutral' || !trend
        },
        className
    )}
    {...props}
>
    {@render children?.()}
</div>
