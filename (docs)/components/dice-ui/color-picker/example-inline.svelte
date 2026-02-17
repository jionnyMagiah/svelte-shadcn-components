<script lang="ts">
    import ColorPickerAlphaSlider from '$lib/registry/components/dice-ui/color-picker/color-picker-alpha-slider.svelte';
    import ColorPickerArea from '$lib/registry/components/dice-ui/color-picker/color-picker-area.svelte';
    import ColorPickerEyeDropper from '$lib/registry/components/dice-ui/color-picker/color-picker-eye-dropper.svelte';
    import ColorPickerFormatSelect from '$lib/registry/components/dice-ui/color-picker/color-picker-format-select.svelte';
    import ColorPickerHueSlider from '$lib/registry/components/dice-ui/color-picker/color-picker-hue-slider.svelte';
    import ColorPickerInput from '$lib/registry/components/dice-ui/color-picker/color-picker-input.svelte';
    import ColorPickerRoot from '$lib/registry/components/dice-ui/color-picker/color-picker-root.svelte';
    import ColorPickerSwatch from '$lib/registry/components/dice-ui/color-picker/color-picker-swatch.svelte';

    let color = $state('#f59e0b');
</script>

<ColorPickerRoot
    value={color}
    onValueChange={(v) => (color = v)}
    inline
    defaultFormat="hex"
>
    <div class="flex flex-col gap-4">
        <div class="flex items-center gap-3">
            <ColorPickerSwatch class="size-8" />
            <span class="text-sm font-medium">Selected Color</span>
        </div>
        <div class="flex flex-col gap-4 rounded-lg border p-4">
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
        </div>
    </div>
</ColorPickerRoot>
