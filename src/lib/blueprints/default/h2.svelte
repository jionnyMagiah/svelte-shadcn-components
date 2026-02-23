<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { cn } from '$lib/utils.js';

    let {
        class: className,
        children,
        ...restProps
    }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h2
    class={cn(
        'mt-12 mb-4 scroll-m-20 border-b pb-1 text-3xl font-semibold',
        className
    )}
    {...restProps}
>
    {@render children?.()}
</h2>
