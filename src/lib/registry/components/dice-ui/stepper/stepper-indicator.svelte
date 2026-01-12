<script lang="ts" module>
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { getDataState, type DataState } from '.';

    export type StepperIndicatorProps = HTMLAttributes<HTMLDivElement> & {
        children?: Snippet;
        child?: Snippet<
            [{ dataState: DataState; props: Record<string, unknown> }]
        >;
        ref?: HTMLDivElement;
    };
</script>

<script lang="ts">
    import { cn } from '$lib/utils';
    import { Check } from '@lucide/svelte';
    import { mergeProps } from 'svelte-toolbelt';
    import {
        getStepperContextValue,
        getStepperItemContextValue,
        getStepperContext
    } from './context';

    let {
        class: className,
        children,
        child,
        ref,
        ...indicatorProps
    }: StepperIndicatorProps = $props();

    const context = $derived(getStepperContextValue()());
    const itemContext = $derived(getStepperItemContextValue()());
    const store = $derived(getStepperContext()());

    const value = $derived(store.getState().value());
    const itemValue = $derived(itemContext.value);
    const steps = $derived(store.getState().steps);
    const stepState = $derived(steps.get(itemValue));

    const stepPosition = $derived(
        Array.from(steps.keys()).indexOf(itemValue) + 1
    );

    const dataState = $derived(
        getDataState(value, itemValue, stepState, steps)
    );

    const mergedProps = $derived(
        mergeProps({
            class: cn(
                'flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-muted bg-background font-medium text-muted-foreground text-sm transition-colors data-[state=active]:border-primary data-[state=completed]:border-primary data-[state=active]:bg-primary data-[state=completed]:bg-primary data-[state=active]:text-primary-foreground data-[state=completed]:text-primary-foreground',
                className
            ),
            'data-slot': 'stepper-indicator',
            'data-state': dataState,
            dir: context.dir,
            ...indicatorProps
        })
    );
</script>

{#if child}
    {@render child({ props: mergedProps, dataState: dataState })}d
{:else}
    <div {...mergedProps} bind:this={ref}>
        {#if children}
            {@render children()}
        {:else if dataState === 'completed'}
            <Check class="size-4" />
        {:else}
            {stepPosition}
        {/if}
    </div>
{/if}
