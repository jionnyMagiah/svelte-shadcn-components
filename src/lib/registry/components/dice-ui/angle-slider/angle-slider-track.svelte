<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';
    import { SliderStoreContext } from './context.svelte';
    import { cn } from '$lib/utils';

    interface AngleSliderTrackProps extends HTMLAttributes<SVGSVGElement> {}
</script>

<script lang="ts">
    const {
        class: className,
        children,
        ...trackProps
    }: AngleSliderTrackProps = $props();

    const store = SliderStoreContext.get();

    const disabled = $derived(store.stateRef.disabled);
    const size = $derived(store.stateRef.size);
    const thickness = $derived(store.stateRef.thickness);
    const startAngle = $derived(store.stateRef.startAngle);
    const endAngle = $derived(store.stateRef.endAngle);

    const center = $derived(size + 20);
    const trackRadius = $derived(size);

    const totalAngle = $derived((endAngle - startAngle + 360) % 360 || 360);
    const isFullCircle = $derived(totalAngle >= 359);

    const startRadians = $derived((startAngle * Math.PI) / 180);
    const endRadians = $derived((endAngle * Math.PI) / 180);

    const startX = $derived(center + trackRadius * Math.cos(startRadians));
    const startY = $derived(center + trackRadius * Math.sin(startRadians));
    const endX = $derived(center + trackRadius * Math.cos(endRadians));
    const endY = $derived(center + trackRadius * Math.sin(endRadians));

    const largeArcFlag = $derived(totalAngle > 180 ? 1 : 0);
</script>

<svg
    aria-hidden="true"
    focusable="false"
    data-disabled={disabled ? '' : undefined}
    data-slot="angle-slider-track"
    width={center * 2}
    height={center * 2}
    {...trackProps}
    class={cn('absolute inset-0', className)}
>
    {#if isFullCircle}
        <circle
            data-slot="angle-slider-track-rail"
            cx={center}
            cy={center}
            r={trackRadius}
            fill="none"
            stroke="currentColor"
            stroke-width={thickness}
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
            class="stroke-muted"
        />
    {:else}
        <path
            data-slot="angle-slider-track-rail"
            d={`M ${startX} ${startY} A ${trackRadius} ${trackRadius} 0 ${largeArcFlag} 1 ${endX} ${endY}`}
            fill="none"
            stroke="currentColor"
            stroke-width={thickness}
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
            class="stroke-muted"
        />
    {/if}
    {@render children?.()}
</svg>
