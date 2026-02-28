---
title: Color Swatch
description: A color swatch component for displaying color values with support for transparency and various sizes.
group: Components
section: Dice UI
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
</script>

<CodePreview name='color-swatch-preview' />

## Usage

Import the component and use it to display color values.

```svelte showLineNumbers
<script lang="ts">
    import ColorSwatch from '$lib/registry/components/dice-ui/color-swatch/color-swatch.svelte';
</script>

<ColorSwatch color="#3b82f6" />
```

## Examples

### Different Sizes

The color swatch component supports three different sizes: `sm`, `default` and `lg`.

<CodePreview name='color-swatch-example-size' />

### Transparency Support

The color swatch automatically detects transparent colors and displays them with a checkerboard background pattern.

<CodePreview name='color-swatch-example-transparency' />

## Accessibility

The color swatch component includes proper accessibility features:

- ARIA Label: Automatically generates descriptive `aria-label` text based on the color value
- Role: Uses `role="img"` to indicate it's an image representation of a color
- Disabled State: Properly handles disabled state with appropriate visual and interaction changes

### Screen Reader Support

- When a color value is provided, the `aria-label` reads "Color swatch: [color-value]"
- When no color is selected, the `aria-label` reads "No color selected"

## Color Format Support

The color swatch component supports various color formats:

- HEX: `#3b82f6`
- RGB: `rgb(59, 130, 246)`
- RGBA: `rgba(59, 130, 246, 0.5)`
- HSL: `hsl(217, 91%, 60%)`
- HSLA: `hsla(217, 91%, 60%, 0.5)`
- Named Colors: `blue`, `red`, etc.

### Transparency Detection

The component automatically detects transparent colors by checking for:

- `rgba()` or `hsla()` function notation
- RGB/HSL with 4 values (including alpha)
- Any color format that includes transparency information

When transparency is detected, a checkerboard pattern is displayed behind the color to show the transparency effect. Use the `withoutTransparency` prop to disable this behavior.

## Credits

This component is ported from [Dice UI Color Swatch](https://www.diceui.com/docs/components/color-swatch).
