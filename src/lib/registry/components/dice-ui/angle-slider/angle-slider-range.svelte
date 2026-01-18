<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';
    import { SliderStoreContext } from './context.svelte';
    import { cn } from '$lib/utils';

    interface AngleSliderRangeProps extends HTMLAttributes<SVGPathElement> {}
</script>

<script lang="ts">
    const { class: className, ...rangeProps }: AngleSliderRangeProps = $props();

    const store = SliderStoreContext.get();

    const values = $derived(store.stateRef.values);
    const min = $derived(store.stateRef.min);
    const max = $derived(store.stateRef.max);
    const disabled = $derived(store.stateRef.disabled);
    const size = $derived(store.stateRef.size);
    const thickness = $derived(store.stateRef.thickness);
    const startAngle = $derived(store.stateRef.startAngle);
    const endAngle = $derived(store.stateRef.endAngle);

    const center = $derived(size + 20);
    const trackRadius = $derived(size);

    const sortedValues = $derived([...values].sort((a, b) => a - b));

    const rangeStart = $derived(
        values.length <= 1 ? min : (sortedValues[0] ?? min)
    );
    const rangeEnd = $derived(
        values.length <= 1
            ? (sortedValues[0] ?? min)
            : (sortedValues[sortedValues.length - 1] ?? max)
    );

    const rangeStartPercent = $derived((rangeStart - min) / (max - min));
    const rangeEndPercent = $derived((rangeEnd - min) / (max - min));

    const totalAngle = $derived((endAngle - startAngle + 360) % 360 || 360);
    const rangeStartAngle = $derived(
        startAngle + rangeStartPercent * totalAngle
    );
    const rangeEndAngle = $derived(startAngle + rangeEndPercent * totalAngle);

    const rangeStartRadians = $derived((rangeStartAngle * Math.PI) / 180);
    const rangeEndRadians = $derived((rangeEndAngle * Math.PI) / 180);

    const startX = $derived(center + trackRadius * Math.cos(rangeStartRadians));
    const startY = $derived(center + trackRadius * Math.sin(rangeStartRadians));
    const endX = $derived(center + trackRadius * Math.cos(rangeEndRadians));
    const endY = $derived(center + trackRadius * Math.sin(rangeEndRadians));

    const rangeAngle = $derived((rangeEndAngle - rangeStartAngle + 360) % 360);
    const largeArcFlag = $derived(rangeAngle > 180 ? 1 : 0);

    const empty = $derived(rangeStart === rangeEnd);
</script>

{#if !empty}
    <path
        data-disabled={disabled ? '' : undefined}
        data-slot="angle-slider-range"
        d={`M ${startX} ${startY} A ${trackRadius} ${trackRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`}
        fill="none"
        stroke="currentColor"
        stroke-width={thickness}
        stroke-linecap="round"
        vector-effect="non-scaling-stroke"
        {...rangeProps}
        class={cn('stroke-primary', className)}
    />
{/if}
