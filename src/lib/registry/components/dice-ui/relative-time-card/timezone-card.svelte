<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';

    export type TimezoneCardProps = HTMLAttributes<HTMLDivElement> & {
        date: Date;
        timezone?: string;
    };
</script>

<script lang="ts">
    let { date, timezone, ...cardProps }: TimezoneCardProps = $props();

    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    let timezoneName = $derived(
        timezone ??
            new Intl.DateTimeFormat(locale, { timeZoneName: 'shortOffset' })
                .formatToParts(date)
                .find((part) => part.type === 'timeZoneName')?.value
    );
    let formattedDate = $derived(
        new Intl.DateTimeFormat(locale, {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            timeZone: timezone
        }).format(date)
    );
    let formattedTime = $derived(
        new Intl.DateTimeFormat(locale, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: timezone
        }).format(date)
    );
</script>

<div
    role="region"
    aria-label={`Time in ${timezoneName}: ${formattedDate} ${formattedTime}`}
    {...cardProps}
    class="flex items-center justify-between gap-2 text-sm text-muted-foreground"
>
    <span class="w-fit rounded bg-accent px-1 text-xs font-medium">
        {timezoneName}
    </span>
    <div class="flex items-center gap-2">
        <time dateTime={date.toISOString()}>{formattedDate}</time>
        <time class="tabular-nums" dateTime={date.toISOString()}>
            {formattedTime}
        </time>
    </div>
</div>
