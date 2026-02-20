<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '$lib/utils.js';

    let {
        class: className,
        children,
        ...restProps
    }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h4
    class={cn(
        'mt-8 -mb-2 scroll-m-20 border-b pb-1 text-lg font-medium',
        className
    )}
    {...restProps}
>
    {@render children?.()}
</h4>
