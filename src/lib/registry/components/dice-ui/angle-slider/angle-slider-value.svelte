<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';
    import { SliderContext, SliderStoreContext } from './context.svelte';
    import { cn } from '$lib/utils';
    import { mergeProps } from 'svelte-toolbelt';

    interface AngleSliderValueProps extends HTMLAttributes<HTMLDivElement> {
        unit?: string;
        formatValue?: (value: number | number[]) => string;
    }
</script>

<script lang="ts">
    let {
        unit = '°',
        formatValue,
        class: className,
        style,
        children,
        ...valueProps
    }: AngleSliderValueProps = $props();

    const context = SliderContext.get();
    const store = SliderStoreContext.get();

    const values = $derived(store.stateRef.values);
    const min = $derived(store.stateRef.min);
    const max = $derived(store.stateRef.max);
    const step = $derived(store.stateRef.step);
    const disabled = $derived(store.stateRef.disabled);
    const size = $derived(store.stateRef.size);

    const center = $derived(size + 20);

    const displayValue = $derived.by(() => {
        if (formatValue) {
            return formatValue(values.length === 1 ? (values[0] ?? 0) : values);
        }

        if (values.length === 1) {
            return `${values[0] ?? 0}${unit}`;
        }

        const sortedValues = [...values].sort((a, b) => a - b);
        return `${sortedValues[0]}${unit} - ${sortedValues[sortedValues.length - 1]}${unit}`;
    });

    const valueStyle = $derived(
        `position: absolute; left: ${center}px; top: ${center}px; transform: translate(-50%, -50%);`
    );

    const mergedProps = $derived(
        mergeProps(
            {
                'data-disabled': disabled ? true : undefined,
                'data-slot': 'angle-slider-value',
                class: cn(
                    'pointer-events-none flex select-none items-center justify-center font-medium text-foreground text-sm',
                    className
                )
            },
            { style: valueStyle },
            { style },
            valueProps
        )
    );
</script>

<div {...mergedProps}>
    {#if children}
        {@render children?.()}
    {:else}
        {displayValue}
    {/if}
</div>
