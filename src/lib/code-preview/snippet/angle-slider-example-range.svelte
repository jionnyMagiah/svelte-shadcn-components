<script lang="ts">
    import AngleSliderRange from '$lib/registry/components/dice-ui/angle-slider/angle-slider-range.svelte';
    import AngleSliderRoot from '$lib/registry/components/dice-ui/angle-slider/angle-slider-root.svelte';
    import AngleSliderThumb from '$lib/registry/components/dice-ui/angle-slider/angle-slider-thumb.svelte';
    import AngleSliderTrack from '$lib/registry/components/dice-ui/angle-slider/angle-slider-track.svelte';
    import AngleSliderValue from '$lib/registry/components/dice-ui/angle-slider/angle-slider-value.svelte';

    let value = $state([90, 270]);
</script>

<div class="flex flex-col items-center gap-4">
    <AngleSliderRoot
        {value}
        onValueChange={(v) => {
            value = v;
        }}
        max={360}
        min={0}
        step={5}
        size={80}
        minStepsBetweenThumbs={2}
    >
        <AngleSliderTrack>
            <AngleSliderRange />
        </AngleSliderTrack>
        <AngleSliderThumb index={0} />
        <AngleSliderThumb index={1} />
        <AngleSliderValue />
    </AngleSliderRoot>
    <div class="flex flex-col gap-2 text-center text-sm">
        <p>
            <strong>Range:</strong>
            {value[0]}° - {value[1]}°
        </p>
        <p>
            <strong>Arc Length:</strong>
            {Math.abs((value[1] ?? 0) - (value[0] ?? 0))}°
        </p>
    </div>
</div>
