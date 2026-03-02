---
title: Stat
description: A flexible component for displaying key metrics and statistics with support for trends, indicators, and descriptions.
group: Components
section: Dice UI
---
<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
  import DisplayProp from '$lib/props/display-prop.svelte';
</script>

<CodePreview name='stat-preview' />

## Layout

Import the parts, and compose them together.

```svelte showLineNumbers
<script lang="ts">
    import StatIndicator from '$lib/registry/components/dice-ui/stat/stat-indicator.svelte';
    import StatLabel from '$lib/registry/components/dice-ui/stat/stat-label.svelte';
    import StatRoot from '$lib/registry/components/dice-ui/stat/stat-root.svelte';
    import StatTrend from '$lib/registry/components/dice-ui/stat/stat-trend.svelte';
    import StatValue from '$lib/registry/components/dice-ui/stat/stat-value.svelte';
</script>

<StatRoot>
    <StatLabel />
    <StatIndicator />
    <StatValue />
    <StatTrend />
</StatRoot>
```

## Examples

### Variants

Explore different indicator variants and color themes.

<CodePreview name='stat-example-variants'/>

### Layout Options

Combine different stat components to create rich statistical displays.

<CodePreview name='stat-example-layout-options'/>

## API Reference

### Stat

The main container component that provides a card-style layout for displaying statistics.

<DisplayProp name='stat' />

### StatLabel

A label component for the statistic title or category.

<DisplayProp name='stat-label' />

### StatIndicator

A visual indicator component that can display icons, badges, or action buttons with various color themes.

<DisplayProp name='stat-indicator' />

## Credits

This component is ported from [Dice UI Stat](https://www.diceui.com/docs/components/stat).
