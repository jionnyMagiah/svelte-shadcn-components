---
title: Compare Slider
description: An interactive before/after comparison slider for comparing two elements side by side.
group: Components
section: Dice UI
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/keyboard-navigation/keyboard-navigation.svelte';
</script>

<CodePreview name='compare-slider-preview' />

## Layout

Import the parts, and compose them together.

```svelte showLineNumbers
<script lang="ts">
    import CompareSliderAfter from '$lib/registry/components/dice-ui/compare-slider/compare-slider-after.svelte';
    import CompareSliderBefore from '$lib/registry/components/dice-ui/compare-slider/compare-slider-before.svelte';
    import CompareSliderHandle from '$lib/registry/components/dice-ui/compare-slider/compare-slider-handle.svelte';
    import CompareSlider from '$lib/registry/components/dice-ui/compare-slider/compare-slider.svelte';
</script>

<CompareSlider>
    <CompareSliderBefore />
    <CompareSliderAfter />
    <CompareSliderHandle />
</CompareSlider>
```

## Examples

### Controlled State

A compare slider with external controls for the slider position.

<CodePreview name='compare-slider-example-controlled' />

### Vertical Orientation

A compare slider with vertical orientation, perfect for comparing tall images or content.

<CodePreview name='compare-slider-example-vertical' />

### Customization

Compare slider with custom handle, labels, and vertical orientation.

<CodePreview name='compare-slider-example-customization' />

## Accessibility

### Keyboard Interactions

<KeyboardNavigation
interactions={[
{
keys: ['Tab'],
desc: 'Moves focus to the slider.'
},
{
keys: ['Shift + Tab'],
desc: 'Moves focus away from the slider to the previous focusable element.'
},
{
keys: ['ArrowLeft', 'ArrowUp'],
desc: 'Moves the slider position left (or up in vertical mode) by the step amount.'
},
{
keys: ['ArrowRight', 'ArrowDown'],
desc: 'Moves the slider position right (or down in vertical mode) by the step amount.'
},
{
keys: ['PageUp'],
desc: 'Moves the slider position left (or up in vertical mode) by ten steps.'
},
{
keys: ['PageDown'],
desc: 'Moves the slider position right (or down in vertical mode) by ten steps.'
},
{
keys: ['Shift + ArrowLeft', 'Shift + ArrowUp'],
desc: 'Moves the slider position left (or up in vertical mode) by ten steps.'
},
{
keys: ['Shift + ArrowRight', 'Shift + ArrowDown'],
desc: 'Moves the slider position right (or down in vertical mode) by ten steps.'
},
{
keys: ['Home'],
desc: 'Moves the slider to the minimum position (0%).'
},
{
keys: ['End'],
desc: 'Moves the slider to the maximum position (100%).'
}
]}
/>

### Mouse and Touch Interactions

- **Drag**: Click and drag the handle to adjust the comparison position
- **Click**: Click anywhere on the slider container to jump to that position
- **Touch**: Full touch support for mobile devices

## Advanced Usage

### Custom Content Type

The compare slider works with any Svelte content, not just images:

```svelte showLineNumbers
<script lang="ts">
    import CompareSliderAfter from '$lib/registry/components/dice-ui/compare-slider/compare-slider-after.svelte';
    import CompareSliderBefore from '$lib/registry/components/dice-ui/compare-slider/compare-slider-before.svelte';
    import CompareSliderHandle from '$lib/registry/components/dice-ui/compare-slider/compare-slider-handle.svelte';
    import CompareSlider from '$lib/registry/components/dice-ui/compare-slider/compare-slider.svelte';
</script>

<CompareSlider class="h-20">
    <CompareSliderBefore>
        <div class="flex h-full items-center justify-center bg-blue-500">
            <p>Old Design</p>
        </div>
    </CompareSliderBefore>
    <CompareSliderAfter>
        <div class="flex h-full items-center justify-center bg-green-500">
            <p>New Design</p>
        </div>
    </CompareSliderAfter>
    <CompareSliderHandle />
</CompareSlider>
```

### Vertical Orientation Layout

Use vertical orientation for comparing content that works better in a vertical layout. The slider handle moves vertically, and the "before" content appears on top while "after" content appears on bottom.

```svelte showLineNumbers
<script lang="ts">
    import CompareSliderAfter from '$lib/registry/components/dice-ui/compare-slider/compare-slider-after.svelte';
    import CompareSliderBefore from '$lib/registry/components/dice-ui/compare-slider/compare-slider-before.svelte';
    import CompareSliderHandle from '$lib/registry/components/dice-ui/compare-slider/compare-slider-handle.svelte';
    import CompareSlider from '$lib/registry/components/dice-ui/compare-slider/compare-slider.svelte';
</script>

<CompareSlider orientation="vertical" class="h-150">
    <CompareSliderBefore class="h-full w-full bg-green-500"
        >Top content</CompareSliderBefore
    >
    <CompareSliderAfter class="h-full w-full bg-blue-500"
        >Bottom content</CompareSliderAfter
    >
    <CompareSliderHandle />
</CompareSlider>
```

### Custom Labels

Add custom labels to identify each side with the `label` prop, or use the `CompareSliderLabel` component for more control.

```svelte showLineNumbers
<script lang="ts">
    import CompareSliderAfter from '$lib/registry/components/dice-ui/compare-slider/compare-slider-after.svelte';
    import CompareSliderBefore from '$lib/registry/components/dice-ui/compare-slider/compare-slider-before.svelte';
    import CompareSliderHandle from '$lib/registry/components/dice-ui/compare-slider/compare-slider-handle.svelte';
    import CompareSliderLabel from '$lib/registry/components/dice-ui/compare-slider/compare-slider-label.svelte';
    import CompareSlider from '$lib/registry/components/dice-ui/compare-slider/compare-slider.svelte';
</script>

<CompareSlider>
    <CompareSliderBefore label="Original">Content</CompareSliderBefore>
    <CompareSliderAfter label="Enhanced">Content</CompareSliderAfter>
    <CompareSliderHandle />
</CompareSlider>

<CompareSlider>
    <CompareSliderBefore>Content</CompareSliderBefore>
    <CompareSliderAfter>Content</CompareSliderAfter>
    <CompareSliderHandle />
    <CompareSliderLabel side="before" class="bg-blue-500/90 text-white">
        Original
    </CompareSliderLabel>
    <CompareSliderLabel side="after" class="bg-green-500/90 text-white">
        Enhanced
    </CompareSliderLabel>
</CompareSlider>
```

## Credits

This component is ported from [Dice UI Compare Slider](https://www.diceui.com/docs/components/compare-slider).
