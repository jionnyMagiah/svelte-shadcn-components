---
title: Gauge
description: A customizable gauge component that displays values on circular or partial arcs, perfect for dashboards, metrics, and KPIs.
group: Components
section: Dice UI
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/keyboard-navigation/keyboard-navigation.svelte';
  import DisplayProp from '$lib/props/display-prop.svelte';
</script>

<CodePreview name='gauge-preview' />

## Layout

Import the parts and compose them together.

```svelte showLineNumbers
<script lang="ts">
    import GaugeIndicator from '$lib/registry/components/dice-ui/gauge/gauge-indicator.svelte';
    import GaugeLabel from '$lib/registry/components/dice-ui/gauge/gauge-label.svelte';
    import GaugeRange from '$lib/registry/components/dice-ui/gauge/gauge-range.svelte';
    import GaugeTrack from '$lib/registry/components/dice-ui/gauge/gauge-track.svelte';
    import GaugeValueText from '$lib/registry/components/dice-ui/gauge/gauge-value-text.svelte';
    import Gauge from '$lib/registry/components/dice-ui/gauge/gauge.svelte';
</script>

<Gauge>
    <GaugeIndicator>
        <GaugeTrack />
        <GaugeRange />
    </GaugeIndicator>
    <GaugeValueText />
    <GaugeLabel>Label</GaugeLabel>
</Gauge>
```

Or use the `Combined` component to get all the parts in one.

```svelte showLineNumbers
<script lang="ts">
    import GaugeCombined from '$lib/registry/components/dice-ui/gauge/gauge-combined.svelte';
</script>

<GaugeCombined>Label</GaugeCombined>
```

## Examples

### Sizes

Different gauge sizes to fit various UI contexts.

<CodePreview name='gauge-example-size' />

### Colors

Different color themes for various use cases like system monitoring, health indicators, and status displays.

<CodePreview name='gauge-example-colors' />

### Variants

Different arc configurations including semi-circle, three-quarter circle, and full circle gauges.

<CodePreview name='gauge-example-variants' />

## Value Text Formatting

By default, the gauge displays the percentage value (0–100) based on `value`, `min`, and `max`. You can customize the format using the `getValueText` prop.

### Show Percentage

```svelte showLineNumbers
<Gauge
    value={85}
    getValueText={(value, min, max) => {
        const percentage = ((value - min) / (max - min)) * 100;
        return `${Math.round(percentage)}%`;
    }}
>
    <!-- ... -->
</Gauge>
```

### Show Fraction

```svelte showLineNumbers
<Gauge
    value={75}
    max={100}
    getValueText={(value, min, max) => `${value}/${max}`}
>
    <!-- ... -->
</Gauge>
```

### Custom Text

```svelte showLineNumbers
<Gauge value={75} getValueText={(value) => `${value} points`}>
    <!-- ... -->
</Gauge>
```

## Theming

The gauge component uses CSS `currentColor` for stroke colors, making it easy to theme using Tailwind's text utilities:

### Track Theming

```svelte showLineNumbers
<GaugeTrack class="text-blue-200 dark:text-blue-900" />
```

### Range Theming

```svelte showLineNumbers
<GaugeRange class="text-blue-500" />
```

### Value Text Theming

```svelte showLineNumbers
<GaugeValueText class="text-blue-700 dark:text-blue-300" />
```

### Label Theming

```svelte showLineNumbers
<GaugeLabel class="text-blue-600" />
```

## Accessibility

### Screen Reader support

- Uses the `meter` role for proper screen reader identification
- Provides `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, and `aria-valuetext` attributes
- Supports `aria-labelledby` when a label prop is provided
- Supports indeterminate state by omitting `aria-valuenow` when value is null

### Notes

- The component automatically handles indeterminate states when `value` is `null` or `undefined`
- Gauge values are automatically clamped to the valid range between `min` and `max`
- Invalid `max` or `value` props will log console errors and use fallback values
- Supports full circles (360°) by automatically splitting into two semi-circles for proper SVG rendering
- Value text automatically centers within the arc's visual bounds for both full and partial circles
- The gauge range uses `stroke-dashoffset` animations for smooth, performant filling effects
- All stroke colors use `currentColor` by default, making them responsive to text color changes
- Default angles are 0° (start) to 360° (end) for a full circle gauge

## Credits

This component is ported from [Dice UI Gauge](https://www.diceui.com/docs/components/gauge).
