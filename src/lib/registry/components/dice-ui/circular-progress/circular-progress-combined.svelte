<script lang="ts">
    import CircularProgressIndicator from '$lib/registry/components/dice-ui/circular-progress/circular-progress-indicator.svelte';
    import CircularProgressRange from '$lib/registry/components/dice-ui/circular-progress/circular-progress-range.svelte';
    import CircularProgressRoot from '$lib/registry/components/dice-ui/circular-progress/circular-progress-root.svelte';
    import CircularProgressTrack from '$lib/registry/components/dice-ui/circular-progress/circular-progress-track.svelte';
    import CircularProgressValueText from '$lib/registry/components/dice-ui/circular-progress/circular-progress-value-text.svelte';

    let props: CircularProgressRoot = $props();
</script>

<CircularProgressRoot {...props}>
    <CircularProgressIndicator>
        <CircularProgressTrack />
        <CircularProgressRange />
    </CircularProgressIndicator>
    <CircularProgressValueText />
</CircularProgressRoot>
