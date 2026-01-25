<script lang="ts" module>
    import { mergeProps, type Orientation } from 'bits-ui';
    import type { HTMLAttributes } from 'svelte/elements';
    import { ActionBarContext } from './context.svelte';
    import type { Snippet } from 'svelte';
    import { cn } from '$lib/utils';

    type ActionBarSeparatorProps = HTMLAttributes<HTMLDivElement> & {
        orientation?: Orientation;
        child?: Snippet<[{ props: Record<string, unknown> }]>;
    };
</script>

<script lang="ts">
    const {
        orientation: orientationProp,
        child,
        class: className,
        ...separatorProps
    }: ActionBarSeparatorProps = $props();
    const context = $derived(ActionBarContext.get());
    const orientation = $derived(
        orientationProp ?? context.opts.orientation.current
    );

    const mergedProps = $derived(
        mergeProps(
            {
                role: 'separator',
                'aria-orientation': orientation,
                'aria-hidden': true,
                'data-slot': 'action-bar-separator',
                class: cn(
                    'in-data-[slot=action-bar-selection]:ml-0.5 in-data-[slot=action-bar-selection]:h-4 in-data-[slot=action-bar-selection]:w-px bg-border',
                    orientation === 'horizontal' ? 'h-6 w-px' : 'h-px w-full',
                    className
                )
            },
            { ...separatorProps }
        )
    );
</script>

{#if child}
    {@render child({ props: mergedProps })}
{:else}
    <div {...mergedProps}></div>
{/if}
