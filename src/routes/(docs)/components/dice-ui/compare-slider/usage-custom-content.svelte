<script lang="ts">
    import CompareSliderAfter from '$lib/registry/components/dice-ui/compare-slider/compare-slider-after.svelte';
    import CompareSliderBefore from '$lib/registry/components/dice-ui/compare-slider/compare-slider-before.svelte';
    import CompareSliderHandle from '$lib/registry/components/dice-ui/compare-slider/compare-slider-handle.svelte';
    import CompareSlider from '$lib/registry/components/dice-ui/compare-slider/compare-slider.svelte';
</script>

<CompareSlider class="h-20">
    <CompareSliderBefore>
        <div class="flex h-full items-center justify-center bg-blue-500">
            <p>Old Design</p>
        </div>
    </CompareSliderBefore>
    <CompareSliderAfter>
        <div class="flex h-full items-center justify-center bg-green-500">
            <p>New Design</p>
        </div>
    </CompareSliderAfter>
    <CompareSliderHandle />
</CompareSlider>
