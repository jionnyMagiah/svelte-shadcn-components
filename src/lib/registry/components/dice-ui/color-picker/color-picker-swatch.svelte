<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';
    import {
        ColorPickerContext,
        ColorPickerStoreContext
    } from './context.svelte';
    import { colorToString } from './utils';
    import { cn } from '$lib/utils';

    interface ColorPickerSwatchProps extends HTMLAttributes<HTMLDivElement> {}
</script>

<script lang="ts">
    const {
        children,
        class: className,
        ...swatchProps
    }: ColorPickerSwatchProps = $props();

    const context = ColorPickerContext.get();
    const store = ColorPickerStoreContext.get();

    const color = $derived(store.stateRef.color);
    const format = $derived(store.stateRef.format);

    const backgroundStyle = $derived.by(() => {
        if (!color) {
            return 'background: linear-gradient(to bottom right, transparent calc(50% - 1px), hsl(var(--destructive)) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)) no-repeat';
        }

        const colorString = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

        if (color.a < 1) {
            return `background: linear-gradient(${colorString}, ${colorString}), repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0% 50% / 8px 8px`;
        }

        return `background-color: ${colorString}`;
    });

    const ariaLabel = $derived(
        !color
            ? 'No color selected'
            : `Current color: ${colorToString(color, format)}`
    );
</script>

<div
    role="img"
    aria-label={ariaLabel}
    data-slot="color-picker-swatch"
    {...swatchProps}
    class={cn(
        'box-border size-8 rounded-sm border shadow-sm',
        context.opts.disabled?.current && 'opacity-50',
        className
    )}
    style={backgroundStyle}
    style:forced-color-adjust="none"
></div>
