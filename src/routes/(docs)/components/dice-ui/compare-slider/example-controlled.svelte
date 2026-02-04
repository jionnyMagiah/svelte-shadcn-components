<script lang="ts">
    import Input from '$lib/components/ui/input/input.svelte';
    import CompareSliderAfter from '$lib/registry/components/dice-ui/compare-slider/compare-slider-after.svelte';
    import CompareSliderBefore from '$lib/registry/components/dice-ui/compare-slider/compare-slider-before.svelte';
    import CompareSliderHandle from '$lib/registry/components/dice-ui/compare-slider/compare-slider-handle.svelte';
    import CompareSlider from '$lib/registry/components/dice-ui/compare-slider/compare-slider.svelte';
    let value = $state(30);
</script>

<div class="flex w-full flex-col items-center gap-2">
    <Input bind:value min={0} max={100} type="number" class='w-1/2' />
    <CompareSlider
        {value}
        onValueChange={(v) => (value = v)}
        class="h-100 overflow-hidden rounded-lg border"
    >
        <CompareSliderBefore label="Original">
            <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&auto=format&fm=webp&q=80"
                alt="Original"
                class="size-full object-cover"
            />
        </CompareSliderBefore>
        <CompareSliderAfter label="Enhanced">
            <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&auto=format&fm=webp&q=80&sat=50"
                alt="Enhanced"
                class="size-full object-cover"
            />
        </CompareSliderAfter>
        <CompareSliderHandle />
    </CompareSlider>
</div>
