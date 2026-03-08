---
title: Checkbox Group
description: A group of checkboxes that allows multiple selections with support for validation and accessibility.
group: Components
section: Dice UI
---

<script>
  import CodeAndPreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/keyboard-navigation/keyboard-navigation.svelte';
</script>

<CodeAndPreview name='checkbox-group-preview' />

## Usage

This components is a styled component built on top of [`checkbox-group-primitive`](/docs/packages/dice-ui/checkbox-group), a headless components that provide state management.

You can either use this ready-to-use components, or the headless components and style it yourself.

<CodeAndPreview name='checkbox-group-usage-primitive' />

## Layout

Import the parts, and compose them together.

```svelte showLineNumbes
<script lang="ts">
    import CheckboxGroupDescription from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-description.svelte';
    import CheckboxGroupIndicator from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-indicator.svelte';
    import CheckboxGroupItem from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-item.svelte';
    import CheckboxGroupLabel from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-label.svelte';
    import CheckboxGroupList from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group-list.svelte';
    import CheckboxGroup from '$lib/registry/packages/dice-ui/checkbox-group/checkbox-group.svelte';
</script>

<CheckboxGroup>
    <CheckboxGroupLabel />
    <CheckboxGroupList>
        <CheckboxGroupItem>
            <CheckboxGroupIndicator />
        </CheckboxGroupItem>
    </CheckboxGroupList>
    <CheckboxGroupDescription />
</CheckboxGroup>
```

## Examples

### Horizontal Orientation

<CodeAndPreview name='checkbox-group-example-horizontal' />

### With Validation

Validate the group with `onValidate` or `required` prop. Can be used for native form validation.

<CodeAndPreview name='checkbox-group-example-validation' />

### Multi Selection

Hold down the `Shift` key to select and deselect multiple checkboxes at once.

> [!warning]
> Currently this example is not working properly. After selecting the first element, you need to click two times while pressing `Shift` to trigger the multi selection. This only the first time you use the multi selection.
>
> Will be fixed soon.

<CodeAndPreview name='checkbox-group-example-shift-selection' />

## Accessibility

### Keyboard Interactions

<KeyboardNavigation name='checkbox-group' />

## Credits

This component is ported from [Dice UI Checkbox Group](http://localhost:5173/docs/components/dice-ui/checkbox-group).
