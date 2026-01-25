<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';
    import { CircularProgressContext } from './context.svelte';
    import { cn } from '$lib/utils';

    type CircularProgressTrackProps = HTMLAttributes<SVGCircleElement>;
</script>

<script lang="ts">
    const {
        class: className,
        children,
        ...trackProps
    }: CircularProgressTrackProps = $props();

    const context = CircularProgressContext.get();

    const state = $derived(context.opts.state.current);
    const center = $derived(context.opts.center.current);
    const radius = $derived(context.opts.radius.current);
    const thickness = $derived(context.opts.thickness.current);
</script>

<circle
    data-state={state}
    cx={center}
    cy={center}
    r={radius}
    fill="none"
    stroke="currentColor"
    stroke-width={thickness}
    stroke-linecap="round"
    vector-effect="non-scaling-stroke"
    {...trackProps}
    class={cn('text-muted-foreground/20', className)}
/>
