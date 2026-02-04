<script lang="ts">
    import CompareSliderAfter from '$lib/registry/components/dice-ui/compare-slider/compare-slider-after.svelte';
    import CompareSliderBefore from '$lib/registry/components/dice-ui/compare-slider/compare-slider-before.svelte';
    import CompareSliderHandle from '$lib/registry/components/dice-ui/compare-slider/compare-slider-handle.svelte';
    import CompareSlider from '$lib/registry/components/dice-ui/compare-slider/compare-slider.svelte';
</script>

<CompareSlider>
    <CompareSliderBefore />
    <CompareSliderAfter />
    <CompareSliderHandle />
</CompareSlider>
