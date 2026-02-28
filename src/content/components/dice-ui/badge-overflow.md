---
title: Badge Overflow
description: A component that intelligently manages badge overflow by measuring available space and displaying only what fits with an overflow indicator.
group: Components
section: Dice UI
---

<script>
  import CodeAndPreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
</script>

<CodeAndPreview name='badge-overflow-preview' />

## Layout

```svelte showLineNumbers
<script lang="ts">
    import BadgeOverflow from '$lib/registry/components/dice-ui/badge-overflow/badge-overflow.svelte';
</script>

<BadgeOverflow {renderBadge} />

{#snippet renderBadge(item: string, label: string)}
    <!--  -->
{/snippet}
```

## Usage

### With Primitive Arrays

When using primitive arrays (strings, numbers), the `getBadgeLabel` prop is optional. The component will automatically use the item itself as the label.

```svelte showLineNumbers
<BadgeOverflow items={['React', 'TypeScript', 'Next.js']}>
    {#snippet renderBadge(item: string, label: string)}
        <Badge variant="default">{label}</Badge>
    {/snippet}
</BadgeOverflow>
```

### With Object Arrays

When using object arrays, the `getBadgeLabel` prop is required to extract the label from each item.

```svelte showLineNumbers
<BadgeOverflow
    items={[
        { id: 1, name: 'React' },
        { id: 2, name: 'TypeScript' }
    ]}
    getBadgeLabel={(item) => item.name}
>
    {#snippet renderBadge(item, label)}
        <Badge variant="default">{label}</Badge>
    {/snippet}
</BadgeOverflow>
```

## Examples

### Multi-line Overflow

Display badges across multiple lines using the lineCount prop.

<CodeAndPreview name='badge-overflow-example-multiline' />

### Interactive Tags

Tags Interactive demo showing how to add and remove tags with overflow handling.

<CodeAndPreview name='badge-overflow-example-interactive' />

## Credits

This component is ported from [Dice UI Badge Overflow](https://www.diceui.com/docs/components/badge-overflow).
