<script lang="ts" module>
    import type { HTMLAttributes } from 'svelte/elements';

    import { cn } from '$lib/utils';
    import { boxWith, mergeProps } from 'svelte-toolbelt';
    import { StepperIndicatorState, StoreContext } from './context.svelte';
    import type { Snippet } from 'svelte';
    import type { DataState } from '.';
    import { Check } from '@lucide/svelte';

    interface StepperIndicatorProps extends HTMLAttributes<HTMLDivElement> {
        ref?: HTMLDivElement | null;
        child?: Snippet<
            [{ props: Record<string, unknown>; dataState: DataState }]
        >;
    }
</script>

<script lang="ts">
    let {
        class: className,
        children,
        child,
        id,
        ref,
        ...indicatorProps
    }: StepperIndicatorProps = $props();
    const propId = $props.id();
    const indicatorState = StepperIndicatorState.create({
        id: boxWith(() => id ?? propId)
    });

    const mergedProps = $derived(
        mergeProps(indicatorProps, indicatorState.props, {
            class: cn(
                'flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-muted bg-background font-medium text-muted-foreground text-sm transition-colors data-[state=active]:border-primary data-[state=completed]:border-primary data-[state=active]:bg-primary data-[state=completed]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:text-primary-foreground',
                className
            )
        })
    );
</script>

{#if child}
    {@render child({
        props: mergedProps,
        dataState: indicatorState.dataState
    })}
{:else}
    <div {...mergedProps} bind:this={ref}>
        {#if children}
            {@render children()}
        {:else if indicatorState.dataState === 'completed'}
            <Check class="size-4" />
        {:else}
            {indicatorState.stepPosition}
        {/if}
    </div>
{/if}
