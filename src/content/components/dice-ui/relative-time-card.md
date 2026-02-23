---
title: Relative Time Card
description: A hover card that displays relative time relative to local time with timezone information.
group: Components
section: Dice UI
credits:
  title: Dice UI Relative Time Card
  url: https://www.diceui.com/docs/components/relative-time-card
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
</script>

<CodePreview name='relative-time-card-preview' />

## Examples

### With Multiple Timezones

<!-- <CodePreview name='relative-time-card-example-multiple-timezones' /> -->

### With Variants

<!-- <CodePreview name='relative-time-card-example-variants' /> -->

## Accessibility

### Keyboard Interactions

<KeyboardNavigation
  interactions={[
      {
          keys: ['Tab'],
          desc: 'Opens/closes the relative time card.'
      },
      {
          keys: ['Enter'],
          desc: 'Opens the relative time card if closed.'
      },
  ]}
/>
