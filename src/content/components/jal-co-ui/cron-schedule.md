---
title: Cron Schedule
description: Visual cron expression display with field breakdown, human-readable summary, and optional next-run preview. Designed for dashboards, serverless function docs, and scheduling UIs.
group: Components
section: jal-co/ui
---

<script>
  import CodePreview from '$lib/code-preview/code-preview.svelte'
  import KeyboardNavigation from '$lib/keyboard-navigation/keyboard-navigation.svelte';
  import DisplayProp from '$lib/props/display-prop.svelte';
</script>

<CodePreview name='cron-schedule-preview' />

## Usage

```svelte showLineNumbers
<script lang="ts">
    import CronSchedule from '$lib/registry/components/jal-co-ui/cron-schedule/cron-schedule.svelte';
</script>

<CronSchedule expression="0 9 * * 1-5" />
```

Pass a standard 5-field cron expression. The component parses it into a human-readable summary and a visual field breakdown. Optionally display a title or show upcoming run times with `showNextRuns`.

## Examples

### Common Schedules

<CodePreview name='cron-schedule-example-expression' />

### With Next Runs

Set `showNextRuns` to display upcoming execution times. Pass `referenceDate` to control the starting point (defaults to now).

<CodePreview name='cron-schedule-example-next-runs' />

### Complex Expressions

<CodePreview name='cron-schedule-example-complex' />

### Without Title

Omit the title for a compact display that shows only the summary and field breakdown.

<CodePreview name='cron-schedule-example-no-title' />

## API Reference

### CronSchedule

<DisplayProp name='cron-schedule' />

## Cron Syntax Reference

| Field       | Values        | Specials |
| ----------- | ------------- | -------- |
| Minute      | 0–59          | \* , - / |
| Hour        | 0–23          | \* , - / |
| Day (Month) | 1–31          | \* , - / |
| Month       | 1–12          | \* , - / |
| Day (Week)  | 0–6 (Sun–Sat) | \* , - / |

## Credits

This component is ported from [jal-co/ui API Cron Schedule](https://ui.justinlevine.me/docs/components/cron-schedule).
