<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Direction, Orientation } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import type { HTMLAttributes } from 'svelte/elements';
    import { SvelteMap, SvelteSet } from 'svelte/reactivity';
    import type {
        ActivationMode,
        NavigationDirection,
        StepState,
        StoreState
    } from '.';
    import {
        getStepperContextStore,
        setStepperContextStore,
        setStepperContextValue,
        type StepperContextStore,
        type StepperContextValue
    } from './context';

    export type StepperRootProps = HTMLAttributes<HTMLDivElement> & {
        value?: string;
        defaultValue?: string;
        onValueChange?: (value: string) => void;
        onValueComplete?: (value: string, completed: boolean) => void;
        onValueAdd?: (value: string) => void;
        onValueRemove?: (value: string) => void;
        onValidate?: (
            value: string,
            direction: NavigationDirection
        ) => boolean | Promise<boolean>;
        activationMode?: ActivationMode;
        dir?: Direction;
        orientation?: Orientation;
        disabled?: boolean;
        loop?: boolean;
        nonInteractive?: boolean;
        children?: Snippet;
    };
</script>

<script lang="ts">
    const {
        value,
        defaultValue,
        onValueChange,
        onValueComplete,
        onValueAdd,
        onValueRemove,
        onValidate,
        dir: dirProp = 'ltr',
        orientation = 'horizontal',
        activationMode = 'automatic',
        disabled = false,
        nonInteractive = false,
        loop = false,
        class: className,
        id,
        children,
        ...rootProps
    }: StepperRootProps = $props();

    const listenersRef = new SvelteSet<() => void>();
    const stateRef = $state<StoreState>({
        steps: new Map(),
        value: () => value ?? defaultValue ?? ''
    });

    const contextStoreValue: StepperContextStore = $derived({
        subscribe: (cb) => {
            listenersRef.add(cb);
            return () => listenersRef.delete(cb);
        },
        getState: () => stateRef,
        setState: (key, value) => {
            if (Object.is(stateRef[key], value)) return;

            if (key === 'value' && typeof value === 'string') {
                stateRef.value = value;
                onValueChange?.(value);
            } else {
                stateRef[key] = value;
            }

            contextStoreValue.notify();
        },
        setStateWithValidation: async (value, direction) => {
            if (!onValidate) {
                contextStoreValue.setState('value', () => value);
                return true;
            }

            try {
                const isValid = await onValidate(value, direction);
                if (isValid) {
                    contextStoreValue.setState('value', () => value);
                }
                return isValid;
            } catch {
                return false;
            }
        },
        hasValidation: () => !!onValidate,
        addStep: (value, completed, disabled) => {
            const newStep: StepState = {
                value: () => value,
                completed,
                disabled
            };
            stateRef.steps.set(value, newStep);
            onValueAdd?.(value);
            contextStoreValue.notify();
        },
        removeStep: (value) => {
            stateRef.steps.delete(value);
            onValueRemove?.(value);
            contextStoreValue.notify();
        },
        setStep: (value, completed, disabled) => {
            const step = stateRef.steps.get(value);
            if (step) {
                const updatedStep: StepState = { ...step, completed, disabled };
                stateRef.steps.set(value, updatedStep);

                if (completed !== step.completed) {
                    onValueComplete?.(value, completed);
                }

                contextStoreValue.notify();
            }
            console.log(stateRef.steps);
        },
        notify: () => {
            for (const cb of listenersRef) {
                cb();
            }
        }
    });

    setStepperContextStore(() => contextStoreValue);

    $effect(() => {
        if (value !== undefined) {
            getStepperContextStore()().setState('value', () => value);
        }
    });

    const propId = $props.id();
    const rootId = $derived(id ?? propId);

    const contextValueValue: StepperContextValue = $derived({
        rootId,
        dir: dirProp,
        orientation,
        activationMode,
        disabled,
        nonInteractive,
        loop
    });
    setStepperContextValue(() => contextValueValue);
</script>

<div
    id={rootId}
    data-disabled={disabled ? '' : undefined}
    data-orientation={orientation}
    data-slot="stepper"
    dir={dirProp}
    {...rootProps}
    class={cn(
        'flex gap-6',
        orientation === 'horizontal' ? 'w-full flex-col' : 'flex-row',
        className
    )}
>
    {@render children?.()}
</div>
