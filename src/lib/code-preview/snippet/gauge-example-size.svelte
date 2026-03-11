<script lang="ts">
    import GaugeIndicator from '$lib/registry/components/dice-ui/gauge/gauge-indicator.svelte';
    import GaugeLabel from '$lib/registry/components/dice-ui/gauge/gauge-label.svelte';
    import GaugeRange from '$lib/registry/components/dice-ui/gauge/gauge-range.svelte';
    import GaugeTrack from '$lib/registry/components/dice-ui/gauge/gauge-track.svelte';
    import GaugeValueText from '$lib/registry/components/dice-ui/gauge/gauge-value-text.svelte';
    import Gauge from '$lib/registry/components/dice-ui/gauge/gauge.svelte';

    const sizes = [
        {
            size: 100,
            thickness: 6,
            label: 'Small',
            valueTextClassName: 'text-xl'
        },
        {
            size: 140,
            thickness: 10,
            label: 'Medium',
            valueTextClassName: 'text-3xl'
        },
        {
            size: 180,
            thickness: 12,
            label: 'Large',
            valueTextClassName: 'text-4xl'
        }
    ] as const;
</script>

<!-- todo: add animation like in original example -->
<div class="flex flex-wrap items-end justify-center gap-8">
    {#each sizes as config, i (i)}
        <div class="flex flex-col items-center gap-2">
            <Gauge value={68} size={config.size} thickness={config.thickness}>
                <GaugeIndicator>
                    <GaugeTrack />
                    <GaugeRange />
                </GaugeIndicator>
                <GaugeValueText class={config.valueTextClassName} />
                <GaugeLabel class="sr-only">{config.label}</GaugeLabel>
            </Gauge>
            <p class="text-sm text-muted-foreground">{config.label}</p>
        </div>
    {/each}
</div>
