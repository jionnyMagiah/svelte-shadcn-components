<script lang="ts">
    import GaugeIndicator from '$lib/registry/components/dice-ui/gauge/gauge-indicator.svelte';
    import GaugeLabel from '$lib/registry/components/dice-ui/gauge/gauge-label.svelte';
    import GaugeRange from '$lib/registry/components/dice-ui/gauge/gauge-range.svelte';
    import GaugeTrack from '$lib/registry/components/dice-ui/gauge/gauge-track.svelte';
    import GaugeValueText from '$lib/registry/components/dice-ui/gauge/gauge-value-text.svelte';
    import Gauge from '$lib/registry/components/dice-ui/gauge/gauge.svelte';

    const variants = [
        { startAngle: -90, endAngle: 90, label: 'Semi Circle' },
        { startAngle: -135, endAngle: 135, label: 'Three Quarter' },
        { startAngle: 0, endAngle: 360, label: 'Full Circle' }
    ];
</script>

<div class="flex flex-wrap items-center justify-center gap-12">
    {#each variants as variant, i (i)}
        <div class="flex flex-col items-center gap-3">
            <Gauge
                value={72}
                size={140}
                thickness={10}
                startAngle={variant.startAngle}
                endAngle={variant.endAngle}
            >
                <GaugeIndicator>
                    <GaugeTrack />
                    <GaugeRange />
                </GaugeIndicator>
                <GaugeValueText />
                <GaugeLabel>{variant.label}</GaugeLabel>
            </Gauge>
        </div>
    {/each}
</div>
