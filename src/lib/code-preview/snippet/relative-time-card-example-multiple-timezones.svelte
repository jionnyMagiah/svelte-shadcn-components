<script lang="ts">
    import RelativeTimeCard from '$lib/registry/components/dice-ui/relative-time-card/relative-time-card.svelte';

    const now = new Date();
</script>

<div class="flex flex-col gap-4">
    <RelativeTimeCard
        date={now}
        timezones={[
            'America/Los_Angeles',
            'America/New_York',
            'Europe/London',
            'Asia/Singapore',
            'Asia/Tokyo'
        ]}
    />
    <RelativeTimeCard
        date={now}
        timezones={[
            'America/Chicago',
            'Europe/Paris',
            'Asia/Dubai',
            'Australia/Sydney'
        ]}
    />
    <RelativeTimeCard date={now} timezones={['UTC']} />
</div>
