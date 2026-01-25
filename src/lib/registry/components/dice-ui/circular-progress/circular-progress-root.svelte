<script lang="ts" module>
    import { cn } from '$lib/utils';
    import { boxWith } from 'svelte-toolbelt';
    import type { HTMLAttributes } from 'svelte/elements';
    import { CircularProgressContextValue } from './context.svelte';
    import {
        CIRCULAR_PROGRESS_NAME,
        DEFAULT_MAX,
        getDefaultValueText,
        getInvalidMaxError,
        getInvalidValueError,
        getIsValidMaxNumber,
        getIsValidNumber,
        getIsValidValueNumber,
        getProgressState
    } from './utils';

    interface CircularProgressProps extends HTMLAttributes<HTMLDivElement> {
        value?: number | null | undefined;
        getValueText?(value: number, min: number, max: number): string;
        min?: number;
        max?: number;
        size?: number;
        thickness?: number;
        label?: string;
    }
</script>

<script lang="ts">
    let {
        value: valueProp = null,
        getValueText = getDefaultValueText,
        min: minProp = 0,
        max: maxProp,
        size = 48,
        thickness = 4,
        label,
        class: className,
        children,
        ...rootProps
    }: CircularProgressProps = $props();

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
    const state = $derived(getProgressState(value, max));
    const radius = $derived(Math.max(0, (size - thickness) / 2));
    const center = $derived(size / 2);
    const circumference = $derived(2 * Math.PI * radius);

    const percentage = $derived(
        getIsValidNumber(value)
            ? max === min
                ? 1
                : (value - min) / (max - min)
            : null
    );

    const id = $props.id();
    const labelId = `${id}-label`;
    const valueTextId = `${id}-valuetext`;

    CircularProgressContextValue.create({
        value: boxWith(() => value),
        valueText: boxWith(() => valueText),
        max: boxWith(() => max),
        min: boxWith(() => min),
        state: boxWith(() => state),
        radius: boxWith(() => radius),
        thickness: boxWith(() => thickness),
        size: boxWith(() => size),
        center: boxWith(() => center),
        circumference: boxWith(() => circumference),
        percentage: boxWith(() => percentage),
        valueTextId: boxWith(() => valueTextId)
    });

    $effect(() => {
        if ((maxProp || maxProp === 0) && !getIsValidMaxNumber(maxProp)) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(
                    getInvalidMaxError(`${maxProp}`, CIRCULAR_PROGRESS_NAME)
                );
            }
        }
        if (process.env.NODE_ENV !== 'production' && thickness >= size) {
            console.warn(
                `CircularProgress: thickness (${thickness}) should be less than size (${size}) for proper rendering.`
            );
        }

        if (valueProp !== null && !getIsValidValueNumber(valueProp, min, max)) {
            if (process.env.NODE_ENV !== 'production') {
                console.error(
                    getInvalidValueError(`${valueProp}`, CIRCULAR_PROGRESS_NAME)
                );
            }
        }
    });
</script>

<div
    role="progressbar"
    aria-describedby={valueText ? valueTextId : undefined}
    aria-labelledby={label ? labelId : undefined}
    aria-valuemax={max}
    aria-valuemin={min}
    aria-valuenow={getIsValidNumber(value) ? value : undefined}
    aria-valuetext={valueText}
    data-state={state}
    data-value={value ?? undefined}
    data-max={max}
    data-min={min}
    data-percentage={percentage}
    {...rootProps}
    class={cn(
        'relative inline-flex w-fit items-center justify-center',
        className
    )}
>
    {@render children?.()}
    {#if label}
        <div id={labelId}>{label}</div>
    {/if}
</div>
