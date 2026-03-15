<script lang="ts">
    import { cn } from '$lib/utils';
    import {
        describeField,
        FIELD_NAMES,
        FIELD_RANGES,
        formatNextRun,
        getNextRuns,
        humanReadable
    } from './utils';

    type CronScheduleProps = {
        /** Standard 5-field cron expression (e.g. "0 9 * * 1-5"). */
        expression: string;
        /** Optional heading label. */
        title?: string;
        /** Number of upcoming run times to show. Defaults to 0 (hidden). */
        showNextRuns?: number;
        /** Base date for computing next runs. Defaults to now. */
        referenceDate?: Date;
        /** Additional CSS classes on the root element. */
        class?: string;
    };

    let {
        expression,
        title,
        class: className,
        referenceDate = new Date(),
        showNextRuns = 0
    }: CronScheduleProps = $props();

    let fields = $derived(expression.trim().split(/\s+/));

    const fieldNumber = 5;
</script>

{#if fields.length !== fieldNumber}
    <div
        data-slot="cron-schedule"
        class={cn(
            'rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive',
            className
        )}
    >
        Invalid cron expression. Expected {fieldNumber} fields, got {fields.length}.
    </div>
{:else}
    {@const summary = humanReadable(fields)}
    {@const nextRuns =
        showNextRuns > 0
            ? getNextRuns(fields, showNextRuns, referenceDate)
            : []}
    <div
        data-slot="cron-schedule"
        class={cn(
            'overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm',
            className
        )}
    >
        <div
            class="flex items-start justify-between gap-3 border-b border-border/40 px-4 py-3"
        >
            <div class="flex flex-col gap-1">
                {#if title}
                    <h3 class="text-sm font-semibold text-foreground">
                        {title}
                    </h3>
                {/if}
                <p class="text-sm text-muted-foreground">{summary}</p>
            </div>
            <code
                class="shrink-0 rounded-md bg-muted px-2.5 py-1 font-mono text-xs text-foreground"
            >
                {expression}
            </code>
        </div>

        <div class="grid grid-cols-5 divide-x divide-border/40">
            {#each fields as field, i (field + i)}
                {@render fieldSnippet(field, i)}
            {/each}
        </div>
        {#if nextRuns.length > 0}
            <div class="border-t border-border/40 px-4 py-3">
                <p
                    class="mb-2 text-[10px] font-medium tracking-wide text-muted-foreground uppercase"
                >
                    Next {nextRuns.length === 1
                        ? 'run'
                        : `${nextRuns.length} runs`}
                </p>
                <ol class="flex flex-col gap-1">
                    {#each nextRuns as nextRun, i (nextRun.toISOString())}
                        {@render nextRunSnippet(nextRun, i)}
                    {/each}
                </ol>
            </div>
        {/if}
    </div>
{/if}

{#snippet fieldSnippet(field: string, pos: number)}
    {@const [min, max] = FIELD_RANGES[pos]}
    {@const description = describeField(field, pos, min, max)}
    <div class="flex flex-col items-center gap-1.5 px-2 py-3">
        <span
            class="text-[10px] font-medium tracking-wide text-muted-foreground uppercase"
        >
            {FIELD_NAMES[pos]}
        </span>
        <span class="font-mono text-sm font-semibold text-foreground">
            {field}
        </span>
        <span class="text-center text-[11px] text-muted-foreground">
            {description}
        </span>
    </div>
{/snippet}

{#snippet nextRunSnippet(run: Date, pos: number)}
    <li class="flex items-center gap-2 text-sm">
        <span
            class="flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground"
        >
            {pos + 1}
        </span>
        <span class="font-mono text-xs text-foreground">
            {formatNextRun(run)}
        </span>
    </li>
{/snippet}
