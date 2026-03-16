---
title: Env Table
description: Read-only environment variable table with masked values, click-to-reveal, per-row copy, and bulk copy as .env format. Designed for settings pages, deploy previews, and documentation.
group: Components
section: jal-co/ui
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/keyboard-navigation/keyboard-navigation.svelte';
  import DisplayProp from '$lib/props/display-prop.svelte';
</script>

<CodePreview name='env-table-preview' />

## Installation

> [!caution] Display Only
> This component does not read from `process.env` or any external source. You supply the data — it renders it.

> [!caution] Visual Masking Only
> Values show the first 4 characters plus dots. Values shorter than 5 characters show only dots. This is visual masking — values are still in the DOM. Do not use this for true secret concealment.

## Usage

```svelte showLineNumbers
<script lang="ts">
    import EnvTable from '$lib/registry/components/jal-co-ui/env-table/env-table.svelte';
</script>

<EnvTable {variables} title="Environment Variables" />
```

Pass an array of `{ key, value, environment?, description? }` objects. Values are masked by default — users click the eye icon to reveal individual values, or use the toolbar to reveal/hide all.

## Examples

### With Environment Badges

When variables include an `environment` field, color-coded badges show the target environment. Built-in colors for production (green), preview (blue), and development (amber).

<CodePreview name='env-table-example-badges' />

### Without Environments

Omit the environment field for a simpler key-value layout. Works well for API keys, webhook URLs, and general config.

<CodePreview name='env-table-example-no-env' />

### Default Revealed

Set `defaultRevealed` to start with all values visible. Useful for non-sensitive config or documentation contexts.

<CodePreview name='env-table-example-default-revealed' />

## API Reference

### EnvTable

<DisplayProp name='env-table' />

### EnvVariable

<DisplayProp name='env-variable' />

## Notes

- **Copy .env**: The toolbar "Copy .env" button copies all variables in `KEY=value` format, ready to paste into a `.env` file.
- **Duplicate keys**: The component handles duplicate keys gracefully — common when showing the same variable across multiple environments.
- **Icon library**: Uses Lucide icons by default. Since this is copy-paste code, you can swap the imports if your project uses a different icon library.

## Credits

This component is ported from [jal-co/ui Env Table](https://ui.justinlevine.me/docs/components/env-table).
