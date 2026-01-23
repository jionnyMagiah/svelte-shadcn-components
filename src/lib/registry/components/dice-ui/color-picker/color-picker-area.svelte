<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';
    import {
        ColorPickerContext,
        ColorPickerStoreContext
    } from './context.svelte';
    import { hsvToRgb, type HSVColorValue } from './utils';
    import { cn } from '$lib/utils';

    interface ColorPickerAreaProps extends HTMLAttributes<HTMLDivElement> {
        ref?: HTMLDivElement | null;
    }
</script>

<script lang="ts">
    let {
        children,
        onpointerdown: onPointerDownProp,
        onpointermove: onPointerMoveProp,
        onpointerup: onPointerUpProp,
        class: className,
        ref,
        ...areaProps
    }: ColorPickerAreaProps = $props();

    const context = ColorPickerContext.get();
    const store = ColorPickerStoreContext.get();

    const hsv = $derived(store.getState().hsv);

    let isDragging = $state(false);

    const updateColorFromPosition = (clientX: number, clientY: number) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const y = Math.max(
            0,
            Math.min(1, 1 - (clientY - rect.top) / rect.height)
        );

        const newHsv: HSVColorValue = {
            h: hsv?.h ?? 0,
            s: Math.round(x * 100),
            v: Math.round(y * 100),
            a: hsv?.a ?? 1
        };

        store.setHsv(newHsv);
        store.setColor(hsvToRgb(newHsv));
    };

    const onPointerDown = (
        event: PointerEvent & { currentTarget: HTMLDivElement & EventTarget }
    ) => {
        if (context.opts.disabled?.current) return;
        onPointerDownProp?.(event);
        if (event.defaultPrevented) return;

        isDragging = true;
        ref?.setPointerCapture(event.pointerId);
        updateColorFromPosition(event.clientX, event.clientY);
    };

    const onPointerMove = (
        event: PointerEvent & { currentTarget: HTMLDivElement & EventTarget }
    ) => {
        onPointerMoveProp?.(event);
        if (event.defaultPrevented) return;

        if (isDragging) {
            updateColorFromPosition(event.clientX, event.clientY);
        }
    };

    const onPointerUp = (
        event: PointerEvent & { currentTarget: HTMLDivElement & EventTarget }
    ) => {
        onPointerUpProp?.(event);
        if (event.defaultPrevented) return;

        isDragging = false;
        ref?.releasePointerCapture(event.pointerId);
    };

    const hue = $derived(hsv.h ?? 0);
    const backgroundHue = $derived(hsvToRgb({ h: hue, s: 100, v: 100, a: 1 }));
</script>

<div
    data-slot="color-picker-area"
    {...areaProps}
    class={cn(
        'relative h-40 w-full cursor-crosshair touch-none rounded-sm border',
        context.opts.disabled?.current && 'pointer-events-none opacity-50',
        className
    )}
    bind:this={ref}
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
>
    <div class="absolute inset-0 overflow-hidden rounded-sm">
        <div
            class="absolute inset-0"
            style:background-color={`rgb(${backgroundHue.r}, ${backgroundHue.g}, ${backgroundHue.b})`}
        ></div>
        <div
            class="absolute inset-0"
            style:background="linear-gradient(to right, #fff, transparent)"
        ></div>
        <div
            class="absolute inset-0"
            style:background="linear-gradient(to bottom, transparent, #000)"
        ></div>
    </div>
    <div
        class="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
        style:left={`${hsv?.s ?? 0}%`}
        style:top={`${100 - (hsv?.v ?? 0)}%`}
    ></div>
</div>
