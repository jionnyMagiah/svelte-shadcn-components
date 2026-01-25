<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { ColorPickerInputProps } from './color-picker-input.svelte';
    import type { ColorPickerContextState } from './context.svelte';
    import InputGroupItem from './input-group-item.svelte';
    import { parseColorString, rgbToHex, type ColorValue } from './utils';
    type ColorPickerHexInputProps = ColorPickerInputProps & {
        color: ColorValue;
        onColorChange: (color: ColorValue) => void;
        context: ColorPickerContextState;
    };
</script>

<script lang="ts">
    let {
        color,
        onColorChange,
        context,
        withoutAlpha,
        class: className,
        ...inputProps
    }: ColorPickerHexInputProps = $props();

    const hexValue = $derived(rgbToHex(color));
    const alphaValue = $derived(Math.round((color?.a ?? 1) * 100));

    const onHexChange = (
        event: Event & { currentTarget: EventTarget & HTMLInputElement }
    ) => {
        const value = (event.target as HTMLInputElement).value;
        const parsedColor = parseColorString(value);
        if (parsedColor) {
            onColorChange({ ...parsedColor, a: color?.a ?? 1 });
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

{#if withoutAlpha}
    <InputGroupItem
        {...inputProps}
        position="isolated"
        aria-label="Hex color value"
        placeholder="#000000"
        class={cn('font-mono', className)}
        value={hexValue}
        onchange={onHexChange}
        disabled={context.opts.disabled?.current}
    />
{:else}
    <div
        data-slot="color-picker-input-wrapper"
        class={cn('flex items-center', className)}
    >
        <InputGroupItem
            {...inputProps}
            position="first"
            aria-label="Hex color value"
            placeholder="#000000"
            class="flex-1 font-mono"
            value={hexValue}
            onchange={onHexChange}
            disabled={context.opts.disabled?.current}
        />
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
    </div>
{/if}
