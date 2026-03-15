<script lang="ts">
    import CronSchedule from '$lib/registry/components/jal-co-ui/cron-schedule/cron-schedule.svelte';
</script>

<CronSchedule
    expression="0 9 * * 1-5"
    title="Daily Standup Reminder"
    showNextRuns={3}
    referenceDate={new Date('2026-03-11T10:00:00')}
/>
