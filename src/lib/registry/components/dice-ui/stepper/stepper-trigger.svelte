<script lang="ts" module>
    import { onMount, type Snippet } from 'svelte';
    import type { HTMLButtonAttributes } from 'svelte/elements';
    import {
        getStepperContextFocusValue,
        getStepperContextItemData,
        getStepperContextItemValue,
        getStepperContextStore,
        getStepperContextValue
    } from './context';
    import {
        ARROW_KEYS,
        focusFirst,
        getDataState,
        getFocusIntent,
        stepperGetId,
        wrapArray,
        type NavigationDirection
    } from '.';
    import { cn } from '$lib/utils';

    export type StepperTriggerProps = HTMLButtonAttributes & {
        ref?: HTMLButtonElement;
        children?: Snippet;
    };
</script>

<script lang="ts">
    let {
        onclick,
        onfocus,
        onkeydown,
        onmousedown,
        disabled,
        class: className,
        children,
        ref = $bindable(),
        ...triggerProps
    }: StepperTriggerProps = $props();

    const context = $derived(getStepperContextValue()());
    const itemValue = $derived(getStepperContextItemValue()().value);

    const store = $derived(getStepperContextStore()());
    const focusContext = $derived(getStepperContextFocusValue()());
    const value = $derived(store.getState().value());
    const steps = $derived(store.getState().steps);
    const stepState = $derived(steps.get(itemValue));

    const { activationMode, orientation, loop } = $derived(context);

    const stepIndex = $derived(Array.from(steps.keys()).indexOf(itemValue));

    const stepPosition = $derived(stepIndex + 1);
    const stepCount = $derived(steps.size);

    const triggerId = $derived(
        stepperGetId(context.rootId, 'trigger', itemValue)
    );
    const contentId = $derived(
        stepperGetId(context.rootId, 'content', itemValue)
    );
    const titleId = $derived(stepperGetId(context.rootId, 'title', itemValue));
    const descriptionId = $derived(
        stepperGetId(context.rootId, 'description', itemValue)
    );

    const isDisabled = $derived(
        disabled || stepState?.disabled || context.disabled
    );
    const isActive = $derived(value === itemValue);
    const isTabStop = $derived(focusContext.tabStopId === triggerId);
    const dataState = $derived(
        getDataState(value, itemValue, stepState, steps)
    );

    const triggerRef = $state<HTMLButtonElement>(null!);
    let isArrowKeyPressedRef = $state(false);
    let isMouseClickRef = $state(false);

    function documentOnKeyDown(event: KeyboardEvent) {
        if (ARROW_KEYS.includes(event.key)) {
            isArrowKeyPressedRef = true;
        }
    }
    function documentOnKeyUp(_event: KeyboardEvent) {
        isArrowKeyPressedRef = false;
    }
    $effect(() => {
        focusContext.onItemRegister({
            id: triggerId,
            ref: triggerRef,
            value: () => itemValue,
            active: isTabStop,
            disabled: !!isDisabled
        });
        // todo: stepper fix this

        // if (!isDisabled) {
        //     focusContext.onFocusableItemAdd();
        // }

        return () => {
            focusContext.onItemUnregister(triggerId);
            // if (!isDisabled) {
            //     focusContext.onFocusableItemRemove();
            // }
        };
    });

    const onClick = async (
        event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        onclick?.(event);
        if (event.defaultPrevented) return;

        if (!isDisabled && !context.nonInteractive) {
            const currentStepIndex = Array.from(steps.keys()).indexOf(
                value ?? ''
            );
            const targetStepIndex = Array.from(steps.keys()).indexOf(itemValue);
            const direction =
                targetStepIndex > currentStepIndex ? 'next' : 'prev';

            await store.setStateWithValidation(itemValue, direction);
        }
    };

    const onFocus = async (
        event: FocusEvent & { currentTarget: EventTarget & HTMLButtonElement }
    ) => {
        onfocus?.(event);
        if (event.defaultPrevented) return;

        focusContext.onItemFocus(triggerId);

        const isKeyboardFocus = !isMouseClickRef;

        if (
            !isActive &&
            !isDisabled &&
            activationMode !== 'manual' &&
            !context.nonInteractive &&
            isKeyboardFocus
        ) {
            const currentStepIndex = Array.from(steps.keys()).indexOf(
                value || ''
            );
            const targetStepIndex = Array.from(steps.keys()).indexOf(itemValue);
            const direction =
                targetStepIndex > currentStepIndex ? 'next' : 'prev';

            await store.setStateWithValidation(itemValue, direction);
        }

        isMouseClickRef = false;
    };

    const onKeyDown = async (
        event: KeyboardEvent & {
            currentTarget: EventTarget & HTMLButtonElement;
        }
    ) => {
        onkeydown?.(event);
        if (event.defaultPrevented) return;

        if (event.key === 'Enter' && context.nonInteractive) {
            event.preventDefault();
            return;
        }

        if (
            (event.key === 'Enter' || event.key === ' ') &&
            activationMode === 'manual' &&
            !context.nonInteractive
        ) {
            event.preventDefault();
            if (!isDisabled && triggerRef) {
                triggerRef.click();
            }
            return;
        }

        if (event.key === 'Tab' && event.shiftKey) {
            focusContext.onItemShiftTab();
            return;
        }

        if (event.target !== event.currentTarget) return;

        const focusIntent = getFocusIntent(event, context.dir, orientation);

        if (focusIntent !== undefined) {
            if (
                event.metaKey ||
                event.ctrlKey ||
                event.altKey ||
                event.shiftKey
            )
                return;
            event.preventDefault();

            const items = focusContext
                .getItems()
                .filter((item) => !item.disabled);
            let candidateRefs = items.map((item) => item.ref);

            if (focusIntent === 'last') {
                candidateRefs.reverse();
            } else if (focusIntent === 'prev' || focusIntent === 'next') {
                if (focusIntent === 'prev') candidateRefs.reverse();
                const currentIndex = candidateRefs.findIndex(
                    (ref) => ref === event.currentTarget
                );
                candidateRefs = loop
                    ? wrapArray(candidateRefs, currentIndex + 1)
                    : candidateRefs.slice(currentIndex + 1);
            }

            if (store.hasValidation() && candidateRefs.length > 0) {
                const nextRef = candidateRefs[0];
                const nextElement = nextRef;
                const nextItem = items.find((item) => item.ref === nextElement);

                if (nextItem && nextItem.value() !== itemValue) {
                    const currentStepIndex = Array.from(steps.keys()).indexOf(
                        value || ''
                    );
                    const targetStepIndex = Array.from(steps.keys()).indexOf(
                        nextItem.value()
                    );
                    const direction: NavigationDirection =
                        targetStepIndex > currentStepIndex ? 'next' : 'prev';

                    if (direction === 'next') {
                        const isValid = await store.setStateWithValidation(
                            nextItem.value(),
                            direction
                        );
                        if (!isValid) return;
                    } else {
                        store.setState('value', () => nextItem.value());
                    }

                    queueMicrotask(() => nextElement?.focus());
                    return;
                }
            }

            queueMicrotask(() => focusFirst(candidateRefs));
        }
    };

    const onMouseDown = (
        event: MouseEvent & {
            currentTarget: EventTarget & HTMLButtonElement;
        }
    ) => {
        onmousedown?.(event);
        if (event.defaultPrevented) return;

        isMouseClickRef = true;

        if (isDisabled) {
            event.preventDefault();
        } else {
            focusContext.onItemFocus(triggerId);
        }
    };
</script>

<svelte:document onkeydown={documentOnKeyDown} onkeyup={documentOnKeyUp} />
<button
    id={triggerId}
    role="tab"
    type="button"
    aria-controls={contentId}
    aria-current={isActive ? 'step' : undefined}
    aria-describedby={`${titleId} ${descriptionId}`}
    aria-posinset={stepPosition}
    aria-selected={isActive}
    aria-setsize={stepCount}
    data-disabled={isDisabled ? '' : undefined}
    data-state={dataState}
    data-slot="stepper-trigger"
    disabled={isDisabled}
    tabIndex={isTabStop ? 0 : -1}
    {...triggerProps}
    bind:this={ref}
    class={cn(
        "inline-flex items-center justify-center gap-3 rounded-md text-left transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        'not-has-data-[slot=description]:rounded-full not-has-data-[slot=title]:rounded-full',
        className
    )}
    onclick={onClick}
    onfocus={onFocus}
    onkeydown={onKeyDown}
    onmousedown={onMouseDown}
>
    {@render children?.()}
</button>
