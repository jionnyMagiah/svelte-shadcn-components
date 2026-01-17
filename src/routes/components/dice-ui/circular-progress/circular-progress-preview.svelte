<script lang="ts">
    import CircularProgressIndicator from '$lib/registry/components/dice-ui/circular-progress/circular-progress-indicator.svelte';
    import CircularProgressRange from '$lib/registry/components/dice-ui/circular-progress/circular-progress-range.svelte';
    import CircularProgressRoot from '$lib/registry/components/dice-ui/circular-progress/circular-progress-root.svelte';
    import CircularProgressTrack from '$lib/registry/components/dice-ui/circular-progress/circular-progress-track.svelte';
    import CircularProgressValueText from '$lib/registry/components/dice-ui/circular-progress/circular-progress-value-text.svelte';

    let value = $state(0);

    const interval = setInterval(() => {
        console.log('run');

        if (value >= 100) {
            clearInterval(interval);
            value = 100;
            return;
        }
        value += 2;
    }, 150);
</script>

<CircularProgressRoot {value} size={60}>
    <CircularProgressIndicator>
        <CircularProgressTrack />
        <CircularProgressRange />
    </CircularProgressIndicator>
    <CircularProgressValueText />
</CircularProgressRoot>
