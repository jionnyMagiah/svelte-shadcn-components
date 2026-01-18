<script lang="ts" module>
    import type { Direction } from 'bits-ui';
    import type { HTMLAttributes } from 'svelte/elements';
    import {
        SliderContextState,
        Store,
    } from './context.svelte';
    import { boxWith, box } from 'svelte-toolbelt';
    import { ARROW_KEYS, getClosestValueIndex, PAGE_KEYS } from './utils';
    import { cn } from '$lib/utils';
    import { SvelteMap } from 'svelte/reactivity';

    interface AngleSliderProps extends Omit<
        HTMLAttributes<HTMLDivElement>,
        'defaultValue'
    > {
        value?: number[];
        defaultValue?: number[];
        onValueChange?: (value: number[]) => void;
        onValueCommit?: (value: number[]) => void;
        min?: number;
        max?: number;
        step?: number;
        minStepsBetweenThumbs?: number;
        size?: number;
        thickness?: number;
        startAngle?: number;
        endAngle?: number;
        dir?: Direction;
        form?: string;
        name?: string;
        disabled?: boolean;
        inverted?: boolean;
        ref?: HTMLDivElement;
    }
</script>

<script lang="ts">
    let {
        value,
        defaultValue = [0],
        onValueChange,
        onValueCommit,
        min = 0,
        max = 100,
        step = 1,
        minStepsBetweenThumbs = 0,
        size = 60,
        thickness = 8,
        startAngle = -90,
        endAngle = 270,
        dir: dirProp = 'ltr',
        form,
        name,
        disabled = false,
        inverted = false,
        children,
        class: className,
        ref,
        onpointermove: onPointerMoveProp,
        onpointerup: onPointerUpProp,
        onpointerdown: onPointerDownProp,
        onkeydown: onKeyDownProp,
        ...rootProps
    }: AngleSliderProps = $props();

    const store = Store.create({
        valueIndexToChange: boxWith(() => 0),
        thumbs: boxWith(() => new SvelteMap()),
        disabled: boxWith(() => disabled),
        endAngle: boxWith(() => endAngle),
        inverted: boxWith(() => inverted),
        max: boxWith(() => max),
        min: boxWith(() => min),
        minStepsBetweenThumbs: boxWith(() => minStepsBetweenThumbs),
        onKeyDown: boxWith(() => onKeyDownProp),
        onPointerDown: boxWith(() => onPointerDownProp),
        onPointerMove: boxWith(() => onPointerMoveProp),
        size: boxWith(() => size),
        startAngle: boxWith(() => startAngle),
        step: boxWith(() => step),
        thickness: boxWith(() => thickness),
        values: boxWith(() => value ?? defaultValue),
        onPointerUp: boxWith(() => onPointerUpProp),
        onValueChange: boxWith(() => onValueChange),
        onValueCommit: boxWith(() => onValueCommit)
    });

    $effect(() => {
        if (value !== undefined) {
            store.setState('values', value);
        }
    });

    $effect(() => {
        const currentState = store.getState();

        if (currentState.min !== min) {
            store.setState('min', min);
        }
        if (currentState.max !== max) {
            store.setState('max', max);
        }
        if (currentState.step !== step) {
            store.setState('step', step);
        }
        if (currentState.minStepsBetweenThumbs !== minStepsBetweenThumbs) {
            store.setState('minStepsBetweenThumbs', minStepsBetweenThumbs);
        }
        if (currentState.size !== size) {
            store.setState('size', size);
        }
        if (currentState.thickness !== thickness) {
            store.setState('thickness', thickness);
        }
        if (currentState.startAngle !== startAngle) {
            store.setState('startAngle', startAngle);
        }
        if (currentState.endAngle !== endAngle) {
            store.setState('endAngle', endAngle);
        }
        if (currentState.disabled !== disabled) {
            store.setState('disabled', disabled);
        }
        if (currentState.inverted !== inverted) {
            store.setState('inverted', inverted);
        }
    });

    let valuesBeforeSlideStartRef = $derived(value ?? defaultValue);

    SliderContextState.create({
        dir: boxWith(() => dirProp),
        name: boxWith(() => name),
        form: boxWith(() => form)
    });

    function onSliderStart(pointerValue: number) {
        if (disabled) return;
        const values = store.getState().values;
        const closestIndex = getClosestValueIndex(values, pointerValue);
        store.setState('valueIndexToChange', closestIndex);
        store.updateValue(pointerValue, closestIndex);
    }

    function onSliderMove(pointerValue: number) {
        if (disabled) return;

        const valueIndexToChange = store.getState().valueIndexToChange;
        store.updateValue(pointerValue, valueIndexToChange);
    }

    function onSliderEnd() {
        if (disabled) return;

        const state = store.getState();
        const prevValue = valuesBeforeSlideStartRef[state.valueIndexToChange];
        const nextValue = state.values[state.valueIndexToChange];
        const hasChanged = nextValue !== prevValue;

        if (hasChanged) {
            onValueCommit?.(state.values);
        }
    }

    function onKeyDown(
        event: KeyboardEvent & { currentTarget: EventTarget & HTMLDivElement }
    ) {
        onKeyDownProp?.(event);
        if (event.defaultPrevented || disabled) return;

        const state = store.getState();
        const { values, valueIndexToChange, min, max, step } = state;
        const currentValue = values[valueIndexToChange] ?? min;

        if (event.key === 'Home') {
            event.preventDefault();
            store.updateValue(min, 0, { commit: true });
        } else if (event.key === 'End') {
            event.preventDefault();
            store.updateValue(max, values.length - 1, { commit: true });
        } else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
            event.preventDefault();

            const isPageKey = PAGE_KEYS.includes(event.key);
            const isSkipKey =
                isPageKey || (event.shiftKey && ARROW_KEYS.includes(event.key));
            const multiplier = isSkipKey ? 10 : 1;

            let direction = 0;
            const isDecreaseKey = ['ArrowLeft', 'ArrowUp', 'PageUp'].includes(
                event.key
            );
            direction = isDecreaseKey ? -1 : 1;
            if (inverted) direction *= -1;

            const stepInDirection = step * multiplier * direction;
            store.updateValue(
                currentValue + stepInDirection,
                valueIndexToChange,
                {
                    commit: true
                }
            );
        }
    }

    function onPointerDown(
        event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement }
    ) {
        onPointerDownProp?.(event);
        if (event.defaultPrevented || disabled) return;

        const target = event.target as HTMLElement;
        
        target.setPointerCapture(event.pointerId);
        event.preventDefault();

        if (!disabled) {
            valuesBeforeSlideStartRef = store.getState().values;

            const thumbs = Array.from(store.getState().thumbs.values());
            const clickedThumb = thumbs.find((thumb) =>
                thumb.element.contains(target)
            );

            if (clickedThumb) {
                clickedThumb.element.focus();
                store.setState('valueIndexToChange', clickedThumb.index);
            } else if (ref) {
                const rect = ref.getBoundingClientRect();
                const pointerValue = store.getValueFromPointer(
                    event.clientX,
                    event.clientY,
                    rect
                );
                onSliderStart(pointerValue);
            }
        }
    }

    function onPointerMove(
        event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement }
    ) {
        onPointerMoveProp?.(event);
        if (event.defaultPrevented || disabled) return;

        const target = event.target as HTMLDivElement;
        if (target.hasPointerCapture(event.pointerId) && ref) {
            
            const rect = ref.getBoundingClientRect();
            const pointerValue = store.getValueFromPointer(
                event.clientX,
                event.clientY,
                rect
            );
            onSliderMove(pointerValue);
        }
    }

    function onPointerUp(
        event: PointerEvent & { currentTarget: EventTarget & HTMLDivElement }
    ) {
        onPointerUpProp?.(event);
        if (event.defaultPrevented) return;

        const target = event.target as HTMLDivElement;
        if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
            onSliderEnd();
        }
    }
</script>

<div
    data-disabled={disabled ? '' : undefined}
    data-slot="angle-slider"
    dir={dirProp}
    {...rootProps}
    bind:this={ref}
    class={cn(
        'relative touch-none select-none',
        disabled && 'opacity-50',
        className
    )}
    style:width={`${size * 2 + 40}px`}
    style:height={`${size * 2 + 40}px`}
    onkeydown={onKeyDown}
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
>
    {@render children?.()}
</div>
