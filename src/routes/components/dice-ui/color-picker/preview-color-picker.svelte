<script lang="ts">
    import ColorPickerAlphaSlider from '$lib/registry/components/dice-ui/color-picker/color-picker-alpha-slider.svelte';
    import ColorPickerArea from '$lib/registry/components/dice-ui/color-picker/color-picker-area.svelte';
    import ColorPickerContent from '$lib/registry/components/dice-ui/color-picker/color-picker-content.svelte';
    import ColorPickerEyeDropper from '$lib/registry/components/dice-ui/color-picker/color-picker-eye-dropper.svelte';
    import ColorPickerFormatSelect from '$lib/registry/components/dice-ui/color-picker/color-picker-format-select.svelte';
    import ColorPickerHueSlider from '$lib/registry/components/dice-ui/color-picker/color-picker-hue-slider.svelte';
    import ColorPickerInput from '$lib/registry/components/dice-ui/color-picker/color-picker-input.svelte';
    import ColorPickerRoot from '$lib/registry/components/dice-ui/color-picker/color-picker-root.svelte';
    import ColorPickerSwatch from '$lib/registry/components/dice-ui/color-picker/color-picker-swatch.svelte';
    import ColorPickerTrigger from '$lib/registry/components/dice-ui/color-picker/color-picker-trigger.svelte';
</script>

<ColorPickerRoot defaultFormat="hex" defaultValue="#3b82f6">
    <ColorPickerTrigger>
        {#snippet child({ props })}
            <ColorPickerSwatch {...props} />
        {/snippet}
    </ColorPickerTrigger>
    <ColorPickerContent>
        <ColorPickerArea />
        <div class="flex items-center gap-2">
            <ColorPickerEyeDropper />
            <div class="flex flex-1 flex-col gap-2">
                <ColorPickerHueSlider />
                <ColorPickerAlphaSlider />
            </div>
        </div>
        <div class="flex items-center gap-2">
            <ColorPickerFormatSelect />
            <ColorPickerInput />
        </div>
    </ColorPickerContent>
</ColorPickerRoot>
