<script lang="ts">
    import { cn } from '$lib/utils';
    import { mergeProps } from 'bits-ui';
    import { GaugeContext } from './context.svelte';
    import type { GaugeIndicatorProps } from './utils';

    let {
        class: className,
        children,
        ...indicatorProps
    }: GaugeIndicatorProps = $props();

    const context = $derived(GaugeContext.get());

    const size = $derived(context.opts.size.current);
    const state = $derived(context.opts.state.current);
    const value = $derived(context.opts.value.current);
    const max = $derived(context.opts.max.current);
    const min = $derived(context.opts.min.current);
    const percentage = $derived(context.opts.percentage.current);

    const mergedProps = $derived(
        mergeProps(
            {
                'aria-hidden': true,
                focusable: 'false',
                viewBox: `0 0 ${size} ${size}`,
                'data-state': state,
                'data-value': value ?? undefined,
                'data-max': max,
                'data-min': min,
                'data-percentage': percentage,
                width: size,
                height: size,
                class: cn('transform', className)
            },
            indicatorProps
        )
    );
</script>

<svg {...mergedProps}>
    {@render children?.()}
</svg>
