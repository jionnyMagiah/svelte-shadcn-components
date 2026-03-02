---
title: Timeline
description: A flexible timeline component for displaying chronological events with support for different orientations, RTL layouts, and visual states.
group: Components
section: Dice UI
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
  import DisplayProp from '$lib/props/display-prop.svelte';
</script>

<CodePreview name='timeline-preview' />

## Layout

Import the parts, and compose them together.

```svelte showLineNumbers
<script lang="ts">
    import TimelineConnector from '$lib/registry/components/dice-ui/timeline/timeline-connector.svelte';
    import TimelineContent from '$lib/registry/components/dice-ui/timeline/timeline-content.svelte';
    import TimelineDescription from '$lib/registry/components/dice-ui/timeline/timeline-description.svelte';
    import TimelineDot from '$lib/registry/components/dice-ui/timeline/timeline-dot.svelte';
    import TimelineHeader from '$lib/registry/components/dice-ui/timeline/timeline-header.svelte';
    import TimelineItem from '$lib/registry/components/dice-ui/timeline/timeline-item.svelte';
    import TimelineRoot from '$lib/registry/components/dice-ui/timeline/timeline-root.svelte';
    import TimelineTime from '$lib/registry/components/dice-ui/timeline/timeline-time.svelte';
    import TimelineTitle from '$lib/registry/components/dice-ui/timeline/timeline-title.svelte';
</script>

<TimelineRoot>
    <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
            <TimelineHeader>
                <TimelineTitle />
                <TimelineTime />
            </TimelineHeader>
            <TimelineDescription />
        </TimelineContent>
    </TimelineItem>
</TimelineRoot>
```

## Examples

### Horizontal Timeline

Display timeline events horizontally across the screen.

<CodePreview name='timeline-example-horizontal' />

### RTL Timeline

Display timeline with right-to-left layout for RTL languages.

<CodePreview name='timeline-example-rtl' />

### Alternate Timeline

Display timeline events in an alternating pattern with content on both sides.

<CodePreview name='timeline-example-alternate' />

### Horizontal Alternate Timeline

Display timeline events horizontally with content alternating above and below.

<CodePreview name='timeline-example-horizontal-alternate' />

### With Custom Dots

Add custom icons or content to the timeline dots using CSS variables.

<CodePreview name='timeline-example-custom-dots' />

## Features

### Flexible Orientations

The timeline supports both vertical and horizontal orientations. Use the `orientation` prop on `TimelineRoot` to switch between layouts.

### Alternate Variant

The timeline supports an alternate variant where content alternates on both sides of the timeline. Use the `variant="alternate"` prop on `TimelineRoot` to enable this layout. This works with both vertical and horizontal orientations:

- **Vertical alternate**: Content alternates left and right of the center line
- **Horizontal alternate**: Content alternates above and below the center line

```svelte showLineNumbers
<TimelineRoot variant="alternate" orientation="horizontal">
  <!-- Content alternates above and below -->
</TimelineRoot>
```

### RTL Support

The timeline fully supports right-to-left (RTL) layouts through the `dir` prop. When set to `"rtl"`, the timeline automatically flips its layout direction, making it ideal for RTL languages like Arabic, Hebrew, and Persian.

### Active Index

Control the visual state of timeline items using the `activeIndex` prop on the root component. Items before the active index will be marked as "completed", the item at the active index will be "active", and items after will be "pending".

```svelte showLineNumbers
<TimelineRoot activeIndex={2}>
  <TimelineItem>Step 1 - Completed</TimelineItem>
  <TimelineItem>Step 2 - Completed</TimelineItem>
  <TimelineItem>Step 3 - Active (index 2)</TimelineItem>
  <TimelineItem>Step 4 - Pending</TimelineItem>
</TimelineRoot>
```

The `activeIndex` is zero-based, so `activeIndex={2}` makes the third item active.

### Custom Icons

Replace the default dot marker with custom icons or React components by passing children to `TimelineDot`, giving you full control over the visual appearance.

### Composition Pattern

Built with a composable API that gives you complete control over the structure and styling of your timeline. Mix and match components as needed.

## Accessibility

### ARIA Roles

The timeline uses ARIA roles and attributes for proper accessibility:

- Root uses `role="list"` and `aria-orientation` to represent an ordered list of events
- Each item uses `role="listitem"` for proper list semantics
- Active items use `aria-current="step"` to indicate current position in the timeline
- Semantic `<time>` elements with `dateTime` attribute for proper date representation
- Connectors are marked with `aria-hidden="true"` as they're purely decorative

## Credits

This component is ported from [Dice UI Timeline](https://www.diceui.com/docs/components/timeline).
