<script lang="ts">
    import type { HTMLAttributes } from 'svelte/elements';
    import { CheckboxGroupItemContext } from './context.svelte';
    import { getDataState } from './utils';
    import type { Snippet } from 'svelte';
    import { mergeProps } from 'svelte-toolbelt';

    type CheckboxGroupIndicatorProps = HTMLAttributes<HTMLSpanElement> & {
        /** Whether the indicator should always be rendered. */
        forceMount?: boolean;
        ref?: HTMLSpanElement | null;
        child?: Snippet<[{ props: Record<string, unknown> }]>;
    };

    let {
        forceMount = false,
        children,
        child,
        ref = $bindable(),
        ...indicatorProps
    }: CheckboxGroupIndicatorProps = $props();
    const itemContext = $derived(CheckboxGroupItemContext.get());

    const mergedProps = $derived(
        mergeProps({
            'data-state': getDataState(itemContext.opts.checked.current),
            'data-disabled': itemContext.opts.disabled.current ? '' : undefined,
            ...indicatorProps
        })
    );

    const showIndicator = $derived(forceMount || itemContext.opts.checked.current);
</script>

{#if showIndicator}
    {#if child}
        {@render child({ props: mergedProps })}
    {:else}
        <span {...mergedProps} bind:this={ref}>
            {@render children?.()}
        </span>
    {/if}
{/if}
