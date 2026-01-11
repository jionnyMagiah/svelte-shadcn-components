<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { HTMLAttributes } from 'svelte/elements';
    import { getDataState } from '.';
    import {
        getStepperContextItemValue,
        getStepperContextStore,
        getStepperContextValue
    } from './context';

    export type StepperSeparatorProps = HTMLAttributes<HTMLDivElement> & {
        forceMount?: boolean;
        ref?: HTMLDivElement;
    };
</script>

<script lang="ts">
    let {
        class: className,
        children,
        forceMount = false,
        ref,
        ...separatorProps
    }: StepperSeparatorProps = $props();

    const context = $derived(getStepperContextValue()());
    const itemContext = $derived(getStepperContextItemValue()());
    const itemValue = $derived(itemContext.value);
    const store = $derived(getStepperContextStore()());

    const value = $derived(store.getState().value());
    const steps = $derived(store.getState().steps);
    const orientation = $derived(context.orientation);
    const stepIndex = $derived(Array.from(steps.keys()).indexOf(itemValue));
    const isLastStep = $derived(stepIndex === steps.size - 1);
    const empty = $derived(isLastStep && !forceMount);

    const dataState = $derived(
        getDataState(
            value,
            itemValue,
            itemContext.stepState,
            steps,
            'separator'
        )
    );
</script>

{#if !empty}
    <div
        role="separator"
        aria-hidden="true"
        aria-orientation={orientation}
        data-orientation={orientation}
        data-state={dataState}
        data-slot="stepper-separator"
        dir={context.dir}
        {...separatorProps}
        bind:this={ref}
        class={cn(
            'bg-border transition-colors data-[state=active]:bg-primary data-[state=completed]:bg-primary',
            orientation === 'horizontal' ? 'h-px flex-1' : 'h-10 w-px',
            className
        )}
    >
        {@render children?.()}
    </div>
{/if}
