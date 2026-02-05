<script lang="ts">
    import CompareSliderAfter from '$lib/registry/components/dice-ui/compare-slider/compare-slider-after.svelte';
    import CompareSliderBefore from '$lib/registry/components/dice-ui/compare-slider/compare-slider-before.svelte';
    import CompareSliderHandle from '$lib/registry/components/dice-ui/compare-slider/compare-slider-handle.svelte';
    import CompareSlider from '$lib/registry/components/dice-ui/compare-slider/compare-slider.svelte';
</script>

<CompareSlider orientation="vertical" class="h-150">
    <CompareSliderBefore class="h-full w-full bg-green-500"
        >Top content</CompareSliderBefore
    >
    <CompareSliderAfter class="h-full w-full bg-blue-500"
        >Bottom content</CompareSliderAfter
    >
    <CompareSliderHandle />
</CompareSlider>
