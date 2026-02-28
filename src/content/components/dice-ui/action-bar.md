---
title: Action Bar
description: A floating action bar that appears at the bottom or top of the viewport to display contextual actions for selected items.
group: Components
section: Dice UI
---

<script>
  import CodeAndPreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
</script>

<CodeAndPreview name='action-bar-preview' />

## Layout

```svelte showLineNumbers
<script lang="ts">
    import ActionBarClose from '$lib/registry/components/dice-ui/action-bar/action-bar-close.svelte';
    import ActionBarGroup from '$lib/registry/components/dice-ui/action-bar/action-bar-group.svelte';
    import ActionBarItem from '$lib/registry/components/dice-ui/action-bar/action-bar-item.svelte';
    import ActionBarSelection from '$lib/registry/components/dice-ui/action-bar/action-bar-selection.svelte';
    import ActionBarSeparator from '$lib/registry/components/dice-ui/action-bar/action-bar-separator.svelte';
    import ActionBar from '$lib/registry/components/dice-ui/action-bar/action-bar.svelte';
</script>

<ActionBar>
    <ActionBarSelection />
    <ActionBarSeparator />
    <ActionBarGroup>
        <ActionBarItem />
        <ActionBarItem />
    </ActionBarGroup>
    <ActionBarClose />
</ActionBar>
```

## Examples

### Position

Use the `side` and `align` props to control where the action bar appears.

<CodeAndPreview name='action-bar-example-position' />

## Accessibility

The action bar follows the [WAI-ARIA Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) pattern for keyboard navigation.

<KeyboardNavigation
  interactions={[
      {
          keys: ['Tab'],
          desc: 'Moves focus to the next focusable element (Action Group or Close button).'
      },
      {
          keys: ['Shift', 'Tab'],
          desc: 'Moves focus to the previous focusable element.'
      },
      {
          keys: ['Escape'],
          desc: 'Closes the action bar and calls onOpenChange(false).'
      },
      {
          keys: ['ArrowLeft'],
          desc: 'Moves focus to the previous item in the group (horizontal orientation).'
      },
      {
          keys: ['ArrowUp'],
          desc: 'Moves focus to the previous item in the group (vertical orientation).'
      },
      {
          keys: ['ArrowRight'],
          desc: 'Moves focus to the next item in the group (horizontal orientation).'
      },
      {
          keys: ['ArrowDown'],
          desc: 'Moves focus to the next item in the group (vertical orientation).'
      },
      {
          keys: ['Home'],
          desc: 'Moves focus to the first item in the group.'
      },
      {
          keys: ['End'],
          desc: 'Moves focus to the last item in the group.'
      }
  ]}
/>

## Credits

This component is ported from [Dice UI Action Bar](https://www.diceui.com/docs/components/action-bar).
