---
title: Angle Slider
description: An interactive circular slider for selecting angles with support for single values and ranges.
group: Components
section: Dice UI
---
<script>
  import CodeAndPreview from '$lib/code-preview/code-preview.svelte'
</script>

<CodeAndPreview name='angle-slider-preview' />

## Layout

Import the parts and compose them together.

```svelte showLineNumbers
<script lang="ts">
    import AngleSliderRange from '$lib/registry/components/dice-ui/angle-slider/angle-slider-range.svelte';
    import AngleSliderRoot from '$lib/registry/components/dice-ui/angle-slider/angle-slider-root.svelte';
    import AngleSliderThumb from '$lib/registry/components/dice-ui/angle-slider/angle-slider-thumb.svelte';
    import AngleSliderTrack from '$lib/registry/components/dice-ui/angle-slider/angle-slider-track.svelte';
    import AngleSliderValue from '$lib/registry/components/dice-ui/angle-slider/angle-slider-value.svelte';
</script>

<AngleSliderRoot>
    <AngleSliderTrack>
        <AngleSliderRange />
    </AngleSliderTrack>
    <AngleSliderThumb />
    <AngleSliderValue />
</AngleSliderRoot>
```

## Examples

### Controlled State

A slider with controlled state management and custom actions.

<CodeAndPreview name='angle-slider-example-controlled' />

### Range Selection

Use multiple thumbs to create angle ranges with minimum step constraints.

<CodeAndPreview name='angle-slider-example-range' />

### Themes

Slider variants with different themes.

<CodeAndPreview name='angle-slider-example-themes' />

### With Forms

Integrate the angle slider with form validation and submission.

<CodeAndPreview name='angle-slider-example-form' />

## Theming

You can customize the appearance by targeting specific components:

### Track Theming

Use `[&>[data-slot='angle-slider-track-rail']]` to style the background track:

```svelte showLineNumbers
<AngleSliderTrack class="*:data-[slot='angle-slider-track-rail']:stroke-green-100" />
```

### Range Theming

```svelte showLineNumbers
<AngleSliderRange class="stroke-green-500" />
```

### Thumb Theming

```svelte showLineNumbers
<AngleSliderThumb class="border-green-500 bg-green-50 ring-green-500/50" />
```

### Value Theming

```svelte showLineNumbers
<AngleSliderValue class="text-green-600 dark:text-green-400" />
```

## Credits

This component is ported from [Dice UI Angle Slider](https://www.diceui.com/docs/components/angle-slider).
