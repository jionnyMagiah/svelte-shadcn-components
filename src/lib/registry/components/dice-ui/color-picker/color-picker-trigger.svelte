<script lang="ts" module>
    import type { PopoverTriggerProps } from 'bits-ui';
    import { ColorPickerContext } from './context.svelte';
    import * as Popover from '$lib/components/ui/popover/index.js';
    import Button from '$lib/components/ui/button/button.svelte';

    interface ColorPickerTriggerProps extends PopoverTriggerProps {}
</script>

<script lang="ts">
    const {
        child: childreProp,
        disabled,
        ...triggerProps
    }: ColorPickerTriggerProps = $props();
    const context = ColorPickerContext.get();

    const isDisabled = $derived(disabled || context.opts.disabled?.current);
</script>

<Popover.Trigger disabled={isDisabled} {...triggerProps}>
    {#snippet child({ props })}
        {@render childreProp?.({ props })}
        <!-- todo: check if button is needed -->
        <!-- <Button data-slot="color-picker-trigger" {...props}>
    </Button> -->
    {/snippet}
</Popover.Trigger>
