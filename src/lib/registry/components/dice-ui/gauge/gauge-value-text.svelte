<script lang="ts">
    import { cn } from '$lib/utils';
    import { mergeProps } from 'bits-ui';
    import { GaugeContext } from './context.svelte';
    import type { GaugeValueTextProps } from './utils';

    let {
        child,
        class: className,
        children,
        style,
        ...valueTextProps
    }: GaugeValueTextProps = $props();

    const context = $derived(GaugeContext.get());

    const valueTextId = $derived(context.opts.valueTextId.current);
    const arcCenterY = $derived(context.opts.arcCenterY.current);
    const state = $derived(context.opts.state.current);
    const valueText = $derived(context.opts.valueText.current);

    const mergedProps = $derived(
        mergeProps(
            {
                id: valueTextId,
                'data-state': state,
                style: `top: ${arcCenterY}px`,
                class: cn(
                    'absolute right-0 left-0 flex -translate-y-1/2 items-center justify-center font-semibold text-2xl',
                    className
                )
            },
            { style },
            valueTextProps
        )
    );
</script>

{#if child}
    {@render child({ props: mergedProps })}
{:else}
    <div {...mergedProps}>
        {#if children}
            {@render children?.()}
        {:else}
            {valueText}
        {/if}
    </div>
{/if}
