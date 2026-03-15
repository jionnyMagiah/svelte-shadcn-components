<script lang="ts">
    import CronSchedule from '$lib/registry/components/jal-co-ui/cron-schedule/cron-schedule.svelte';
    import * as Select from '$lib/components/ui/select/index.js';

    const schedules = [
        {
            value: 'notification',
            label: 'Notification Digest',
            expression: '30 8,12,17 * * 1-5',
            nextRuns: 5
        },
        {
            value: 'sync',
            label: 'Data Sync',
            expression: '0 */6 * * *',
            nextRuns: 3
        }
    ];

    let value = $state('notification');

    const triggerContent = $derived(
        schedules.find((f) => f.value === value)?.label ?? 'Select a schedule'
    );

    const schedule = $derived(schedules.find((s) => s.value === value));
</script>

<div class="flex w-full flex-col items-center gap-4">
    <div class="flex flex-col items-start gap-2">
        <span class="text-muted-foreground">Select a schedule</span>
        <Select.Root type="single" bind:value>
            <Select.Trigger class="w-70">
                {triggerContent}
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    {#each schedules as schedule (schedule.value)}
                        <Select.Item
                            value={schedule.value}
                            label={schedule.label}
                        >
                            {schedule.label}
                        </Select.Item>
                    {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    </div>

    <CronSchedule
        expression={schedule?.expression ?? ''}
        title={schedule?.label}
        showNextRuns={schedule?.nextRuns}
    />
</div>
