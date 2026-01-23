<script lang="ts" module>
    import * as Select from '$lib/components/ui/select/index.js';
    import { cn } from '$lib/utils';
    import type { ComponentProps } from 'svelte';
    import {
        ColorPickerContext,
        ColorPickerStoreContext
    } from './context.svelte';
    import type { ColorFormat } from './utils';
    import { colorFormats } from './utils';
    interface ColorPickerFormatSelectProps
        extends
            Omit<
                ComponentProps<typeof Select.Root>,
                'value' | 'onValueChange' | 'type'
            >,
            Pick<ComponentProps<typeof Select.Trigger>, 'size' | 'class'> {}
</script>

<script lang="ts">
    const {
        size,
        disabled,
        class: className,
        ...selectProps
    }: ColorPickerFormatSelectProps = $props();

    const context = ColorPickerContext.get();
    const store = ColorPickerStoreContext.get();
    const isDisabled = $derived(disabled || context.opts.disabled?.current);

    const format = $derived(store.stateRef.format);

    const onFormatChange = (value: string) => {
        if (
            value === 'hex' ||
            value === 'rgb' ||
            value === 'hsl' ||
            value === 'hsb'
        )
            store.setFormat(value);
    };

    const triggerContent = $derived(
        colorFormats.find((f) => f === format)?.toUpperCase() ??
            'Select a format'
    );
</script>

<Select.Root
    {...selectProps}
    type="single"
    value={format}
    onValueChange={onFormatChange}
    disabled={isDisabled}
>
    <Select.Trigger
        data-slot="color-picker-format-select-trigger"
        size={size ?? 'sm'}
        class={cn(className)}
    >
        {triggerContent}
    </Select.Trigger>
    <Select.Content>
        {#each colorFormats as f (f)}
            <Select.Item value={f}>
                {f.toUpperCase()}
            </Select.Item>
        {/each}
    </Select.Content>
</Select.Root>
