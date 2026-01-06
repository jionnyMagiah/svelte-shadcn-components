<script lang="ts">
    import DisplayProp, {
        type PropDesc
    } from '$lib/components/display-prop.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import * as RelativeTimeCard from '$lib/registry/components/relative-time-card';
    import { Calendar1, Clock } from '@lucide/svelte';
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    const relativeTimeCardProps: PropDesc[] = [];
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
    Relative Time Card
</h1>

<p>
    A hover card that displays relative time relative to local time with
    timezone information.
</p>
<div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-foreground">Style variants</span>
        <div class="flex items-center gap-4">
            <RelativeTimeCard.Root date={now} variant="default" />
            <RelativeTimeCard.Root date={now} variant="muted" />
            <RelativeTimeCard.Root date={now} variant="ghost" />
        </div>
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-foreground">Custom styling</span>
        <div class="flex items-center gap-4">
            <RelativeTimeCard.Root
                date={now}
                class="text-blue-500 hover:text-blue-700"
            />
            <RelativeTimeCard.Root
                date={now}
                class="font-semibold text-green-600 hover:text-green-800"
            />
            <RelativeTimeCard.Root
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
            <RelativeTimeCard.Root
                date={now}
                side="top"
                align="start"
                sideOffset={10}
            >
                Top aligned
            </RelativeTimeCard.Root>
            <RelativeTimeCard.Root
                date={now}
                side="right"
                align="center"
                sideOffset={10}
            >
                Right aligned
            </RelativeTimeCard.Root>
            <RelativeTimeCard.Root
                date={now}
                side="bottom"
                align="end"
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
            </RelativeTimeCard.Root>
        </div>
    </div>
    <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-foreground">Custom trigger</span>
        <div class="flex items-center gap-4">
            <RelativeTimeCard.Root date={now}>
                {#snippet child({ props })}
                    <Button variant="outline" size="sm" {...props}>
                        <Clock />
                        Time details
                    </Button>
                {/snippet}
            </RelativeTimeCard.Root>
            <RelativeTimeCard.Root date={now}>
                <div class="flex items-center gap-2 text-emerald-600">
                    <Calendar1 />
                    <span>View date</span>
                </div>
            </RelativeTimeCard.Root>
        </div>
    </div>
</div>

<h2
    class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
>
    Reference
</h2>
<div>
    <p>
        The component is inspired by the <a
            class="link"
            href="https://www.diceui.com/docs/components/relative-time-card#relativetimecard"
            >Dice UI Relative Time Card</a
        > component.
    </p>
    <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
        RelativeTimeCard
    </h3>
    <p>
        The main component that displays relative time with hover functionality.
        <DisplayProp props={relativeTimeCardProps} />
    </p>
</div>
