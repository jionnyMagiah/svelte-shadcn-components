<script lang="ts" module>
    import Input from '$lib/components/ui/input/input.svelte';
    import type { ComponentProps } from 'svelte';
    import ColorPickerHexInput from './color-picker-hex-input.svelte';
    import ColorPickerHsbInput from './color-picker-hsb-input.svelte';
    import ColorPickerHslInput from './color-picker-hsl-input.svelte';
    import ColorPickerRgbInput from './color-picker-rgb-input.svelte';
    import {
        ColorPickerContext,
        ColorPickerStoreContext
    } from './context.svelte';
    import { rgbToHsv, type ColorValue } from './utils';

    type InputProps = ComponentProps<typeof Input> & { type?: 'text' };
    export type ColorPickerInputProps = Omit<
        InputProps,
        'value' | 'onchange' | 'color'
    > & {
        withoutAlpha?: boolean;
    };
</script>

<script lang="ts">
    let props: ColorPickerInputProps = $props();

    const context = ColorPickerContext.get();
    const store = ColorPickerStoreContext.get();

    const color = $derived(store.stateRef.color);
    const format = $derived(store.stateRef.format);
    const hsv = $derived(store.stateRef.hsv);

    const onColorChange = (newColor: ColorValue) => {
        const newHsv = rgbToHsv(newColor);
        store.setColor(newColor);
        store.setHsv(newHsv);
    };
</script>

{#if format === 'hex'}
    <ColorPickerHexInput {color} {onColorChange} {context} {...props} />
{:else if format === 'rgb'}
    <ColorPickerRgbInput {color} {onColorChange} {context} {...props} />
{:else if format === 'hsl'}
    <ColorPickerHslInput {color} {onColorChange} {context} {...props} />
{:else if format === 'hsb'}
    <ColorPickerHsbInput {hsv} {onColorChange} {context} {...props} />
{/if}
