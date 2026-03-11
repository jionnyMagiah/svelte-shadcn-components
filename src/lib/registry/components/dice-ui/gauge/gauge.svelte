<script lang="ts">
    import { cn } from '$lib/utils';
    import { useId } from 'bits-ui';
    import { watch } from 'runed';
    import { boxWith, mergeProps } from 'svelte-toolbelt';
    import { GaugeContextState } from './context.svelte';
    import {
        DEFAULT_END_ANGLE,
        DEFAULT_MAX,
        DEFAULT_START_ANGLE,
        GAUGE_NAME,
        getDefaultValueText,
        getGaugeState,
        getInvalidMaxError,
        getInvalidValueError,
        getIsValidMaxNumber,
        getIsValidNumber,
        getIsValidValueNumber,
        getNormalizedAngle,
        type GaugeProps
    } from './utils';

    let {
        value: valueProp = null,
        getValueText = getDefaultValueText,
        min: minProp = 0,
        max: maxProp,
        size = 120,
        thickness = 8,
        startAngle = DEFAULT_START_ANGLE,
        endAngle = DEFAULT_END_ANGLE,
        children,
        class: className,
        child,
        ...rootProps
    }: GaugeProps = $props();

    const rawMax = $derived(
        getIsValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX
    );
    const min = $derived(getIsValidNumber(minProp) ? minProp : 0);
    const max = $derived(rawMax <= min ? min + 1 : rawMax);

    const value = $derived(
        getIsValidValueNumber(valueProp, min, max)
            ? valueProp
            : getIsValidNumber(valueProp) && valueProp > max
              ? max
              : getIsValidNumber(valueProp) && valueProp < min
                ? min
                : null
    );

    const valueText = $derived(
        getIsValidNumber(value) ? getValueText(value, min, max) : undefined
    );
    const state = $derived(getGaugeState(value, max));
    const radius = $derived(Math.max(0, (size - thickness) / 2));
    const center = $derived(size / 2);

    const angleDiff = $derived(Math.abs(endAngle - startAngle));
    const arcLength = $derived(
        (Math.min(angleDiff, 360) / 360) * (2 * Math.PI * radius)
    );

    const percentage = $derived(
        getIsValidNumber(value)
            ? max === min
                ? 1
                : (value - min) / (max - min)
            : null
    );

    // Calculate the visual center Y of the arc for text positioning
    // For full circles, use geometric center. For partial arcs, calculate based on bounding box
    const angleDiffDeg = $derived(Math.abs(endAngle - startAngle));
    const isFullCircle = $derived(angleDiffDeg >= 360);

    let arcCenterY = $derived.by(() => {
        if (isFullCircle) return center;
        else {
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const startY = center - radius * Math.cos(startRad);
            const endY = center - radius * Math.cos(endRad);

            let minY = Math.min(startY, endY);
            let maxY = Math.max(startY, endY);

            const normStart = getNormalizedAngle(startAngle);
            const normEnd = getNormalizedAngle(endAngle);

            const includesTop =
                normStart > normEnd
                    ? normStart <= 270 || normEnd >= 270
                    : normStart <= 270 && normEnd >= 270;
            const includesBottom =
                normStart > normEnd
                    ? normStart <= 90 || normEnd >= 90
                    : normStart <= 90 && normEnd >= 90;

            if (includesTop) minY = Math.min(minY, center - radius);
            if (includesBottom) maxY = Math.max(maxY, center + radius);

            return (minY + maxY) / 2;
        }
    });

    const labelId = useId('gauge');
    const valueTextId = useId('gauge');

    const context = GaugeContextState.create({
        arcCenterY: boxWith(() => arcCenterY),
        arcLength: boxWith(() => arcLength),
        center: boxWith(() => center),
        endAngle: boxWith(() => endAngle),
        max: boxWith(() => max),
        min: boxWith(() => min),
        percentage: boxWith(() => percentage),
        radius: boxWith(() => radius),
        size: boxWith(() => size),
        startAngle: boxWith(() => startAngle),
        state: boxWith(() => state),
        thickness: boxWith(() => thickness),
        value: boxWith(() => value),
        valueText: boxWith(() => valueText),
        labelId: boxWith(() => labelId),
        valueTextId: boxWith(() => valueTextId)
    });

    watch([() => maxProp], () => {
        if ((maxProp || maxProp === 0) && !getIsValidMaxNumber(maxProp)) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(getInvalidMaxError(`${maxProp}`, GAUGE_NAME));
            }
        }
    });

    watch([() => thickness, () => size], () => {
        if (process.env.NODE_ENV !== 'production' && thickness >= size) {
            console.warn(
                `Gauge: thickness (${thickness}) should be less than size (${size}) for proper rendering.`
            );
        }
    });

    watch([() => valueProp], () => {
        if (valueProp !== null && !getIsValidValueNumber(valueProp, min, max)) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(getInvalidValueError(`${valueProp}`, GAUGE_NAME));
            }
        }
    });

    const mergedProps = $derived(
        mergeProps(
            {
                role: 'meter',
                'aria-describedby': valueText ? valueTextId : undefined,
                'aria-labelledby': labelId,
                'aria-valuemax': max,
                'aria-valuemin': min,
                'aria-valuenow': getIsValidNumber(value) ? value : undefined,
                'aria-valuetext': valueText,
                'data-state': state,
                'data-value': value ?? undefined,
                'data-max': max,
                'data-min': min,
                'data-percentage': percentage,
                class: cn(
                    'relative inline-flex w-fit flex-col items-center justify-center',
                    className
                )
            },
            rootProps
        )
    );
</script>

{#if child}
    {@render child({ props: mergedProps })}
{:else}
    <div {...mergedProps}>
        {@render children?.()}
    </div>
{/if}
