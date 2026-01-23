<script lang="ts" module>
    import type { ButtonProps } from '$lib/components/ui/button';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import {
        ColorPickerContext,
        ColorPickerStoreContext
    } from './context.svelte';
    import { hexToRgb, rgbToHsv } from './utils';

    type ColorPickerEyeDropperProps = ButtonProps & {};
</script>

<script lang="ts">
    import { PipetteIcon } from '@lucide/svelte';
    import Button from '$lib/components/ui/button/button.svelte';

    const {
        size: sizeProp,
        children,
        disabled,
        ...buttonProps
    }: ColorPickerEyeDropperProps = $props();

    const context = ColorPickerContext.get();
    const store = ColorPickerStoreContext.get();

    const color = $derived(store.stateRef.color);

    const isDisabled = $derived(disabled || context.opts.disabled?.current);

    const onEyeDropper = async () => {
        if (!window.EyeDropper) return;

        try {
            const eyeDropper = new window.EyeDropper();
            const result = await eyeDropper.open();

            if (result.sRGBHex) {
                const currentAlpha = color?.a ?? 1;
                const newColor = hexToRgb(result.sRGBHex, currentAlpha);
                const newHsv = rgbToHsv(newColor);
                store.setColor(newColor);
                store.setHsv(newHsv);
            }
        } catch (error) {
            console.warn('EyeDropper error:', error);
        }
    };

    const hasEyeDropper = $derived(
        typeof window !== 'undefined' && !!window.EyeDropper
    );

    const size = $derived(sizeProp ?? (children ? 'default' : 'icon'));
</script>

{#if hasEyeDropper}
    <Button
        data-slot="color-picker-eye-dropper"
        {...buttonProps}
        variant="outline"
        {size}
        onclick={onEyeDropper}
        disabled={isDisabled}
    >
        {#if children}
            {@render children()}
        {:else}
            <PipetteIcon />
        {/if}
    </Button>
{/if}
