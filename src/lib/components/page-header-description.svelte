<script lang="ts">
    import type { PrimitiveAttributes } from '$lib/types.js';
    import { cn } from '$lib/utils.js';

    let {
        class: className,
        children,
        ...restProps
    }: PrimitiveAttributes = $props();
</script>

<p
    class={cn(
        'text-balancea mt-3 text-[18px] leading-7 tracking-[-0.01em] text-muted-foreground!',
        className
    )}
    {...restProps}
>
    {@render children?.()}
</p>
