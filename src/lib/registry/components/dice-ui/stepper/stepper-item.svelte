<script lang="ts" module>
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { getDataState } from '.';
    import { cn } from '$lib/utils';
    import {
        getStepperContextValue,
        getStepperContext,
        setStepperItemContextValue,
        type StepperItemContextValue
    } from './context';

    export type StepperItemProps = HTMLAttributes<HTMLDivElement> & {
        value: string;
        completed?: boolean;
        disabled?: boolean;
        children?: Snippet;
        ref?: HTMLDivElement;
    };
</script>

<script lang="ts">
    let {
        value: itemValue,
        completed = false,
        disabled = false,
        class: className,
        children,
        ref,
        ...itemProps
    }: StepperItemProps = $props();

    const context = $derived(getStepperContextValue()());
    const store = $derived(getStepperContext()());
    const orientation = $derived(context.orientation);
    const value = $derived(store.getState().value());

    $effect(() => {
        store.addStep(itemValue, completed, disabled);

        return () => {
            store.removeStep(itemValue);
        };
    });

    $effect(() => {
        // store.setStep(itemValue, completed, disabled);
    });

    const steps = $derived(store.getState().steps);
    const stepState = $derived(steps.get(itemValue));
    const dataState = $derived(
        getDataState(value, itemValue, stepState, steps)
    );

    const itemContextValue: StepperItemContextValue = $derived({
        value: itemValue,
        stepState
    });

    setStepperItemContextValue(() => itemContextValue);
</script>

<div
    data-disabled={stepState?.disabled ? '' : undefined}
    data-orientation={orientation}
    data-state={dataState}
    data-slot="stepper-item"
    dir={context.dir}
    {...itemProps}
    bind:this={ref}
    class={cn(
        'relative flex items-center not-last:flex-1',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        className
    )}
>
    {@render children?.()}
</div>
