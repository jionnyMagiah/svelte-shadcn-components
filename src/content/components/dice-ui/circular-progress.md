---
title: Circular Progress
description: A circular progress indicator that displays completion progress in a ring format with support for indeterminate states.
group: Components
section: Dice UI
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from   import KeyboardNavigation from '$lib/keyboard-navigation/keyboard-navigation.svelte';;
</script>

<CodePreview name='circular-progress-preview' />

## Layout

Import the parts and compose them together.

```svelte showLineNumbers
<script lang="ts">
    import CircularProgressIndicator from '$lib/registry/components/dice-ui/circular-progress/circular-progress-indicator.svelte';
    import CircularProgressRange from '$lib/registry/components/dice-ui/circular-progress/circular-progress-range.svelte';
    import CircularProgressRoot from '$lib/registry/components/dice-ui/circular-progress/circular-progress-root.svelte';
    import CircularProgressTrack from '$lib/registry/components/dice-ui/circular-progress/circular-progress-track.svelte';
    import CircularProgressValueText from '$lib/registry/components/dice-ui/circular-progress/circular-progress-value-text.svelte';
</script>

<CircularProgressRoot>
    <CircularProgressIndicator>
        <CircularProgressTrack />
        <CircularProgressRange />
    </CircularProgressIndicator>
    <CircularProgressValueText />
</CircularProgressRoot>
```

Or use the `Combined` component to get all the parts in one.

```svelte showLineNumbers
<script lang="ts">
    import CircularProgressCombined from '$lib/registry/components/dice-ui/circular-progress/circular-progress-combined.svelte';
</script>

<CircularProgressCombined />
```

## Examples

### Interactive Demo

A circular progress with interactive controls and simulated upload progress.

<CodePreview name='circular-progress-example-interactive' />

### Colors

Different color themes using Tailwind CSS stroke and text utilities to customize the track, range, and value text colors.

<!-- todo: add animations like in original example from dice ui -->

<CodePreview name='circular-progress-example-colors' />

## Theming

The circular progress component uses CSS `currentColor` for stroke colors, making it easy to theme using Tailwind's text or stroke utilities:

### Track Theming

```svelte showLineNumbers
<CircularProgressTrack class="text-green-200 dark:text-green-900" />
```

### Range Theming

```svelte showLineNumbers
<CircularProgressRange class="text-green-500" />
```

### Value Text Theming

```svelte showLineNumbers
<CircularProgressValueText class="text-green-700 dark:text-green-300" />
```

### Custom Stroke Styles

You can also use Tailwind's stroke utilities directly:

```svelte showLineNumbers
<CircularProgressTrack class="stroke-blue-200" />
<CircularProgressRange class="stroke-blue-500" />
```

## Credits

This component is ported from [Dice UI Circular Progress](https://www.diceui.com/docs/components/circular-progress).
