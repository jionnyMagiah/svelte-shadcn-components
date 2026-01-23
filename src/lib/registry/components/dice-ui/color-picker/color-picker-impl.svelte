<script lang="ts" module>
    import { boxWith } from 'svelte-toolbelt';
    import * as Popover from '$lib/components/ui/popover/index.js';
    import type { ColorPickerRootProps } from './color-picker-root.svelte';
    import {
        ColorPickerContextState,
        ColorPickerStoreContext
    } from './context.svelte';
    import { hexToRgb, rgbToHex, rgbToHsv } from './utils';
    import VisuallyHiddenInput from '$lib/registry/utils/visually-hidden-input.svelte';
    import { watch } from 'runed';

    interface ColorPickerImplProps extends Omit<
        ColorPickerRootProps,
        | 'defaultValue'
        | 'onValueChange'
        | 'onOpenChange'
        | 'format'
        | 'defaultFormat'
        | 'onFormatChange'
    > {
        ref?: HTMLDivElement | null;
    }
</script>

<script lang="ts">
    let {
        value: valueProp,
        dir: dirProp,
        open: openProp,
        name,
        ref = $bindable(null),
        asChild,
        disabled,
        inline,
        readOnly,
        required,
        children,
        ...rootProps
    }: ColorPickerImplProps = $props();

    const store = ColorPickerStoreContext.get();

    let formTrigger = $state<HTMLDivElement>(null!);
    const isFormControl = $derived(
        formTrigger ? !!formTrigger.closest('form') : true
    );
    watch([() => valueProp], () => {
        if (valueProp !== undefined) {
            const currentState = store.getState();
            const color = hexToRgb(valueProp, currentState.color.a);
            const hsv = rgbToHsv(color);
            store.setColor(color);
            store.setHsv(hsv);
        }
    });

    watch([() => openProp], () => {
        if (openProp !== undefined) {
            store.setOpen(openProp);
        }
    });

    const contextValue = ColorPickerContextState.create({
        dir: boxWith(() => dirProp ?? 'ltr'),
        disabled: boxWith(() => disabled),
        inline: boxWith(() => inline),
        readOnly: boxWith(() => readOnly),
        required: boxWith(() => required)
    });

    const value = $derived(rgbToHex(store.stateRef.color));
    const open = $derived(store.stateRef.open);
</script>

{#if inline}
    <div {...rootProps} bind:this={ref}>
        {#if isFormControl}
            <VisuallyHiddenInput
                type="hidden"
                control={formTrigger}
                {name}
                {value}
                {disabled}
                readonly={readOnly}
                {required}
            />
        {/if}
        {@render children?.()}
    </div>
{:else}
    <Popover.Root {open} onOpenChange={store.setOpen}>
        <div {...rootProps} bind:this={ref}>
            {#if isFormControl}
                <VisuallyHiddenInput
                    type="hidden"
                    control={formTrigger}
                    {name}
                    {value}
                    {disabled}
                    readonly={readOnly}
                    {required}
                />
            {/if}
            {@render children?.()}
        </div>
    </Popover.Root>
{/if}
