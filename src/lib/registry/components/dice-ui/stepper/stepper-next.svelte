<script lang="ts" module>
    import { mergeProps, type WithChild } from 'bits-ui';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import { getStepperContextStore } from './context';

    export type StepperNextProps = HTMLButtonAttributes & {
        ref?: HTMLButtonElement;
    } & WithChild;
</script>

<script lang="ts">
    const {
        child,
        children,
        onclick,
        disabled,
        ...nextProps
    }: StepperNextProps = $props();

    const store = $derived(getStepperContextStore()());

    const value = $derived(store.getState().value());
    const steps = $derived(store.getState().steps);

    const stepKeys = $derived(Array.from(steps.keys()));
    const currentIndex = $derived(value ? stepKeys.indexOf(value) : -1);
    const isDisabled = $derived(
        disabled || currentIndex >= stepKeys.length - 1
    );

    const onClick = async (
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        onclick?.(event);
        if (event.defaultPrevented || isDisabled) return;

        const nextIndex = Math.min(currentIndex + 1, stepKeys.length - 1);
        const nextStepValue = stepKeys[nextIndex];

        if (nextStepValue) {
            await store.setStateWithValidation(nextStepValue, 'next');
        }
    };

    const mergedProps = $derived(
        mergeProps(
            {
                'data-slot': 'stepper-next',
                disabled: isDisabled,
                onclick: onClick,
                ...nextProps
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
