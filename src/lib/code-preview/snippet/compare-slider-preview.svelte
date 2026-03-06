<script lang="ts">
    import CompareSliderAfter from '$lib/registry/components/dice-ui/compare-slider/compare-slider-after.svelte';
    import CompareSliderBefore from '$lib/registry/components/dice-ui/compare-slider/compare-slider-before.svelte';
    import CompareSliderHandle from '$lib/registry/components/dice-ui/compare-slider/compare-slider-handle.svelte';
    import CompareSlider from '$lib/registry/components/dice-ui/compare-slider/compare-slider.svelte';
</script>

<CompareSlider class="h-100 overflow-hidden rounded-lg border">
    <CompareSliderBefore>
        <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&auto=format&fm=webp&q=80"
            alt="Before"
            class="size-full object-cover"
        />
    </CompareSliderBefore>
    <CompareSliderAfter>
        <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&auto=format&fm=webp&q=80&sat=-100"
            alt="After"
            class="size-full object-cover grayscale"
        />
    </CompareSliderAfter>
    <CompareSliderHandle />
</CompareSlider>
