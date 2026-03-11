<script lang="ts">
    import { cn } from '$lib/utils';
    import { mergeProps } from 'bits-ui';
    import { GaugeContext } from './context.svelte';
    import { describeArc, type GaugeRangeProps } from './utils';

    let {
        class: className,
        children,
        ...rangeProps
    }: GaugeRangeProps = $props();

    const context = $derived(GaugeContext.get());

    const arcLength = $derived(context.opts.arcLength.current);
    const center = $derived(context.opts.center.current);
    const endAngle = $derived(context.opts.endAngle.current);
    const max = $derived(context.opts.max.current);
    const min = $derived(context.opts.min.current);
    const percentage = $derived(context.opts.percentage.current);
    const radius = $derived(context.opts.radius.current);
    const startAngle = $derived(context.opts.startAngle.current);
    const state = $derived(context.opts.state.current);
    const thickness = $derived(context.opts.thickness.current);
    const value = $derived(context.opts.value.current);

    const pathData = $derived(
        describeArc(center, center, radius, startAngle, endAngle)
    );

    const strokeDasharray = $derived(arcLength);
    const strokeDashoffset = $derived(
        state === 'indeterminate'
            ? 0
            : percentage !== null
              ? arcLength - percentage * arcLength
              : arcLength
    );

    const mergedProps = $derived(
        mergeProps(
            {
                'data-state': state,
                'data-value': value ?? undefined,
                'data-max': max,
                'data-min': min,
                d: pathData,
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': thickness,
                'stroke-linecap': 'round',
                'stroke-dasharray': strokeDasharray,
                'stroke-dashoffset': strokeDashoffset,
                'vector-effect': 'non-scaling-stroke',
                class: cn(
                    'text-primary transition-[stroke-dashoffset] duration-700 ease-out',
                    className
                )
            },
            rangeProps
        )
    );
</script>

<path {...mergedProps}>
    {@render children?.()}
</path>
