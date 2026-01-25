<script lang="ts" module>
    import { cn } from '$lib/utils';
    import { Slider, type SliderMultipleRootProps } from 'bits-ui';
    import {
        ColorPickerContext,
        ColorPickerStoreContext
    } from './context.svelte';
    type ColorPickerAlphaSliderProps = Omit<
        SliderMultipleRootProps,
        'type'
    > & {};
</script>

<script lang="ts">
    const { class: className, ...sliderProps }: ColorPickerAlphaSliderProps =
        $props();

    const context = ColorPickerContext.get();
    const store = ColorPickerStoreContext.get();
    const color = $derived(store.getState().color);
    const hsv = $derived(store.getState().hsv);

    const gradientColor = $derived(
        `rgb(${color?.r ?? 0}, ${color?.g ?? 0}, ${color?.b ?? 0})`
    );
</script>

<Slider.Root
    data-slot="color-picker-alpha-slider"
    {...sliderProps}
    type="multiple"
    max={100}
    step={1}
    disabled={context.opts.disabled?.current}
    class={cn(
        'relative flex w-full touch-none items-center select-none',
        className
    )}
    bind:value={
        () => [Math.round((color?.a ?? 1) * 100)],
        (values) => {
            const alpha = (values[0] ?? 0) / 100;
            const newColor = { ...color, a: alpha };
            const newHsv = { ...hsv, a: alpha };
            store.setColor(newColor);
            store.setHsv(newHsv);
        }
    }
>
    <div
        class="relative h-3 w-full grow overflow-hidden rounded-full"
        style:background="linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)"
        style:background-size="8px 8px"
        style:background-position="0 0, 0 4px, 4px -4px, -4px 0px"
    >
        <div
            class="absolute inset-0 rounded-full"
            style:background={`linear-gradient(to right, transparent, ${gradientColor})`}
        ></div>
        <Slider.Range class="absolute h-full" />
    </div>
    <Slider.Thumb
        index={0}
        class="block size-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
    />
</Slider.Root>
