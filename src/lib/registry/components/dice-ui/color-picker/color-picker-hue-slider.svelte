<script lang="ts" module>
    import { cn } from '$lib/utils';
    import { Slider, type SliderMultipleRootProps } from 'bits-ui';
    import {
        ColorPickerContext,
        ColorPickerStoreContext
    } from './context.svelte';
    import { hsvToRgb, type HSVColorValue } from './utils';
    type ColorPickerHueSliderProps = Omit<SliderMultipleRootProps, 'type'> & {};
</script>

<script lang="ts">
    const { class: className, ...sliderProps }: ColorPickerHueSliderProps =
        $props();

    const context = ColorPickerContext.get();
    const store = ColorPickerStoreContext.get();
    const hsv = $derived(store.getState().hsv);
</script>

<Slider.Root
    data-slot="color-picker-hue-slider"
    {...sliderProps}
    type="multiple"
    max={360}
    step={1}
    disabled={context.opts.disabled?.current}
    class={cn(
        'relative flex w-full touch-none items-center select-none',
        className
    )}
    bind:value={
        () => [hsv.h ?? 0],
        (values) => {
            const newHsv: HSVColorValue = {
                h: values[0] ?? 0,
                s: hsv?.s ?? 0,
                v: hsv?.v ?? 0,
                a: hsv?.a ?? 1
            };
            store.setHsv(newHsv);
            store.setColor(hsvToRgb(newHsv));
        }
    }
>
    <div
        class="relative h-3 w-full grow overflow-hidden rounded-full bg-[linear-gradient(to_right,#ff0000_0%,#ffff00_16.66%,#00ff00_33.33%,#00ffff_50%,#0000ff_66.66%,#ff00ff_83.33%,#ff0000_100%)]"
    >
        <Slider.Range class="absolute h-full" />
    </div>
    <Slider.Thumb
        index={0}
        class="block size-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
    />
</Slider.Root>
