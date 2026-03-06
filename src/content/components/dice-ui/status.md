---
title: Status
description: A flexible status indicator component with animated ping effect and color variants for displaying system states, user presence, and service health.
group: Components
section: Dice UI
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/keyboard-navigation/keyboard-navigation.svelte';
  import DisplayProp from '$lib/props/display-prop.svelte';
</script>

<CodePreview name='status-preview' />

## Layout

Import the parts, and compose them together.

```svelte showLineNumbers
<script lang="ts">
    import * as Status from '$lib/registry/components/dice-ui/status';
</script>

<Status.Root variant="success">
    <Status.Label>Online</Status.Label>
</Status.Root>
```

## Examples

### Variants

Status supports five color variants to represent different states.

<CodePreview name='status-example-variants' />

### Text Only

Use status without the indicator for a simpler appearance.

<CodePreview name='status-example-text-only' />

### Service Status List

Display multiple status items in a list format, ideal for system health dashboards.

<CodePreview name='status-example-service-list' />

## API Reference

### Status

The main container component that provides the badge-style wrapper with color variants.

<DisplayProp name='status' />

## Accessibility

The Status component uses semantic HTML and follows best practices for accessibility:

- Uses `div` elements with proper ARIA attributes when needed
- Color is not the only means of conveying information—always include text labels
- Supports keyboard navigation when used with interactive elements via asChild

## Notes

- The animated ping effect uses Tailwind's built-in `animate-ping` utility for smooth performance
- Colors automatically adapt to dark mode
- The indicator animation runs continuously to draw attention to live status changes
- Use the `child` snippet to render Status as a link or button for interactive use cases

## Credits

This component is ported from [Dice UI Status Component](https://www.diceui.com/docs/components/status).
