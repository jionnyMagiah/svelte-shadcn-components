<script lang="ts">
    import AngleSliderRange from '$lib/registry/components/dice-ui/angle-slider/angle-slider-range.svelte';
    import AngleSliderRoot from '$lib/registry/components/dice-ui/angle-slider/angle-slider-root.svelte';
    import AngleSliderThumb from '$lib/registry/components/dice-ui/angle-slider/angle-slider-thumb.svelte';
    import AngleSliderTrack from '$lib/registry/components/dice-ui/angle-slider/angle-slider-track.svelte';
    import AngleSliderValue from '$lib/registry/components/dice-ui/angle-slider/angle-slider-value.svelte';
</script>

<AngleSliderRoot defaultValue={[180]} max={360} min={0} step={1}>
    <AngleSliderTrack>
        <AngleSliderRange />
    </AngleSliderTrack>
    <AngleSliderThumb />
    <AngleSliderValue />
</AngleSliderRoot>
