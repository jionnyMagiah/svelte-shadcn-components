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
</script>

<TimelineRoot>
    <TimelineItem>
        <TimelineDot />
        <TimelineConnector />
        <TimelineContent>
            <TimelineHeader>
                <TimelineTitle />
                <TimelineTime />
            </TimelineHeader>
            <TimelineDescription />
        </TimelineContent>
    </TimelineItem>
</TimelineRoot>
