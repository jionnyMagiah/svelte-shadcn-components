<script lang="ts">
    import { cn } from '$lib/utils';
    import { mergeProps } from 'bits-ui';
    import { GaugeContext } from './context.svelte';
    import type { GaugeLabelProps } from './utils';

    let {
        child,
        class: className,
        children,
        style,
        ...labelProps
    }: GaugeLabelProps = $props();

    const context = $derived(GaugeContext.get());

    const labelId = $derived(context.opts.labelId.current);
    const arcCenterY = $derived(context.opts.arcCenterY.current);
    const state = $derived(context.opts.state.current);

    const mergedProps = $derived(
        mergeProps(
            {
                id: labelId,
                'data-state': state,
                style: `top: ${arcCenterY}px`,
                class: cn(
                    'mt-2 font-medium text-muted-foreground text-sm',
                    className
                )
            },
            labelProps
        )
    );
</script>

{#if child}
    {@render child({ props: mergedProps })}
{:else}
    <div {...mergedProps}>
        {@render children?.()}
    </div>
{/if}
