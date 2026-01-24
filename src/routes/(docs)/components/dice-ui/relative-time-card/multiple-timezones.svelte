<script lang="ts">
    import * as RelativeTimeCard from '$lib/registry/components/dice-ui/relative-time-card';
    const now = new Date();
</script>

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
