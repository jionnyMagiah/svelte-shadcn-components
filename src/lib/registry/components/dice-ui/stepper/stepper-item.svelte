<script lang="ts" module>
    import { cn } from '$lib/utils';
    import { boxWith, mergeProps } from 'svelte-toolbelt';
    import type { HTMLAttributes } from 'svelte/elements';
    import { StepperItemState } from './context.svelte';

    interface StepperItemProps extends HTMLAttributes<HTMLDivElement> {
        value: string;
        completed?: boolean;
        disabled?: boolean;
        ref?: HTMLDivElement | null;
    }
</script>

<script lang="ts">
    let {
        value,
        completed = false,
        disabled = false,
        class: className,
        children,
        ref = $bindable(null),
        ...itemProps
    }: StepperItemProps = $props();

    const itemState = StepperItemState.create({
        value: boxWith(() => value),
        completed: boxWith(() => completed),
        disabled: boxWith(() => disabled)
    });

    const mergedProps = $derived(
        mergeProps(itemState.props, itemProps, {
            class: cn(
                'relative flex flex-col items-center    not-last:flex-1 data-[orientation=horizontal]:flex-row',
                className
            )
        })
    );
</script>

<div {...mergedProps} bind:this={ref}>
    {@render children?.()}
</div>
<!-- <pre>{JSON.stringify(
        {
            s: StoreContext.get().stateRef.steps.size
        },
        null,
        2
    )}</pre> -->
