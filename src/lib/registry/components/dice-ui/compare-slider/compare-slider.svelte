<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { ARROW_KEYS, clamp, PAGE_KEYS, type Interaction } from './utils';
    import type { Orientation } from 'bits-ui';
    import {
        CompareSliderContextState,
        CompareSliderStoreContextState
    } from './context.svelte';
    import { boxWith } from 'svelte-toolbelt';
    import { watch } from 'runed';
    import { cn } from '$lib/utils';

    type CompareSliderProps = HTMLAttributes<HTMLDivElement> & {
        value?: number;
        defaultValue?: number;
        onValueChange?: (value: number) => void;
        step?: number;
        interaction?: Interaction;
        orientation?: Orientation;
        ref?: HTMLDivElement | null;
    };
    let {
        value: valueProp,
        defaultValue = 50,
        onValueChange,
        step = 1,
        interaction = 'drag',
        orientation = 'horizontal',
        class: className,
        children,
        ref = $bindable(),
        onpointermove: onPointerMoveProp,
        onpointerup: onPointerUpProp,
        onpointerdown: onPointerDownProp,
        onkeydown: onKeyDownProp,
        // asChild // todo: child snippet,
        ...rootProps
    }: CompareSliderProps = $props();

    const store = CompareSliderStoreContextState.create({
        state: boxWith(() => ({
            isDragging: false,
            value: clamp(valueProp ?? defaultValue, 0, 100)
        })),
        onValueChange: boxWith(() => onValueChange)
    });

    let isDragging = $state(false);

    watch([() => valueProp], () => {
        if (valueProp !== undefined) {
            store.setState('value', clamp(valueProp, 0, 100));
        }
    });
    const onPointerMove = (
        event: PointerEvent & { currentTarget: HTMLDivElement & EventTarget }
    ) => {
        if (!isDragging && interaction === 'drag') {
            return;
        }
        if (!ref) return;

        onPointerMoveProp?.(event);
        if (event.defaultPrevented) return;

        const rootRect = ref.getBoundingClientRect();
        const isVertical = orientation === 'vertical';
        const position = isVertical
            ? event.clientY - rootRect.top
            : event.clientX - rootRect.left;
        const size = isVertical ? rootRect.height : rootRect.width;
        const percentage = clamp((position / size) * 100, 0, 100);

        store.setState('value', percentage);
    };

    const onPointerDown = (
        event: PointerEvent & { currentTarget: HTMLDivElement & EventTarget }
    ) => {
        if (interaction !== 'drag') return;

        onPointerDownProp?.(event);
        if (event.defaultPrevented) return;

        event.currentTarget.setPointerCapture(event.pointerId);
        isDragging = true;
        store.setState('isDragging', true);
    };

    const onPointerUp = (
        event: PointerEvent & { currentTarget: HTMLDivElement & EventTarget }
    ) => {
        if (interaction !== 'drag') return;

        onPointerUpProp?.(event);
        if (event.defaultPrevented) return;

        event.currentTarget.releasePointerCapture(event.pointerId);
        isDragging = false;
        store.setState('isDragging', false);
    };

    const onKeyDown = (
        event: KeyboardEvent & { currentTarget: HTMLDivElement & EventTarget }
    ) => {
        onKeyDownProp?.(event);
        if (event.defaultPrevented) return;

        const currentValue = store.getState().value;
        const isVertical = orientation === 'vertical';

        if (event.key === 'Home') {
            event.preventDefault();
            store.setState('value', 0);
        } else if (event.key === 'End') {
            event.preventDefault();
            store.setState('value', 100);
        } else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
            event.preventDefault();

            const isPageKey = PAGE_KEYS.includes(event.key);
            const isSkipKey =
                isPageKey || (event.shiftKey && ARROW_KEYS.includes(event.key));
            const multiplier = isSkipKey ? 10 : 1;

            let direction = 0;
            if (isVertical) {
                const isDecreaseKey = ['ArrowUp', 'PageUp'].includes(event.key);
                direction = isDecreaseKey ? -1 : 1;
            } else {
                const isDecreaseKey = ['ArrowLeft', 'PageUp'].includes(
                    event.key
                );
                direction = isDecreaseKey ? -1 : 1;
            }

            const stepInDirection = step * multiplier * direction;
            const newValue = clamp(currentValue + stepInDirection, 0, 100);
            store.setState('value', newValue);
        }
    };

    const context = CompareSliderContextState.create({
        interaction: boxWith(() => interaction),
        orientation: boxWith(() => orientation)
    });
</script>

<div
    role="slider"
    aria-orientation={orientation}
    aria-valuemax={100}
    aria-valuemin={0}
    aria-valuenow={valueProp}
    data-slot="compare-slider"
    data-orientation={orientation}
    {...rootProps}
    bind:this={ref}
    tabindex={0}
    class={cn(
        'relative isolate touch-none overflow-hidden transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        orientation === 'horizontal' ? 'w-full' : 'h-full',
        className
    )}
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointercancel={onPointerUp}
    onkeydown={onKeyDown}
>
    {@render children?.()}
</div>
