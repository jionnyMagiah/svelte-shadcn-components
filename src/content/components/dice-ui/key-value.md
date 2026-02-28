---
title: Key Value
description: A dynamic input component for managing key-value pairs with paste support and validation.
group: Components
section: Dice UI
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/components/keyboard-navigation.svelte';
</script>

<CodePreview name='key-value-preview' />

## Layout

Import the parts, and compose them together.

```svelte showLineNumbers
<script lang="ts">
    import KeyValueAdd from '$lib/registry/components/dice-ui/key-value/key-value-add.svelte';
    import KeyValueError from '$lib/registry/components/dice-ui/key-value/key-value-error.svelte';
    import KeyValueItem from '$lib/registry/components/dice-ui/key-value/key-value-item.svelte';
    import KeyValueKeyInput from '$lib/registry/components/dice-ui/key-value/key-value-key-input.svelte';
    import KeyValueList from '$lib/registry/components/dice-ui/key-value/key-value-list.svelte';
    import KeyValueRemove from '$lib/registry/components/dice-ui/key-value/key-value-remove.svelte';
    import KeyValueRoot from '$lib/registry/components/dice-ui/key-value/key-value-root.svelte';
    import KeyValueValueInput from '$lib/registry/components/dice-ui/key-value/key-value-value-input.svelte';
</script>

<KeyValueRoot>
    <KeyValueList>
        {#snippet child({ itemData })}
            <KeyValueItem {itemData}>
                <KeyValueKeyInput />
                <KeyValueValueInput />
                <KeyValueRemove />
                <KeyValueError field="key" />
                <KeyValueError field="value" />
            </KeyValueItem>
        {/snippet}
    </KeyValueList>
    <KeyValueAdd />
</KeyValueRoot>
```

## Notes

The components internally uses some of the shadcn-svelte components:

- [Button](https://shadcn-svelte.com/docs/components/button)
- [Input](https://shadcn-svelte.com/docs/components/input)
- [Textarea](https://shadcn-svelte.com/docs/components/textarea)

## Examples

### With Paste Support

Paste multiple key-value pairs at once. Supports formats like `KEY=VALUE`, `KEY: VALUE`, and tab-separated values.

<CodePreview name='key-value-example-paste-support' />

### With Validation

Add validation rules for keys and values with error messages.

<CodePreview name='key-value-example-validation' />

### With Form

Integrate with form for form validation.

<CodePreview name='key-value-example-form' />

## Accessibility

### Keyboard Interactions

<KeyboardNavigation
  interactions={[
      {
          keys: ['Tab'],
          desc: 'Navigate between key inputs, value inputs, and buttons.'
      },
      {
          keys: ['Enter'],
          desc: 'Submit the current input value.'
      },
      {
          keys: ['Escape'],
          desc: 'Cancel the current input.'
      },
      {
          keys: ['Ctrl', 'V'],
          desc: 'Paste multiple key-value pairs (supports multiple formats).'
      }
  ]}
/>

## Features

- **Dynamic Items**: Add and remove key-value pairs dynamically
- **Paste Support**: Paste multiple items at once in various formats (`KEY=VALUE`, `KEY: VALUE`, tab-separated)
- **Validation**: Built-in validation for keys and values with custom validators
- **Duplicate Detection**: Optional prevention of duplicate keys
- **Item Limits**: Set minimum and maximum item counts
- **Form Integration**: Works seamlessly with React Hook Form
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled patterns
- **Accessibility**: Full keyboard navigation and screen reader support
- **Customizable**: Fully customizable styling and behavior

## Paste Formats

The component supports pasting multiple key-value pairs in the following formats:

```plain showLineNumbers
KEY=VALUE
DATABASE_URL=postgresql://localhost:5432
API_KEY=sk-1234567890

KEY: VALUE
DATABASE_URL: postgresql://localhost:5432
API_KEY: sk-1234567890

KEY VALUE (tab-separated)
DATABASE_URL postgresql://localhost:5432
API_KEY sk-1234567890
```

When pasting multiple lines, the component will automatically parse and create separate items for each line.

## Credits

This component is ported from [Dice UI Key Value](https://www.diceui.com/docs/components/key-value).
