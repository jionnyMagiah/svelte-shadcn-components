<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import RelativeTimeCard from '$lib/registry/components/dice-ui/relative-time-card/relative-time-card.svelte';
    import { Calendar1, Clock } from '@lucide/svelte';
    const now = new Date();
</script>

<div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-foreground">Style variants</span>
        <div class="flex items-center gap-4">
            <RelativeTimeCard date={now} variant="default" />
            <RelativeTimeCard date={now} variant="muted" />
            <RelativeTimeCard date={now} variant="ghost" />
        </div>
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-foreground">Custom styling</span>
        <div class="flex items-center gap-4">
            <RelativeTimeCard
                date={now}
                class="text-blue-500 hover:text-blue-700"
            />
            <RelativeTimeCard
                date={now}
                class="font-semibold text-green-600 hover:text-green-800"
            />
            <RelativeTimeCard
                date={now}
                class="text-purple-500 italic hover:text-purple-700"
            />
        </div>
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-foreground">
            Hover card positions
        </span>
        <div class="flex items-center gap-4">
            <RelativeTimeCard
                date={now}
                side="bottom"
                align="center"
                timezones={[
                    'America/Los_Angeles',
                    'America/New_York',
                    'Europe/London',
                    'Asia/Singapore',
                    'Asia/Tokyo'
                ]}
                sideOffset={10}
            >
                Bottom aligned
            </RelativeTimeCard>
            <RelativeTimeCard
                date={now}
                side="top"
                align="center"
                sideOffset={10}
            >
                Top aligned
            </RelativeTimeCard>
            <RelativeTimeCard
                date={now}
                side="right"
                align="center"
                sideOffset={10}
            >
                Right aligned
            </RelativeTimeCard>
        </div>
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-foreground">Custom trigger</span>
        <div class="flex items-center gap-4">
            <RelativeTimeCard date={now}>
                {#snippet child({ props })}
                    <Button variant="outline" size="sm" {...props}>
                        <Clock />
                        Time details
                    </Button>
                {/snippet}
            </RelativeTimeCard>
            <RelativeTimeCard date={now}>
                <div class="flex items-center gap-2 text-emerald-600">
                    <Calendar1 />
                    <span>View date</span>
                </div>
            </RelativeTimeCard>
        </div>
    </div>
</div>
