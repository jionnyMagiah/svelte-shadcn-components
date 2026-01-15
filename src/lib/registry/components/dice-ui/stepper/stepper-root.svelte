<script lang="ts" module>
    import { cn } from '$lib/utils';
    import type { Direction, Orientation, TabsActivationMode } from 'bits-ui';
    import { onMount, type Snippet } from 'svelte';
    import { boxWith, mergeProps } from 'svelte-toolbelt';
    import type { HTMLAttributes } from 'svelte/elements';
    import { SvelteMap, SvelteSet } from 'svelte/reactivity';
    import type { NavigationDirection, StepState } from '.';
    import { StepperContextValue, Store } from './context.svelte';

    interface StepperProps extends HTMLAttributes<HTMLDivElement> {
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
        activationMode?: TabsActivationMode;
        dir?: Direction;
        orientation?: Orientation;
        disabled?: boolean;
        loop?: boolean;
        nonInteractive?: boolean;
        children?: Snippet;
        ref?: HTMLDivElement | null;
    }
</script>

<script lang="ts">
    let {
        value,
        defaultValue,
        onValueChange,
        onValueComplete,
        onValueAdd,
        onValueRemove,
        onValidate,
        dir,
        orientation = 'horizontal',
        activationMode = 'automatic',
        disabled = false,
        nonInteractive = false,
        loop = false,
        class: className,
        children,
        id,
        ref = $bindable(null),
        ...rootProps
    }: StepperProps = $props();

    let stateValue = $derived(value ?? defaultValue ?? '');

    const propId = $props.id();
    const rootId = $derived(id ?? propId);
    const store = Store.create({
        value: boxWith(
            () => stateValue,
            (v) => (stateValue = v)
        ),
        dir: boxWith(() => dir ?? 'ltr'),
        disabled: boxWith(() => disabled),
        id: boxWith(() => rootId),
        orientation: boxWith(() => orientation),
        ref: boxWith(
            () => ref,
            (v) => (ref = v)
        ),
        onValidate: boxWith(() => onValidate),
        onValueAdd: boxWith(() => onValueAdd),
        onValueChange: boxWith(() => onValueChange),
        onValueComplete: boxWith(() => onValueComplete),
        onValueRemove: boxWith(() => onValueRemove)
    });

    const context = StepperContextValue.create({
        activationMode: boxWith(() => activationMode),
        dir: boxWith(() => dir ?? 'ltr'),
        disabled: boxWith(() => disabled),
        rootId: boxWith(() => rootId),
        orientation: boxWith(() => orientation),
        loop: boxWith(() => loop),
        nonInteractive: boxWith(() => nonInteractive)
    });

    $effect(() => {
        if (value !== undefined) {
            store.setState('value', value);
        }
    });

    const mergedProps = $derived(
        mergeProps(
            store.props,
            { ...rootProps },
            {
                class: cn(
                    'flex gap-6',
                    orientation === 'horizontal'
                        ? 'w-full flex-col'
                        : 'flex-row',
                    className
                )
            }
        )
    );
</script>

<div {...mergedProps}>
    {@render children?.()}
</div>
<!-- <pre>{JSON.stringify(
        {
            s: [...StoreContext.get().stateRef.steps],
            a: [...stateSteps],
            v: StoreContext.get().stateRef.value
        },
        null,
        4
    )}</pre> -->
