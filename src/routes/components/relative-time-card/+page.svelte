<script lang="ts">
    import ComponentDoc from '$lib/components/component-doc.svelte';
    import DisplayProp, {
        type PropDesc
    } from '$lib/components/display-prop.svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import * as RelativeTimeCard from '$lib/registry/components/relative-time-card';
    import { Calendar1, Clock } from '@lucide/svelte';
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    const relativeTimeCardProps: PropDesc[] = [];

    const layoutCode = '';
</script>

<ComponentDoc
    componentName="Relative Time Card"
    shortDesc="A hover card that displays relative time relative to local time with
    timezone information."
>
    {#snippet examples()}
        <h3 id="multiple-timezones">With Multiple Timezones</h3>
        <div class="flex flex-col gap-4">
            <RelativeTimeCard.Root
                date={now}
                timezones={[
                    'America/Los_Angeles',
                    'America/New_York',
                    'Europe/London',
                    'Asia/Singapore',
                    'Asia/Tokyo'
                ]}
            />
            <RelativeTimeCard.Root
                date={now}
                timezones={[
                    'America/Chicago',
                    'Europe/Paris',
                    'Asia/Dubai',
                    'Australia/Sydney'
                ]}
            />
            <RelativeTimeCard.Root date={now} timezones={['UTC']} />
        </div>
        <h3 id="variants">With Variants</h3>
        <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-2">
                <span class="text-sm text-muted-foreground">Style variants</span
                >
                <div class="flex items-center gap-4">
                    <RelativeTimeCard.Root date={now} variant="default" />
                    <RelativeTimeCard.Root date={now} variant="muted" />
                    <RelativeTimeCard.Root date={now} variant="ghost" />
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-sm text-muted-foreground">Custom styling</span
                >
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
                    </RelativeTimeCard.Root>
                    <RelativeTimeCard.Root
                        date={now}
                        side="top"
                        align="center"
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
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-sm text-muted-foreground">Custom trigger</span
                >
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
    {/snippet}

    {#snippet layout()}{/snippet}

    {#snippet apiReference()}
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
            The main component that displays relative time with hover
            functionality.
            <DisplayProp props={relativeTimeCardProps} />
        </p>
    {/snippet}
</ComponentDoc>
