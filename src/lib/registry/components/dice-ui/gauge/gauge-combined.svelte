<script lang="ts">
    import GaugeIndicator from './gauge-indicator.svelte';
    import GaugeRange from './gauge-range.svelte';
    import GaugeTrack from './gauge-track.svelte';
    import GaugeValueText from './gauge-value-text.svelte';
    import Gauge from './gauge.svelte';
    import type { GaugeProps } from './utils';

    let { children, ...props }: GaugeProps = $props();
</script>

<Gauge {...props}>
    <GaugeIndicator>
        <GaugeTrack />
        <GaugeRange />
    </GaugeIndicator>
    <GaugeValueText>
        {@render children?.()}
    </GaugeValueText>
</Gauge>
