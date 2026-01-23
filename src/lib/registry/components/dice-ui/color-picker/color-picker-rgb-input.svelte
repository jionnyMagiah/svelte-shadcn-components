<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { ColorPickerInputProps } from './color-picker-input.svelte';
    import type { ColorPickerContextState } from './context.svelte';
    import InputGroupItem from './input-group-item.svelte';
    import { type ColorValue } from './utils';
    interface ColorPickerRgbInputProps extends ColorPickerInputProps {
        color: ColorValue;
        onColorChange: (color: ColorValue) => void;
        context: ColorPickerContextState;
    }
</script>

<script lang="ts">
    let {
        color,
        onColorChange,
        context,
        withoutAlpha,
        class: className,
        ...inputProps
    }: ColorPickerRgbInputProps = $props();

    const rValue = $derived(Math.round(color?.r ?? 0));
    const gValue = $derived(Math.round(color?.g ?? 0));
    const bValue = $derived(Math.round(color?.b ?? 0));
    const alphaValue = $derived(Math.round((color?.a ?? 1) * 100));

    let rInput = $state('');
    let gInput = $state('');
    let bInput = $state('');
    let alphaInput = $state('');

    let inputRgb = $state('');
    const onChannelChange =
        (channel: 'r' | 'g' | 'b' | 'a', max: number, isAlpha = false) =>
        () => {
            const value = Number.parseInt(inputRgb, 10);
            if (!Number.isNaN(value) && value >= 0 && value <= max) {
                const newValue = isAlpha ? value / 100 : value;
                onColorChange({ ...color, [channel]: newValue });
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
        aria-label="Red color component (0-255)"
        placeholder="0"
        inputmode="numeric"
        pattern="[0-9]*"
        min="0"
        max="255"
        class="w-14"
        bind:value={
            () => rValue,
            (v) => {
                rInput = v.toString();
            }
        }
        onchange={onChannelChange('r', 255)}
        disabled={context.opts.disabled?.current}
    />
    <InputGroupItem
        {...inputProps}
        position="middle"
        aria-label="Green color component (0-255)"
        placeholder="0"
        inputmode="numeric"
        pattern="[0-9]*"
        min="0"
        max="255"
        class="w-14"
        bind:value={
            () => gValue,
            (v) => {
                gInput = v.toString();
            }
        }
        onchange={onChannelChange('g', 255)}
        disabled={context.opts.disabled?.current}
    />
    <InputGroupItem
        {...inputProps}
        position={withoutAlpha ? 'last' : 'middle'}
        aria-label="Blue color component (0-255)"
        placeholder="0"
        inputmode="numeric"
        pattern="[0-9]*"
        min="0"
        max="255"
        class="w-14"
        bind:value={
            () => bValue,
            (v) => {
                bInput = v.toString();
            }
        }
        onchange={onChannelChange('b', 255)}
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
            bind:value={
                () => alphaValue,
                (v) => {
                    alphaInput = v.toString();
                }
            }
            onchange={onChannelChange('a', 100, true)}
            disabled={context.opts.disabled?.current}
        />
    {/if}
</div>
