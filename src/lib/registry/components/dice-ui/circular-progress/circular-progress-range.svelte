<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';
    import { CircularProgressContext } from './context.svelte';
    import { cn } from '$lib/utils';

    interface CircularProgressRangeProps extends HTMLAttributes<SVGCircleElement> {}
</script>

<script lang="ts">
    const {
        class: className,
        children,
        ...rangeProps
    }: CircularProgressRangeProps = $props();

    const context = CircularProgressContext.get();

    const state = $derived(context.opts.state.current);
    const center = $derived(context.opts.center.current);
    const radius = $derived(context.opts.radius.current);
    const thickness = $derived(context.opts.thickness.current);
    const circumference = $derived(context.opts.circumference.current);
    const percentage = $derived(context.opts.percentage.current);
    const max = $derived(context.opts.max.current);
    const min = $derived(context.opts.min.current);
    const value = $derived(context.opts.value.current);
    const strokeDasharray = $derived(context.opts.circumference.current);
    const strokeDashoffset = $derived(
        state === 'indeterminate'
            ? circumference * 0.75
            : percentage !== null
              ? circumference - percentage * circumference
              : circumference
    );
</script>

<circle
    data-state={state}
    data-value={value ?? undefined}
    data-max={max}
    data-min={min}
    cx={center}
    cy={center}
    r={radius}
    fill="none"
    stroke="currentColor"
    stroke-width={thickness}
    stroke-linecap="round"
    stroke-dasharray={strokeDasharray}
    stroke-dashoffset={strokeDashoffset}
    vector-effect="non-scaling-stroke"
    {...rangeProps}
    class={cn(
        'origin-center text-primary transition-all duration-300 ease-in-out',
        state === 'indeterminate' &&
            'motion-safe:animate-spin motion-reduce:animate-none',
        className
    )}
/>
