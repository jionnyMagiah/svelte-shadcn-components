<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';
    import { SliderContext, SliderStoreContext } from './context.svelte';
    import { cn } from '$lib/utils';
    import VisuallyHiddenInput from '$lib/registry/utils/dice-ui/visually-hidden-input.svelte';

    interface AngleSliderThumbProps extends HTMLAttributes<HTMLDivElement> {
        index?: number;
        ref?: HTMLDivElement;
    }
</script>

<script lang="ts">
    let {
        index: indexProp,
        class: className,
        children,
        ref,
        onfocus: onFocusProp,
        ...thumbProps
    }: AngleSliderThumbProps = $props();

    const context = SliderContext.get();
    const store = SliderStoreContext.get();

    const values = $derived(store.stateRef.values);
    const min = $derived(store.stateRef.min);
    const max = $derived(store.stateRef.max);
    const step = $derived(store.stateRef.step);
    const disabled = $derived(store.stateRef.disabled);
    const size = $derived(store.stateRef.size);

    const thumbId = $props.id();

    const isFormControl = $derived(
        ref ? context.opts.form?.current || !!ref.closest('form') : true
    );

    const index = $derived(indexProp ?? 0);
    const value = $derived(values[index]);

    $effect(() => {
        if (ref && value !== undefined) {
            store.addThumb(index, {
                id: thumbId,
                element: ref,
                index,
                value
            });

            return () => {
                store.removeThumb(index);
            };
        }
    });

    const thumbStyle = $derived.by(() => {
        if (value === undefined) return '';

        const angle = store.getAngleFromValue(value);
        const position = store.getPositionFromAngle(angle);
        const center = size + 20;

        return `position: absolute; left: ${center + position.x}px; top: ${center + position.y}px; transform: translate(-50%, -50%);`;
    });

    function onFocus(
        event: FocusEvent & { currentTarget: EventTarget & HTMLDivElement }
    ) {
        onFocusProp?.(event);
        if (event.defaultPrevented) return;

        store.setState('valueIndexToChange', index);
    }

    const empty = $derived(value === undefined);
</script>

{#if !empty}
    <span style={thumbStyle}>
        <div
            id={thumbId}
            role="slider"
            aria-valuemin={min}
            aria-valuenow={value}
            aria-valuemax={max}
            aria-orientation="vertical"
            data-disabled={disabled ? '' : undefined}
            data-slot="angle-slider-thumb"
            tabIndex={disabled ? undefined : 0}
            {...thumbProps}
            bind:this={ref}
            class={cn(
                'block size-4 shrink-0 rounded-full border border-primary bg-background shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50',
                className
            )}
            onfocus={onFocus}
        >
            {@render children?.()}
        </div>
        {#if isFormControl && value !== undefined}
            <VisuallyHiddenInput
                bind:control={ref}
                name={context.opts.name?.current
                    ? context.opts.name?.current +
                      (values.length > 1 ? '[]' : '')
                    : undefined}
                form={context.opts.form?.current}
                value={value.toString()}
                type="number"
                {min}
                {max}
                {step}
                {disabled}
            />
        {/if}
    </span>
{/if}
