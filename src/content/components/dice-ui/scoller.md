---
title: Scroller
description: A scrollable container with customizable scroll shadows and navigation buttons.
group: Components
section: Dice UI
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
</script>

<CodePreview name='scroller-preview' />

## Layout

Import the parts, and compose them together.

```svelte showLineNumbers
<script lang="ts">
    import ScrollerRoot from '$lib/registry/components/dice-ui/scroller/scroller-root.svelte';
</script>

<ScrollerRoot>
    <!-- Scrollable content -->
</ScrollerRoot>
```

## Examples

### Horizontal Scroll

Set the `orientation` to `horizontal` to enable horizontal scrolling.

<CodePreview name='scroller-example-horizontal' />

### Hidden Scrollbar

Set the `hideScrollbar` to `true` to hide the scrollbar while maintaining scroll functionality.

<CodePreview name='scroller-example-hidden-scrollbar' />

## Credits

This component is ported from [Dice UI Scroller](https://www.diceui.com/docs/components/scroller).
