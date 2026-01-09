<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import * as RelativeTimeCard from '$lib/registry/components/dice-ui/relative-time-card';
    import { Clock } from '@lucide/svelte';

    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
</script>

<div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-foreground">Basic usage</span>
        <RelativeTimeCard.Root date={fiveMinutesAgo} />
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-foreground"> Different variants </span>
        <div class="flex items-center gap-4">
            <RelativeTimeCard.Root date={oneHourAgo} variant="default" />
            <RelativeTimeCard.Root date={oneHourAgo} variant="muted" />
            <RelativeTimeCard.Root date={oneHourAgo} variant="ghost" />
        </div>
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-foreground">
            With time in the future
        </span>
        <div class="flex items-center gap-4">
            <RelativeTimeCard.Root date={tomorrow} />
        </div>
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-foreground"> Multiple timezones </span>
        <RelativeTimeCard.Root
            date={oneDayAgo}
            timezones={['America/New_York', 'Europe/London', 'Asia/Tokyo']}
        />
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-foreground">Custom trigger</span>
        <RelativeTimeCard.Root date={now}>
            {#snippet child({ props })}
                <Button variant="outline" size="sm" {...props} class="w-min">
                    <Clock />
                    View time details
                </Button>
            {/snippet}
        </RelativeTimeCard.Root>
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-foreground"> Different positions </span>
        <div class="flex items-center gap-4">
            <RelativeTimeCard.Root date={now} side="top" align="start">
                Top Start
            </RelativeTimeCard.Root>
            <RelativeTimeCard.Root date={now} side="right" align="center">
                Right Center
            </RelativeTimeCard.Root>
            <RelativeTimeCard.Root date={now} side="bottom" align="end">
                Bottom End
            </RelativeTimeCard.Root>
        </div>
    </div>
</div>
