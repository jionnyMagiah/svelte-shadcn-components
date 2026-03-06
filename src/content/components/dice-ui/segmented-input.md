---
title: Segmented Input
description: A group of connected input fields that appear as a single segmented visual unit.
group: Components
section: Dice UI
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/keyboard-navigation/keyboard-navigation.svelte';
  import DisplayProp from '$lib/props/display-prop.svelte';
</script>

<CodePreview name='segmented-input-preview' />

## Layout

Import the parts, and compose them together.

```svelte showLineNumbers
<script lang="ts">
    import SegmentedInputItem from '$lib/registry/components/dice-ui/segmented-input/segmented-input-item.svelte';
    import SegmentedInput from '$lib/registry/components/dice-ui/segmented-input/segmented-input.svelte';
</script>

<SegmentedInput>
    <SegmentedInputItem />
</SegmentedInput>
```

## Examples

### Form Input

Use segmented inputs for structured form data like phone numbers or addresses.

<CodePreview name='segmented-input-example-form' />

### RGB Color Input

Create color input controls using segmented inputs for RGB values.

<CodePreview name='segmented-input-example-color' />

### Vertical Layout

Display segmented inputs in a vertical orientation.

<CodePreview name='segmented-input-example-vertical' />

## API Reference

### SegmentedInput

The main segmented input container.

<DisplayProp name='segmented-input' />

### SegmentedInputItem

Individual input items within the segmented input.

<DisplayProp name='segmented-input-item' />

## Accessibility

The SegmentedInput component follows standard web accessibility practices. Users navigate between inputs using Tab and Shift+Tab keys, which is the expected behavior for form controls.

## Keyboard Interactions

<KeyboardNavigation name='segmented-input' />

## Credits

This component is ported from [Dice UI Segmented Input](https://www.diceui.com/docs/components/radix/segmented-input).
