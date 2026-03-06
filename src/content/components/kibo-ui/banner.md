---
title: Banner
description: A banner is a full-width component that can be used to show a message and action to the user.
group: Components
section: Kibo UI
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/keyboard-navigation/keyboard-navigation.svelte';
  import DisplayProp from '$lib/props/display-prop.svelte';
</script>

<CodePreview name='banner-preview' />

## Features

- Controlled and uncontrolled visibility state
- Customizable close handler
- Optional inset variant with rounded corners
- Composable API with Icon, Title, Action and Close components
- Customizable via className prop
- Adapts to primary color tokens

## Examples

### Inset

<CodePreview name='banner-example-inset' />

### Different Primary Colors

<CodePreview name='banner-example-colors' />

## Credits

This component is ported from [Kibo UI Banner](https://www.kibo-ui.com/components/banner).
