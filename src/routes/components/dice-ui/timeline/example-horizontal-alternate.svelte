<script lang="ts">
    import TimelineConnector from '$lib/registry/components/dice-ui/timeline/timeline-connector.svelte';
    import TimelineContent from '$lib/registry/components/dice-ui/timeline/timeline-content.svelte';
    import TimelineDescription from '$lib/registry/components/dice-ui/timeline/timeline-description.svelte';
    import TimelineDot from '$lib/registry/components/dice-ui/timeline/timeline-dot.svelte';
    import TimelineHeader from '$lib/registry/components/dice-ui/timeline/timeline-header.svelte';
    import TimelineItem from '$lib/registry/components/dice-ui/timeline/timeline-item.svelte';
    import TimelineRoot from '$lib/registry/components/dice-ui/timeline/timeline-root.svelte';
    import TimelineTime from '$lib/registry/components/dice-ui/timeline/timeline-time.svelte';
    import TimelineTitle from '$lib/registry/components/dice-ui/timeline/timeline-title.svelte';

    const timelineItems = [
        {
            id: 'company-founded',
            dateTime: '2023-06',
            date: 'June 2023',
            title: 'Company Founded',
            description: 'Started with a team of five.'
        },
        {
            id: 'series-a-funding',
            dateTime: '2024-03',
            date: 'March 2024',
            title: 'Series A Funding',
            description: 'Raised $10M seed funding.'
        },
        {
            id: 'product-launch',
            dateTime: '2025-01',
            date: 'January 2025',
            title: 'Product Launch',
            description: 'Released MVP to beta testers.'
        }
    ];
</script>

<TimelineRoot variant="alternate" orientation="horizontal" activeIndex={1}>
    {#each timelineItems as item (item.id)}
        <TimelineItem>
            <TimelineDot />
            <TimelineConnector />
            <TimelineContent>
                <TimelineHeader>
                    <TimelineTitle>{item.title}</TimelineTitle>
                    <TimelineTime datetime={item.dateTime}
                        >{item.date}</TimelineTime
                    >
                </TimelineHeader>
                <TimelineDescription>{item.description}</TimelineDescription>
            </TimelineContent>
        </TimelineItem>
    {/each}
</TimelineRoot>
