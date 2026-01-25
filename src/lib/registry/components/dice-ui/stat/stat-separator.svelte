<script lang="ts" module>
    import { Separator as SeparatorPrimitive } from 'bits-ui';
    import { cn } from '$lib/utils.js';
    import type { SeparatorRootProps } from 'bits-ui';

    type StatSeparatorProps = SeparatorRootProps;
</script>

<script lang="ts">
    let {
        ref = $bindable(null),
        class: className,
        'data-slot': dataSlot = 'stat-separator',
        ...restProps
    }: StatSeparatorProps = $props();
</script>

<SeparatorPrimitive.Root
    bind:ref
    data-slot={dataSlot}
    class={cn(
        'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:min-h-full data-[orientation=vertical]:w-px',
        'my-2',
        className
    )}
    {...restProps}
/>
