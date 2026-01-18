<script lang="ts" module>
    import { mergeProps, type WithChild } from 'bits-ui';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { getStepperContext } from './context';

    export type StepperPrevProps = HTMLButtonAttributes & {
        ref?: HTMLButtonElement;
    } & WithChild;
</script>

<script lang="ts">
    const {
        child,
        children,
        onclick,
        disabled,
        ...prevProps
    }: StepperPrevProps = $props();

    const store = $derived(getStepperContext()());

    const value = $derived(store.getState().value());
    const steps = $derived(store.getState().steps);

    const stepKeys = $derived(Array.from(steps.keys()));
    const currentIndex = $derived(value ? stepKeys.indexOf(value) : -1);
    const isDisabled = $derived(disabled || currentIndex <= 0);

    const onClick = async (
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        onclick?.(event);
        if (event.defaultPrevented || isDisabled) return;

        const prevIndex = Math.max(currentIndex - 1, 0);
        const prevStepValue = stepKeys[prevIndex];

        if (prevStepValue) {
            store.setState('value', () => prevStepValue);
        }
    };

    const mergedProps = $derived(
        mergeProps(
            {
                'data-slot': 'stepper-prev',
                disabled: isDisabled,
                onclick: onClick,
                ...prevProps
            },
            { type: 'button' }
        )
    );
</script>

{#if child}
    {@render child({ props: mergedProps })}
{:else}
    <button {...mergedProps}>
        {@render children?.()}
    </button>
{/if}
