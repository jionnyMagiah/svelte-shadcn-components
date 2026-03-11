<script lang="ts">
    import { cn } from '$lib/utils';
    import { mergeProps } from 'bits-ui';
    import { GaugeContext } from './context.svelte';
    import { describeArc, type GaugeTrackProps } from './utils';

    let {
        class: className,
        children,
        ...trackProps
    }: GaugeTrackProps = $props();

    const context = $derived(GaugeContext.get());

    const center = $derived(context.opts.center.current);
    const radius = $derived(context.opts.radius.current);
    const startAngle = $derived(context.opts.startAngle.current);
    const endAngle = $derived(context.opts.endAngle.current);
    const thickness = $derived(context.opts.thickness.current);
    const state = $derived(context.opts.state.current);

    const pathData = $derived(
        describeArc(center, center, radius, startAngle, endAngle)
    );

    const mergedProps = $derived(
        mergeProps(
            {
                'data-state': state,
                d: pathData,
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': thickness,
                'stroke-linecap': 'round',
                'vector-effect': 'non-scaling-stroke',
                class: cn('text-muted-foreground/20', className)
            },
            trackProps
        )
    );
</script>

<path {...mergedProps}>
    {@render children?.()}
</path>
