<script lang="ts">
    import CompareSliderAfter from '$lib/registry/components/dice-ui/compare-slider/compare-slider-after.svelte';
    import CompareSliderBefore from '$lib/registry/components/dice-ui/compare-slider/compare-slider-before.svelte';
    import CompareSliderHandle from '$lib/registry/components/dice-ui/compare-slider/compare-slider-handle.svelte';
    import CompareSlider from '$lib/registry/components/dice-ui/compare-slider/compare-slider.svelte';
</script>

<CompareSlider defaultValue={50} class="h-75 overflow-hidden rounded-lg border">
    <CompareSliderBefore
        class="flex size-full items-center justify-center bg-muted text-center"
    >
        <div class="text-2xl font-bold">Kickflip</div>
    </CompareSliderBefore>
    <CompareSliderAfter
        class="flex size-full items-center justify-center bg-primary text-center text-primary-foreground"
    >
        <div class="text-2xl font-bold">Heelflip</div>
    </CompareSliderAfter>
    <CompareSliderHandle>
        <div
            class="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        >
            <span class="text-xs font-bold">VS</span>
        </div>
    </CompareSliderHandle>
</CompareSlider>
