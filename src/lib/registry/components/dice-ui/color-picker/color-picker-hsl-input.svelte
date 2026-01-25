<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { ColorPickerInputProps } from './color-picker-input.svelte';
    import type { ColorPickerContextState } from './context.svelte';
    import InputGroupItem from './input-group-item.svelte';
    import { hslToRgb, rgbToHsl, type ColorValue } from './utils';
    type ColorPickerHslInputProps = ColorPickerInputProps & {
        color: ColorValue;
        onColorChange: (color: ColorValue) => void;
        context: ColorPickerContextState;
    };
</script>

<script lang="ts">
    const {
        color,
        onColorChange,
        context,
        withoutAlpha,
        class: className,
        ...inputProps
    }: ColorPickerHslInputProps = $props();

    const hsl = $derived(rgbToHsl(color));
    const alphaValue = $derived(Math.round((color?.a ?? 1) * 100));

    const onHslChannelChange =
        (channel: 'h' | 's' | 'l', max: number) =>
        (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
            const value = Number.parseInt(
                (event.target as HTMLInputElement).value,
                10
            );
            if (!Number.isNaN(value) && value >= 0 && value <= max) {
                const newHsl = { ...hsl, [channel]: value };
                const newColor = hslToRgb(newHsl, color?.a ?? 1);
                onColorChange(newColor);
            }
        };

    const onAlphaChange = (
        event: Event & { currentTarget: EventTarget & HTMLInputElement }
    ) => {
        const value = Number.parseInt(
            (event.target as HTMLInputElement).value,
            10
        );
        if (!Number.isNaN(value) && value >= 0 && value <= 100) {
            onColorChange({ ...color, a: value / 100 });
        }
    };
</script>

<div
    data-slot="color-picker-input-wrapper"
    class={cn('flex items-center', className)}
>
    <InputGroupItem
        {...inputProps}
        position="first"
        aria-label="Hue degree (0-360)"
        placeholder="0"
        inputmode="numeric"
        pattern="[0-9]*"
        min="0"
        max="360"
        class="w-14"
        value={hsl.h}
        onchange={onHslChannelChange('h', 360)}
        disabled={context.opts.disabled?.current}
    />
    <InputGroupItem
        {...inputProps}
        position="middle"
        aria-label="Saturation percentage (0-100)"
        placeholder="0"
        inputmode="numeric"
        pattern="[0-9]*"
        min="0"
        max="100"
        class="w-14"
        value={hsl.s}
        onchange={onHslChannelChange('s', 100)}
        disabled={context.opts.disabled?.current}
    />
    <InputGroupItem
        {...inputProps}
        position={withoutAlpha ? 'last' : 'middle'}
        aria-label="Lightness percentage (0-100)"
        placeholder="0"
        inputmode="numeric"
        pattern="[0-9]*"
        min="0"
        max="100"
        class="w-14"
        value={hsl.l}
        onchange={onHslChannelChange('l', 100)}
        disabled={context.opts.disabled?.current}
    />
    {#if !withoutAlpha}
        <InputGroupItem
            {...inputProps}
            position="last"
            aria-label="Alpha transparency percentage"
            placeholder="100"
            inputmode="numeric"
            pattern="[0-9]*"
            min="0"
            max="100"
            class="w-14"
            value={alphaValue}
            onchange={onAlphaChange}
            disabled={context.opts.disabled?.current}
        />
    {/if}
</div>
