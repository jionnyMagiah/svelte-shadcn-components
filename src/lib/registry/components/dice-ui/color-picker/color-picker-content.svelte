<script lang="ts" module>
    import { mergeProps, type PopoverContentProps } from 'bits-ui';
    import { ColorPickerContext } from './context.svelte';
    import { cn } from '$lib/utils';
    import * as Popover from '$lib/components/ui/popover/index.js';
    import type { Snippet } from 'svelte';

    interface ColorPickerContentProps extends PopoverContentProps {
        child?: Snippet<[{ props: Record<string, unknown> }]>;
    }
</script>

<script lang="ts">
    const {
        children,
        child: childProp,
        class: className,
        ...popoverContentProps
    }: ColorPickerContentProps = $props();

    const context = ColorPickerContext.get();

    const mergedProps = $derived(
        mergeProps(
            {
                class: cn('flex w-85 flex-col gap-4 p-4', className),
                'data-slot': 'color-picker-content'
            },
            { ...popoverContentProps }
        )
    );
</script>

{#if context.opts.inline?.current}
    <div {...mergedProps}>
        {@render children?.()}
    </div>
{:else if childProp}
    <Popover.Content {...mergedProps}>
        {#snippet child({ props })}
            {@render childProp({ props })}
        {/snippet}
    </Popover.Content>
{:else}
    <Popover.Content {...mergedProps}>
        {@render children?.()}
    </Popover.Content>
{/if}
