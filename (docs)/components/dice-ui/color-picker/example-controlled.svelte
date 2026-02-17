<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
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

    const presetColors = [
        '#ef4444', // red
        '#f97316', // orange
        '#eab308', // yellow
        '#22c55e', // green
        '#3b82f6', // blue
        '#8b5cf6', // violet
        '#ec4899', // pink
        '#64748b' // gray
    ];

    let color = $state('#3b82f6');
    let isOpen = $state(false);

    const onReset = () => {
        color = '#000000';
        isOpen = false;
    };

    const onPresetSelect = (presetColor: string) => {
        color = presetColor;
    };
</script>

<div class="flex flex-col gap-4">
    <div class="flex flex-col gap-2 text-sm">
        <div>
            <span class="font-medium">Current color:</span>
            <code class="ml-2 font-mono">{color}</code>
        </div>
        <div>
            <span class="font-medium">Picker state:</span>
            <span class="ml-2">{isOpen ? 'Open' : 'Closed'}</span>
        </div>
    </div>
    <div class="flex items-center gap-3">
        <ColorPickerRoot
            value={color}
            onValueChange={(c) => (color = c)}
            open={isOpen}
            onOpenChange={(o) => (isOpen = o)}
            defaultFormat="hex"
        >
            <ColorPickerTrigger>
                {#snippet child({ props })}
                    <Button
                        variant="outline"
                        class="flex items-center gap-2"
                        {...props}
                    >
                        <ColorPickerSwatch class="size-4" />
                        Pick Color
                    </Button>
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

        <Button variant="outline" onclick={onReset}>Reset</Button>
    </div>

    <div class="flex flex-col gap-2">
        <span class="text-sm font-medium">Preset Colors</span>
        <div class="flex flex-wrap gap-2">
            {#each presetColors as presetColor (presetColor)}
                <button
                    type="button"
                    class="size-8 rounded border-2 border-transparent hover:border-border focus:border-ring focus:outline-none"
                    style:background-color={presetColor}
                    onclick={() => onPresetSelect(presetColor)}
                    aria-label={`Select color ${presetColor}`}
                ></button>
            {/each}
        </div>
    </div>
</div>
