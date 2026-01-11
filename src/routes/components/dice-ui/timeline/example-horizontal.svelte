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
            id: 'research-and-planning',
            dateTime: '2025-01',
            date: 'Jan - Mar',
            title: 'Q1',
            description: 'Research and planning'
        },
        {
            id: 'development-sprint',
            dateTime: '2025-04',
            date: 'Apr - Jun',
            title: 'Q2',
            description: 'Development sprint'
        },
        {
            id: 'beta-launch',
            dateTime: '2025-07',
            date: 'Jul - Sep',
            title: 'Q3',
            description: 'Beta launch'
        }
    ];
</script>

<TimelineRoot orientation="horizontal" activeIndex={1}>
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
