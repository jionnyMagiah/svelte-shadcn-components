<script lang="ts">
    import GaugeIndicator from '$lib/registry/components/dice-ui/gauge/gauge-indicator.svelte';
    import GaugeLabel from '$lib/registry/components/dice-ui/gauge/gauge-label.svelte';
    import GaugeRange from '$lib/registry/components/dice-ui/gauge/gauge-range.svelte';
    import GaugeTrack from '$lib/registry/components/dice-ui/gauge/gauge-track.svelte';
    import GaugeValueText from '$lib/registry/components/dice-ui/gauge/gauge-value-text.svelte';
    import Gauge from '$lib/registry/components/dice-ui/gauge/gauge.svelte';
</script>

<Gauge value={85} size={180} thickness={12}>
    <GaugeIndicator>
        <GaugeTrack />
        <GaugeRange />
    </GaugeIndicator>
    <GaugeValueText />
    <GaugeLabel class="sr-only">Performance</GaugeLabel>
</Gauge>
