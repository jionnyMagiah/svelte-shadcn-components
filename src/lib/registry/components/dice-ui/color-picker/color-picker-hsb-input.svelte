<script lang="ts" module>
    import * as InputGroup from '$lib/components/ui/input-group/index.js';
    import { cn } from '$lib/utils';
    import type { ColorPickerInputProps } from './color-picker-input.svelte';
    import type { ColorPickerContextState } from './context.svelte';
    import InputGroupItem from './input-group-item.svelte';
    import {
        hsvToRgb,
        parseColorString,
        rgbToHex,
        type ColorValue,
        type HSVColorValue
    } from './utils';
    type ColorPickerHsbInputProps = ColorPickerInputProps & {
        hsv: HSVColorValue;
        onColorChange: (color: ColorValue) => void;
        context: ColorPickerContextState;
    };
</script>

<script lang="ts">
    const {
        hsv,
        onColorChange,
        context,
        withoutAlpha,
        class: className,
        ...inputProps
    }: ColorPickerHsbInputProps = $props();

    const alphaValue = $derived(Math.round((hsv?.a ?? 1) * 100));

    let alphaInput = $state('');
    let hsvInput = $state('');

    const onHsvChannelChange =
        (channel: 'h' | 's' | 'v', max: number) => () => {
            const value = Number.parseInt(hsvInput, 10);
            if (!Number.isNaN(value) && value >= 0 && value <= max) {
                const newHsv = { ...hsv, [channel]: value };
                const newColor = hsvToRgb(newHsv);
                onColorChange(newColor);
            }
        };

    const onAlphaChange = () => {
        const value = Number.parseInt(alphaInput, 10);
        if (!Number.isNaN(value) && value >= 0 && value <= 100) {
            const currentColor = hsvToRgb(hsv);
            onColorChange({ ...currentColor, a: value / 100 });
        }
    };
</script>

<div
    data-slot="color-picker-input-wrapper"
    class={cn('flex items-center', className)}
>
    <InputGroupItem
        aria-label="Hue degree (0-360)"
        position="first"
        {...inputProps}
        placeholder="0"
        inputmode="numeric"
        pattern="[0-9]*"
        min="0"
        max="360"
        class="w-14"
        bind:value={() => hsv?.h ?? 0, (v) => (hsvInput = v.toString())}
        onchange={onHsvChannelChange('h', 360)}
        disabled={context.opts.disabled?.current}
    />
    <InputGroupItem
        aria-label="Saturation percentage (0-100)"
        position="middle"
        {...inputProps}
        placeholder="0"
        inputmode="numeric"
        pattern="[0-9]*"
        min="0"
        max="100"
        class="w-14"
        value={hsv?.s ?? 0}
        onchange={onHsvChannelChange('s', 100)}
        disabled={context.opts.disabled?.current}
    />
    <InputGroupItem
        aria-label="Brightness percentage (0-100)"
        position={withoutAlpha ? 'last' : 'middle'}
        {...inputProps}
        placeholder="0"
        inputmode="numeric"
        pattern="[0-9]*"
        min="0"
        max="100"
        class="w-14"
        bind:value={() => hsv?.v ?? 0, (v) => (hsvInput = v.toString())}
        onchange={onHsvChannelChange('v', 100)}
        disabled={context.opts.disabled?.current}
    />
    {#if !withoutAlpha}
        <InputGroupItem
            aria-label="Alpha transparency percentage"
            position="last"
            {...inputProps}
            placeholder="100"
            inputmode="numeric"
            pattern="[0-9]*"
            min="0"
            max="100"
            class="w-14"
            bind:value={
                () => alphaValue ?? 0, (v) => (alphaInput = v.toString())
            }
            onchange={onAlphaChange}
            disabled={context.opts.disabled?.current}
        />
    {/if}
</div>
