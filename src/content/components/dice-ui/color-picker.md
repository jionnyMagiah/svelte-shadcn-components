---
title: Color Picker
description: A color picker component that allows users to select colors using various input methods.
group: Components
section: Dice UI
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
</script>

<CodePreview name='color-picker-preview' />

## Layout

Import the parts, and compose them together.

```svelte showLineNumbers
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

<ColorPickerRoot>
    <ColorPickerTrigger>
        <ColorPickerSwatch />
    </ColorPickerTrigger>
    <ColorPickerContent>
        <ColorPickerArea />
        <ColorPickerEyeDropper />
        <ColorPickerHueSlider />
        <ColorPickerAlphaSlider />
        <ColorPickerFormatSelect />
        <ColorPickerInput />
    </ColorPickerContent>
</ColorPickerRoot>
```

## Notes

The components internally uses some of the shadcn-svelte components:

- [Popover](https://shadcn-svelte.com/docs/components/popover)
- [Select](https://shadcn-svelte.com/docs/components/select)

## Examples

### Inline Color Picker

Use the `inline` prop to render the color picker inline instead of in a popover.

<CodePreview name='color-picker-example-inline' />

### Controlled State

A color picker with controlled state management.

<CodePreview name='color-picker-example-controlled' />

### With Form

A color picker with form integration.

<CodePreview name='color-picker-example-form' />

## Credits

This component is ported from [Dice UI Color Picker](https://www.diceui.com/docs/components/color-picker).
