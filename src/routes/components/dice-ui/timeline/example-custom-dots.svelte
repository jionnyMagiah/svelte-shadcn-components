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
    import { Code, Layers, Rocket } from '@lucide/svelte';

    const timelineItems = [
        {
            id: 'project-kickoff',
            dateTime: '2025-01-15',
            date: 'January 15, 2025',
            title: 'Project Kickoff',
            description: 'Initial meeting to define scope.',
            icon: Rocket
        },
        {
            id: 'design-phase',
            dateTime: '2025-02-01',
            date: 'February 1, 2025',
            title: 'Design Phase',
            description: 'Created wireframes and mockups.',
            icon: Layers
        },
        {
            id: 'development',
            dateTime: '2025-03-01',
            date: 'March 1, 2025',
            title: 'Development',
            description: 'Building core features.',
            icon: Code
        }
    ];
</script>

<TimelineRoot activeIndex={1} class="[--timeline-dot-size:2rem]">
    {#each timelineItems as item (item.id)}
        <TimelineItem>
            <TimelineDot>
                {@const ItemIcon = item.icon}
                <ItemIcon class="size-3.5" />
            </TimelineDot>
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
