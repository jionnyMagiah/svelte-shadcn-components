<script lang="ts">
    import CompareSliderAfter from '$lib/registry/components/dice-ui/compare-slider/compare-slider-after.svelte';
    import CompareSliderBefore from '$lib/registry/components/dice-ui/compare-slider/compare-slider-before.svelte';
    import CompareSliderHandle from '$lib/registry/components/dice-ui/compare-slider/compare-slider-handle.svelte';
    import CompareSliderLabel from '$lib/registry/components/dice-ui/compare-slider/compare-slider-label.svelte';
    import CompareSlider from '$lib/registry/components/dice-ui/compare-slider/compare-slider.svelte';
</script>

<CompareSlider>
    <CompareSliderBefore label="Original">Content</CompareSliderBefore>
    <CompareSliderAfter label="Enhanced">Content</CompareSliderAfter>
    <CompareSliderHandle />
</CompareSlider>

<CompareSlider>
    <CompareSliderBefore>Content</CompareSliderBefore>
    <CompareSliderAfter>Content</CompareSliderAfter>
    <CompareSliderHandle />
    <CompareSliderLabel side="before" class="bg-blue-500/90 text-white">
        Original
    </CompareSliderLabel>
    <CompareSliderLabel side="after" class="bg-green-500/90 text-white">
        Enhanced
    </CompareSliderLabel>
</CompareSlider>
